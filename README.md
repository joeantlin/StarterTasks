## Make React Components

Some important points to remember as you get started

- You must execute a `yarn install` command out of the terminal or the Git Bash window before you can execute a `yarn start` command
- Be sure to install all VS Code "Recommended Extensions" as they are required


Command examples can be found at the bottom of this file.

### Already Installed Into This Application

The following modules are already installed

- bootstrap
- reactstrap
- axios
- react-router
- react-toastify
  - https://github.com/fkhadra/react-toastify
- sweetalert2
  - https://github.com/sweetalert2/sweetalert2
-  rc-pagination
  - https://github.com/react-component/pagination

The application is ready for you to build.

---

The goal of this exercise is to make break up the the web page see when you run via `yarn start` into different React Components.

:star: Use the `/public/Step1.png` file located in the public folder as guidance for the components you should create. 

Your app should contain at least these components:

- Footer
- SiteNav
- Jumbo
- Content

> This material was covered in the videos you have been pointed to, within this wiki

:star: After you are done breaking up the page into components then do the following tasks below.

## Implement a Click Handler

- Add a button to the Content Component
- Add a click handler that will console.log a message

## Implement React Router

- Implement Routing to render the components
  - The package `react-router-dom` is already included in the packages.json file so you do not have to install
  - [Wiki Page](https://github.com/sabiocode/wiki/blob/2be205f2d3bd64867c8acaf6a4392c2172b45cb1/javascript/React/React-Router.md)

## Implement an Ajax Call

- Make a hard coded ajax call to the login endpoint (user example below) inside your click handler function so that when you clikc, you make the ajax/axios call

  - Search this wiki ["Axios Template"](https://github.com/sabiocode/wiki/blob/master/javascript/Axios)

```javascript
var payload = { email: "user@google.com", password: "password" };
```

## Implement an Ajax Call on ComponentDidMount

- Make the same ajax call to the login endpoint as the section above but make the call on when the component mounts. (Use componentDidMount)

### Command Examples

These are the command example that you would need to run out of the terminal to get your react application up and running.

#### Yarn
From within the folder that contains the `package.json` file.
```bash
yarn install
```
Then you execute:
```bash
yarn start
```

### Install Sabio Module
From Bash window run the following command
```bash
npm install sabio -g
```

##### Saving Work
From Git Bash window
From within the folder that contains the `share-branch.json` file.
```bash
sabio -sb
```
This command will save a copy of your code on our GitHub account so you can share or backup you code. You can/should do this every day.

##### Using rc-pagintation
Once you are ready to do pagination in React you should use the library installed already called rc-pagination.

For more on using this go to he documentation:

- https://github.com/react-component/pagination


*It is very important that you import the css file to use this library*

To import the css file add to the top of the component: 

  ```javascript
import 'rc-pagination/assets/index.css'
```



