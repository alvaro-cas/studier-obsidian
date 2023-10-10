import { App } from 'obsidian';
import { Plugin } from 'obsidian';
import { Notice } from 'obsidian';
import { MarkdownView } from 'obsidian';

import { DEFAULT_SETTINGS } from './src/settings';
import { StudierSettings } from './src/settings';
import { Questionnaire } from './src/modals/questionnaire';

export default class StudierPlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    // Add executers
    this.addRibbonIcon("graduation-cap", "Studier", () => {
      this.openRandomStudy();
    });

    this.addCommand({
      id: 'open-studier',
      name: 'Open random note.',
      checkCallback: (checking: boolean) => {
        if (!checking) {
          this.openRandomStudy();
        }
        return true;
      }
    })

    this.addSettingTab(new StudierSettings(this.app, this));
  }

  onunload() {
    console.log('Unloading plugin');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS,
                                  await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async openRandomStudy() {
    // Get all markdown files
    var markdownFiles = this.app.vault.getMarkdownFiles();
    markdownFiles = markdownFiles.filter((file) => file.extension === 'md');

    if (!markdownFiles.length) {
      new Notice('No markdown files available!');
      return;
    }

    // Select and open random markdown
    const randomMarkdown = markdownFiles.length * Math.random();
    const markdownOpen = markdownFiles[(randomMarkdown) << 0];
    await this.app.workspace.openLinkText(markdownOpen.basename, '');
    // await this.app.workspace.openLinkText('my_test_questions', '');

    // Get content
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    var content = "";

    if (activeView) {
      const editor = activeView.editor;
      content = editor.getValue();

    } else {
      new Notice('Error no markdown is active!');
      return;
    }

    // Formatting questions
    var questionInit = this.settings.questionInit
      .replace(/[<>*()?\[\]]/g, "\\$&");
    var questionEnd = this.settings.questionEnd
      .replace(/[<>*()?\[\]]/g, "\\$&");

    const regex = new RegExp(`${questionInit}(.*?)${questionEnd}`, "sg");
    const matcherContent = content.match(regex);

    var questions = [];
    var answers = [];
    var numberQuestions = -1;

    if (!matcherContent) {
      new Notice('No questions were found for this review.');
      return;
    }

    for (var i=0; i < matcherContent.length; i++) {
      content = matcherContent[i].split("\n");
      content.shift();
      content.pop();

      for (var a=0; a < content.length; a++) {
        if (content[a].startsWith(this.settings.startChar)) {
          var options = content[a].split(this.settings.startChar)[1];

          var getLastChar = options.substr(options.length -
                                          this.settings.correctChar.length);
          if (getLastChar == this.settings.correctChar) {
            const regexS = new RegExp(`${this.settings.correctChar}$`);
            options = options.replace(regexS, "");
            answers[numberQuestions] = options;

            if (answers.includes(undefined)) {
              new Notice('Some questions are missing a correct' +
                          ' answer indicator or format is incorrect.');
              return;
            }
          }

          questions[numberQuestions][1].push(options);

        } else {
          if (content[a].length <= 2) {
            console.log('Questions need to be longer than 2 characters.');

          } else {
            questions.push([content[a], []]);
            numberQuestions += 1;
          }
        }
      }
    }

    new Questionnaire(this.app,
                  this.settings,
                  questions,
                  answers,
                  markdownOpen.basename).open();
  }
}
