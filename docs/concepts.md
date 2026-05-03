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

Git is a version control system,which can help me record every important change and manage the long-term project.

### Why do I need it in ZhenGeek Blog?

In ZhenGeek Blog, I use Git to manage the project history, record my growth, prevent the loss of important code, and show a clear development history.

### My understanding

Git 是一个版本控制工具，可以帮助我记录项目每一次重要修改，方便管理长期项目。

在 ZhenGeek Blog 项目中，Git 就像项目的存档器。每一次 commit 都是一个阶段性存档，我可以通过这些提交记录看到自己从 0 开始搭建项目的过程。

## 3. What is GitHub?

### Definition

GitHub is an online code hosting platform for storing and displaying remote repositories.It also can be used to sharing,exhibition and collaborative development.

### Why do I need it in ZhenGeek Blog?

GitHub provides remote backup, project exhibition, growth recording, and serves as a foundation for engineering collaboration.  

It will also be a part of my personal portfolio and technical brand.

### Git vs Github

Git：a version control system installed on my computer.

GitHub:an online code hosting platform for storing and displaying remote repositories.

Git can work without GitHub,but GitHub is built around Git.

### My understanding

需要特别声明的是，GitHub不仅是个普通网盘，它除了保存代码文件，还拥有保存commit记录、修改说明、历史版本、README、Issues等项目相关信息。

它更像是一个完整的工程项目档案馆。

## 4. Basic Git Workflow

### Definition

Git workflow describes how changes move through different stages in a Git project.

A typical Git workflow is:

---text
Working Directory
  ↓ git add
Staging Area
  ↓ git commit
Local Repository
  ↓ git push
Remote Repository

### Why do I need it in ZhenGeek Blog?

In ZhenGeek Blog, every project update should follow a clear Git workflow.

First, I modify files in the working directory.
Then, I use git add to move selected changes into the staging area.
Next, I use git commit to save these changes as a version in the local repository.
Finally, I use git push to upload local commits to the remote repository on GitHub.

Understanding this workflow helps me manage project versions clearly, avoid losing important changes, and build a professional development history.

### Basic Commands

git add xxx: put file'xxx' to the staging area,which means I'm preparing this file for the next commit.

git commit -m "message": saves the changes in staging area as a version in local repository.The message describes what this commit does.

git push: upload locan commits to the remote repository on Github

git status: check the current state of a Git repository.


### Working Directory

The place where I actually modify files in my project.

### Staging Area

The place where I select the changes that will be included in the next commit.

### Local Repository

The Git repository stored on my own computer. It saves my commit history locally.

### Remote Repository

The online repository stored on GitHub. It is used for backup, display, and collaboration.

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

Git 的本地开发流程是：

VSCode 修改文件
↓
git status查看状态
↓
git add选择要提交的内容
↓
git commit保存成本地版本
↓
git push同步到 GitHub


## 4. What is a Domain Name?

## 5. What is DNS?

## 6. What is SSL / HTTPS?

## 7. Static Website vs Dynamic Website

## 8. What is Frontend-Backend Separation?

## 9. Basic Git Workflow
