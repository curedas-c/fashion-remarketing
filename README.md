# Remarket-My-Business Admin Interface
This project is a Admin Interface, used to manage e-commerce mobile app made with Remarket-My-Business (https://remarket-my-business.web.app)
You need the Remarket-API to use it properly, ask the maintainer to gain access to the repo.

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:

* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Angular CLI - [Install Angular CLI](https://angular.io/cli).
* Yarn - [Download & Install Yarn](https://classic.yarnpkg.com/en/docs/install/).

### Quick install
To install the dependencies, run this in the application folder from the command-line:
```bash
$ yarn
```

#### Running your application in development mode
Run your application using npm:
```bash
$ yarn serve
```
Then,launch the API.
Navigate to `http://localhost:4400/`. The app will automatically reload if you change any of the source files.

##### Conventional commit
This project use [Commitizen cz-cli](https://github.com/commitizen/cz-cli) to check your commit message.
Don't make your commit with default Git command use instead:
```
$ yarn commit
```
Make sure to follow conventional commit rules for your commit to work: (https://www.conventionalcommits.org/en/v1.0.0/).

###### Versioning
This project use [Standard-version](https://www.npmjs.com/package/standard-version) to updates app version.
App version is automatically updated after each commit.
