# ZhenGeek Blog - Basic Concepts

## 1. What is Node.js?

### Definition

Node.js is a runtime environment that allows JavaScript to run outside the browser.

In the past, JavaScript mainly ran in browsers to control web page interactions. With Node.js, JavaScript can also run on my computer through the terminal.

### Why do I need it in ZhenGeek Blog?

In ZhenGeek Blog, I need Node.js to create and develop the Vue3 frontend project. 

It allows me to use npm, install dependencies, run the local development server, and build the frontend project for deployment.

For example, commands like `npm install`, `npm run dev`, and `npm run build` all depend on Node.js.

### My understanding

Node.js是一个让JavaScript可以在电脑本地脱离浏览器运行的环境

在ZhenGeek Blog项目中，Node.js是前端开发的基石。它可以让我使用npm、Vite等工具来创建、运行和打包Vue3项目

我还弄清了一个曾经被混淆的概念：Node.js 不是最终承载网页运行的环境，而是前端开发工具链运行的基础环境。

Vue3页面最终是在浏览器中显示的，但是Vue3项目的开发过程需要依赖Node.js

## 2. What is Git?

### Definition

Git is a version control tool,which can help me record every important change and manage the long-term project.

### Why do I need it in ZhenGeek Blog?

Help me manage the project record,record my growth,prevent the loss of important code,and also show me the clear development history.

### Git vs Github

Git：a version control system installed on my computer.

GitHub:an online code hosting platform for storing and displaying remote repositories.

Git can work without GitHub,but GitHub is built around Git.

### Basic Commands

git add xxx: put file'xxx' to the staging area,which means I'm preparing this file for the next commit.

git commit -m "message": saves the changes in staging area as a version in local repository.The message describes what this commit does.

git push: upload locan commits to the remote repository on Github

git status: check the current state of a Git repository.
For example, it can show:
- Which files have been modified
- Which new files are not tracked by Git yet
- Which files have been added to the staging area
- Whether there is anything to commit or push



### My understanding

git add: 选择要提交的修改，把它们加入暂存区。  
git commit: 把暂存区里的修改保存到本地版本历史中。  
git push: 把本地仓库里的 commit 上传到 GitHub。

即：
工作区：实际修改文件的地方（你正在草稿纸上修改内容）
暂存区：选中你准备提交的内容（你把准备定稿的几页夹出来）
本地仓库：把暂存区里的内容正式保存成一个版本（你把这些内容正式装订成一本书）
远程仓库：把电脑里的commit上传到GitHub（把你的书上传到云端）

↑特别指出，git push上传的不是文件本身，而是提交记录commit（当然commit里包含了文件变化）

## 3. What is GitHub?

### What is it?

### Why do I need it in ZhenGeek Blog?

### What do I still not understand?

## 4. Basic Git Workflow

### Working Directory

### Staging Area

### Local Repository

### Remote Repository

### git add

### git commit

### git push

## 4. What is a Domain Name?

## 5. What is DNS?

## 6. What is SSL / HTTPS?

## 7. Static Website vs Dynamic Website

## 8. What is Frontend-Backend Separation?

## 9. Basic Git Workflow
