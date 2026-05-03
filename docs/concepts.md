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

## 5. What is DNS?

### Definition

DNS is a system that translates domain names into IP addresses or hosting platform addresses.

In simple words, DNS is like the phone book of the Internet.

### Why do I need it in ZhenGeek Blog?

When I use `zhengeek.io`, DNS tells the Internet where this domain should point.

Without DNS configuration, the browser may not know which server or platform should respond.

### My Understanding

DNS 可以理解为把域名解析成 IP 地址或托管平台地址的系统。

域名是给人看的网站名字，比如 `zhengeek.io`。  
IP 地址或托管平台地址才是电脑真正用来寻找服务器的位置。

只购买域名并不能让网站自动访问。配置 DNS 的作用，就是告诉互联网我的域名应该指向哪里。

在 ZhenGeek Blog 项目中，DNS 负责把 `zhengeek.io` 和真正承载网站的服务器或托管平台连接起来。

如我在腾讯云平台（我服务器所部署的平台）里添加的解析记录就是DNS的一种。

## 6. What is Domain Name?

### Definition

A domain name is a human-readable address for a website.

### Why do I need it in ZhenGeek Blog?

In ZhenGeek Blog, `zhengeek.io` is not only my website address, but also part of my personal technical brand.

However, buying a domain name does not mean the website is already online. It still needs DNS configuration and a hosting platform.

### Domain Name vs DNS

A domain name is the readable website address for humans.

DNS is the domain name system that translates a domain name into the real server address or hosting platform address.

### My Understanding

域名是便于人类阅读和记忆的网站地址，比如 `zhengeek.io`。

对 ZhenGeek Blog 来说，它不仅是访问地址，也是我的长期个人品牌。

但域名只是“名字”，还需要通过 DNS 把它指向真正承载网站的服务器或托管平台。

## 7. What is SSL / HTTPS?

### Definition

SSL/TLS is a security technology that protects the connection between a browser and a website.

HTTPS is the secure version of HTTP. It uses SSL/TLS to encrypt data during transmission.

### Why do I need it in ZhenGeek Blog?

In ZhenGeek Blog, HTTPS can make `zhengeek.io` safer and more trustworthy.

It protects the data transmission between users' browsers and my website, and browsers will show the website as a secure connection.

### My Understanding

HTTP：负责浏览器和服务器之间传输网页数据，普通的网页通信
SSL/TLS：保护浏览器和网站之间连接安全的技术。
HTTPS：HTTP + SSL/TLS，是加密后的网页安全通信

### Misunderstanding

域名告诉你网站叫什么；DNS 负责找到这个网站在哪里；HTTPS 负责让访问过程更安全。

## 8. Static Website vs Dynamic Website

### Definition

A static website shows fixed content through files such as HTML, CSS, and JavaScript.

A dynamic website can change content based on user actions, backend services, or data from a database.

### Why do I need it in ZhenGeek Blog?

In the early stage, ZhenGeek Blog can start as a static frontend website because it is simpler and easier to build.

Later, when I add backend APIs, a database, article management, login, and comments, it will become a dynamic full-stack website.

### My Understanding

ZhenGeek Blog 前端页面可以先做成静态展示，后续通过后端 API 和数据库提供动态数据，让整个项目升级为动态全栈网站。

先静态后动态在缩小制造成本的同时，也有助于我一步一个脚印的学习前端知识。

## 9. What is Frontend-Backend Separation?

### Definition

Frontend-backend separation means the frontend and backend are developed as two separate parts.

The frontend is responsible for the user interface and user interaction,which is built with Vue3, TypeScript, and Vite, mainly displaying pages and content.  

The backend is responsible for business logic, data processing, authentication, and database operations,which is built with Spring Boot and MySQL, mainly handling data, business logic, and dynamic content.

They communicate through APIs, usually via HTTP requests.

### Why do I need it in ZhenGeek Blog?

This architecture reduces frontend development complexity, allows for dynamic features via backend, and provides a clear, scalable, and professional engineering structure.

### My Understanding

前后端分离意味着前端和后端使用两套系统开发。

前端负责用户看到的界面和交互。  
后端负责数据处理、逻辑计算和数据库操作，用户看不到，但它是动态网页功能的关键。  

前端和后端通过 API 连接，通常使用 HTTP 请求。  

这种架构比单纯的静态网页更复杂，但可以通过后端实现动态功能，比单纯动态网页更便捷，更节约开发成本，同时提升用户体验。

## 10. API (Application Programming Interface)

### Definition

An API is a set of rules that allows different software applications to communicate.

It defines how requests are made, what data is sent, and what responses are returned.

### Why do I need it in ZhenGeek Blog?

The frontend cannot directly access the database.  

It needs to send requests to backend APIs to retrieve or modify data, such as articles, user profiles, or comments.

APIs make frontend-backend separation possible.

### Format

JSON

### My Understanding

API 是软件之间交流的一组规则，定义请求的发送方式、参数和返回结果。

在前后端分离中，它负责联系前端和后端，确保前端发送的请求可以被后端接收和处理。

比如前端要检索文章或修改数据时，会调用后端 API，并通过 JSON 格式交换数据。

## 11. HTTP (HyperText Transfer Protocol)

### Definition

HTTP is the protocol used by browsers and servers to communicate over the web.  

It defines how requests are sent, how servers respond, and how data is formatted during transmission.

### Why do I need it in ZhenGeek Blog?

All API communication between the frontend and backend is based on HTTP.  

Understanding HTTP methods and stateless nature is essential for building a dynamic full-stack website.

### Key Points

- HTTP is the communication protocol for the web.
- GET: retrieve data  
- POST: send new data  
- PUT: update existing data  
- DELETE: remove data  

- HTTP is stateless: each request is independent  

- APIs communicate via HTTP requests and responses

### My Understanding

HTTP 是浏览器和服务器之间用来传输网页数据的通信协议，定义了请求的发送方式和服务器的响应方式。

在前后端通信中，HTTP 是所有 API 请求的基础。

常用方法包括 GET（获取数据）、POST（发送数据）、PUT（更新数据）、DELETE（删除数据）。

HTTP 是无状态的：每个请求都是独立的，不会自动记住之前的请求。