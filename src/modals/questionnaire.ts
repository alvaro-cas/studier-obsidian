import { Modal } from 'obsidian';
import { Setting } from 'obsidian';
import { Checker } from './checker';

var selectedAnswers = ["0"];

export class Questionnaire extends Modal {
  constructor(app: App, settings, questions, answers, title) {
    super(app)
    this.settings = settings
    this.questions = questions
    this.answers = answers
    this.title = title
  }

  onOpen() {
    var { contentEl } = this;
    contentEl.createEl('h2',
                       { text: 'Questions for ' + this.title,
                         cls: 'h2-modal' });

    for (var i=0; i < this.questions.length; i++) {
      new Setting(contentEl)
        .setName(this.questions[i][0])
        .addDropdown((dropdown) => {
          this.questions[i][1].forEach(function (value) {
            dropdown.addOption(value + i.toString(), value);
          })

          dropdown
          .setValue()
          .onChange(async value => {
            var needPush = true;
            selectedAnswers.forEach(function (selected) {
              if (selected.slice(-1) == value.slice(-1)) {
                selectedAnswers[value.slice(-1)] = value;
                needPush = false;
              }
            })
            needPush ? selectedAnswers.push(value) : '';
          })
        })
    }

    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText('Check!')
          .setCta()
          .onClick(() => {
            this.checkAnswers();
            this.close();
          }))
  }

  onClose() {
    var { contentEl } = this;
    contentEl.empty();
    selectedAnswers = [];
  }

  checkAnswers() {
    var checked = [];
    for (var i=0; i < selectedAnswers.length; i++) {
      const slicer = selectedAnswers[i].slice(-1);
      const selected = selectedAnswers[i].slice(0, -1);
      if (this.answers[slicer] == selected) {
        checked.push(["correct", this.questions[i][0],
                     this.answers[slicer], selected]);

      } else {
        checked.push(["incorrect", this.questions[i][0],
                     this.answers[slicer], selected]);
      }
    }

    new Checker(this.app, checked, this.title).open();
  }
}
