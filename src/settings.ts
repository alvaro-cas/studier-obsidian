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

    new Setting(containerEl)
      .setName('Questions intializer')
      .setDesc(`The character(s) used to identify where the questions begin. Default: "${DEFAULT_SETTINGS['questionInit']}"`)
      .addText(text =>
        text
          .setValue(this.plugin.settings.questionInit)
          .onChange(async value => {
            this.plugin.settings.questionInit = value;
            await this.plugin.saveSettings();
          }))

    new Setting(containerEl)
      .setName('Questions ender')
      .setDesc(`The character(s) used to identify the delimiter for reading the questions. Default: "${DEFAULT_SETTINGS['questionEnd']}"`)
      .addText(text =>
        text
          .setValue(this.plugin.settings.questionEnd)
          .onChange(async value => {
            this.plugin.settings.questionEnd = value;
            await this.plugin.saveSettings();
          }))

    new Setting(containerEl)
      .setName('Starter question indicator')
      .setDesc(`The character(s) used to identify where the question begins. Default: "${DEFAULT_SETTINGS['startChar']}"`)
      .addText(text =>
        text
          .setValue(this.plugin.settings.startChar)
          .onChange(async value => {
            this.plugin.settings.startChar = value;
            await this.plugin.saveSettings();
          }))

    new Setting(containerEl)
      .setName('Correct answer indicator')
      .setDesc(`The character(s) used to identify the correct answer. Default: "${DEFAULT_SETTINGS['correctChar']}"`)
      .addText(text =>
        text
          .setValue(this.plugin.settings.correctChar)
          .onChange(async value => {
            this.plugin.settings.correctChar = value;
            await this.plugin.saveSettings();
          }))


    containerEl.createEl('h3', { text: 'Donations' });

    containerEl.createEl("span", {
      text: "💰You can support by donating "
    }).createEl("a", {
      href: "https://liberapay.com/Cuatroy2/donate",
      text: "here"
    });
    containerEl.createEl("span", {
      text: " or contributing to the plugin. As well, you can check out more content on ",
    }).createEl("a", {
      href: "https://medium.com/@cuatroy2",
      text: "Medium"
    });
    containerEl.createEl("span", {
      text: " and ",
    }).createEl("a", {
      href: "https://github.com/alvaro-cas",
      text: "Github"
    });
    containerEl.createEl("span", {
      text: ". Enjoy!",
    });

    const liberapay = this.containerEl.createDiv("liberapay");
    liberapay.createEl("a", {
      href: "https://liberapay.com/Cuatroy2/donate"
    }).createEl("img", {
      attr: {
        src: "https://img.shields.io/badge/Liberapay-F6C915?style=for-the-badge&logo=liberapay&logoColor=black"
      }
    });

  }
}
