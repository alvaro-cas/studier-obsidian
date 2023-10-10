import { Modal } from 'obsidian';
import { Setting } from 'obsidian';

export class Checker extends Modal {
  constructor(app: App, checked, title) {
    super(app)
    this.checked = checked
    this.title = title
  }

  onOpen() {
    var { contentEl } = this;
    contentEl.createEl('h2',
                       { text: 'Checking for ' + this.title,
                        cls: 'h2-modal' });

    for (var i=0; i < this.checked.length; i++) {
      contentEl.createEl('div',
                         { text: `${i+1}. ` + this.checked[i][1],
                           cls: 'div-question-modal' });

      if (this.checked[i][0] == "incorrect") {
        contentEl.createEl('div',
                           { text: '> ' + this.checked[i][3],
                            cls: 'div-incorrect-modal' });
      }
      contentEl.createEl('div',
                         { text: '> ' + this.checked[i][2],
                           cls: 'div-correct-modal' });
    }
    contentEl.createEl('div', { text: ' ', cls: 'spacer' });

    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText('Done')
          .setCta()
          .onClick(() => {
            this.close();
          }))
  }

  onClose() {
    var { contentEl } = this;
    contentEl.empty();
  }
}
