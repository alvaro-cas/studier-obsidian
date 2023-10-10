# Studier Obsidian
**Create quizzes for your [Obsidian.md](https://obsidian.md/) notes and learn better.** 


## Introduction

This Obsidian plugin lets you review your notes with quizzes. You can make your own questions for each note and customize how the plugin reads them, so it matches the style of your notes. The plugin randomly selects a markdown note and if there are questions in it, it prompts you with a quiz and the best part is you can easily check your answers. If there are no questions, the plugin will function like the Core plugin "Random Note".


***


## Installation
You can install the plugin via the Community Plugins (coming soon) tab within Obsidian by searching for "Studier".

### Manual
You can install the plugin manually:
- Go to [latest release](https://github.com/alvaro-cas/studier-obsidian/releases/latest) on GitHub.
- Download `main.js`, `manifest.json` and `style.css`
- Copy over `main.js`, `manifest.json` and `style.css` to this location inside your vault: `VaultName/.obsidian/plugins/studier`. (create studier folder)


***


## Usage
You open Studier in two different ways: 

#### 1.Command Palette
Press Ctrl+P or selected hotkey to open the command palette. Search for "Studier". 

#### 2. Ribbon Icon
Navigate to the left sidebar, select the ribbon with a graduation cap icon. 

> If there are questions a modal will appear, after that you can answer your questions and then check them.


![](https://github.com/alvaro-cas/studier-obsidian/blob/main/assets/sample_questions.png?raw=true)


![](https://github.com/alvaro-cas/studier-obsidian/blob/main/assets/sample_checker.png?raw=true)


### Creating questions for quizzes
Once you choose either option 1 or 2, a modal will show up with some questions. If not, you can just write your own questions in your note. It doesn't matter where you put them, as long as you stick to the formats you've chosen. Here are some examples you can use as a guide. 

#### ~ Example One

![](https://github.com/alvaro-cas/studier-obsidian/blob/main/assets/default_sample_markdown.png?raw=true)

> Anatomy of settings

##### Selected Settings

| Name | Description | Setting Value |
|--|--|--|
| Questions Intializer | The character(s) used to identify where the questions begin. | "> [!info]- Questions" |
| Questions Ender | The character(s) used to identify the delimiter for reading the questions. | ">---" |
| Starter Question Indicator | The character(s) used to identify where the question begins. | "> - " |
| Correct Answer Indicator | The character(s) used to identify the correct answer. | "-!" |

> Quotes are only for reference, do not copy.

#### ~ Example Two

![](https://github.com/alvaro-cas/studier-obsidian/blob/main/assets/custom_sample_markdown.png?raw=true)

##### Selected Settings

| Name | Description | Setting Value |
|--|--|--|
| Questions Intializer | The character(s) used to identify where the questions begin. | "## Questions" |
| Questions Ender | The character(s) used to identify the delimiter for reading the questions. | "!END" |
| Starter Question Indicator | The character(s) used to identify where the question begins. | "- " |
| Correct Answer Indicator | The character(s) used to identify the correct answer. | ".x" |

> Quotes are only for reference, do not copy.

***

## Future implementations
- Create a note with checked quiz showing wrong / right answers.
- Allow multiple correct answers
- Allow open questions (idea for verification: Bayes Theorem)


## MIT LICENSE
Review the [LICENSE](https://github.com/alvaro-cas/studier-obsidian/blob/main/LICENSE)


## The End
I hope you enjoy! You can *support* my work [here](https://liberapay.com/Cuatroy2/donate) (I contribute 1% of my revenue to fund carbon removal🌳) or check more content at my [Medium](https://medium.com/@cuatroy2).

*Peace Out!* 🤙

<noscript><a href="https://liberapay.com/Cuatroy2/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a></noscript>

