import { PluginSettingTab } from 'obsidian';
import { Setting } from 'obsidian';

interface StudierPluginSettings {
  questionInit: string
  questionEnd: string
  startChar: string
  correctChar: string
}

export const DEFAULT_SETTINGS: StudierPluginSettings = {
  questionInit: '> [!info]- Questions',
  questionEnd: '>---',
  startChar: '> - ',
  correctChar: '.x',
}

export class StudierSettings extends PluginSettingTab {
  constructor(app: App, plugin: StudierPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    var { containerEl } = this;

    containerEl.empty();
    containerEl.createEl('h1', { text: 'Settings: Studier' });

    new Setting(containerEl)
      .setName('Questions Intializer')
      .setDesc(`The character(s) used to identify where the questions begin. Default: "${DEFAULT_SETTINGS['questionInit']}"`)
      .addText(text =>
        text
          .setValue(this.plugin.settings.questionInit)
          .onChange(async value => {
            this.plugin.settings.questionInit = value;
            await this.plugin.saveSettings();
          }))

    new Setting(containerEl)
      .setName('Questions Ender')
      .setDesc(`The character(s) used to identify the delimiter for reading the questions. Default: "${DEFAULT_SETTINGS['questionEnd']}"`)
      .addText(text =>
        text
          .setValue(this.plugin.settings.questionEnd)
          .onChange(async value => {
            this.plugin.settings.questionEnd = value;
            await this.plugin.saveSettings();
          }))

    new Setting(containerEl)
      .setName('Starter Question Indicator')
      .setDesc(`The character(s) used to identify where the question begins. Default: "${DEFAULT_SETTINGS['startChar']}"`)
      .addText(text =>
        text
          .setValue(this.plugin.settings.startChar)
          .onChange(async value => {
            this.plugin.settings.startChar = value;
            await this.plugin.saveSettings();
          }))

    new Setting(containerEl)
      .setName('Correct Answer Indicator')
      .setDesc(`The character(s) used to identify the correct answer. Default: "${DEFAULT_SETTINGS['correctChar']}"`)
      .addText(text =>
        text
          .setValue(this.plugin.settings.correctChar)
          .onChange(async value => {
            this.plugin.settings.correctChar = value;
            await this.plugin.saveSettings();
          }))


    containerEl.createEl('h3', { text: 'Donations' });

    containerEl.createEl('div', {}, div => {
      div.innerHTML += `💰You can support by donating <a href="https://liberapay.com/Cuatroy2/donate">here</a> or contributing to the plugin. As well, you can check out more content on <a href="https://medium.com/@cuatroy2">Medium</a> and <a href="https://github.com/alvaro-cas">GitHub</a>. Enjoy!`
    })

    containerEl.createEl('div', {}, div => {
      div.innerHTML += `<a href="https://liberapay.com/Cuatroy2/donate"><img src="https://img.shields.io/badge/Liberapay-F6C915?style=for-the-badge&logo=liberapay&logoColor=black"></a>`
    })

  }
}
