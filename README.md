<h1 align="center">Tradelous Desktop</h1>

<p align="center">
  An app developed in order to provide an easy way to manage stocks and sales of varied companies.
</p>

![147826010-25e9ef50-474a-49a8-b486-3ead4bed8105](https://github.com/user-attachments/assets/8f798684-4e75-43f2-b829-22f1ddb9203e)
![image](https://img.shields.io/github/license/RiadOliveira/Tradelous-frontend-desktop)

<br/>

Contents
=================
<!--ts-->
   * [🛠️ Technologies](#technologies)
   * [💻 Install & Run](#install&run)
      * [Prerequisites](#prerequisites)
      * [Running the app](#running)
   * [⚙️ Features](#features)
   * [📷 Screen Shots](#screenshots)
      * [Authentication](#auth-screens)
        * [Landing Screen](#landing)
        * [SignUp](#sign-up)
        * [SignIn](#sign-in)
        * [Forgot Password](#forgot-password)
        * [Recover Password](#recover-password)
      * [Dashboard](#dashboard-screens) 
        * [Company](#company)
        * [Profile](#profile)
        * [Products](#products)
        * [Sales](#sales)
   * [📝 License](#license)
   * [👨 Author](#author)
<!--te-->
<br/>

<h2 id="technologies">🛠️ Technologies</h2>
Tools used on this project:

- [React](https://reactjs.org/)
- [Electron](https://www.electronjs.org/)
- [TypeScript](https://www.typescriptlang.org/) <br/><br/>

<h2 id="install&run">💻 Install & Run</h2>

<h3 id="prerequisites">Prerequisites</h3>
  
  Before you start, it will be necessary to install those tools on your machine: [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/). Also, you will need the backend of this app installed and running on your machine, which is explained how to do on this repository: [Tradelous Backend](https://github.com/RiadOliveira/Tradelous-backend).
  
<h3 id="running">Running the app</h3>
  
  ```bash
    # Clone this repository
    $ git clone https://github.com/RiadOliveira/Tradelous-desktop.git
  
    # Access project's folder
    $ cd Tradelous-desktop

    # Install the dependecies
    $ npm install
    or
    $ yarn

    # Run the app (With backend running on background)
    $ npm start
    or
    $ yarn start
  ```

<br/>

<h2 id="features">⚙️ Features</h2>

- User's register, update and delete. The user can be admin or employee of a company.
- Company's register, update and delete (After user's account has been created).
- [Admin] Can hire (Using their IDs, which the user can access on profile's screen) and fire employees from the company.
- Product's register, update and delete (By an employee or the admin of the company).
- It's possible to read a barcode from products, using a scanner, and associate this code to the product saved on the app, being possible to use it on products' search afterwards.
- System to register product's sales (on current date), determining product's sold quantity and sale's payment method (money or card).
- Search system to find products (By name) and sales (By date, being possible to choose the type of the search, that can be: day, week and month. Starting on the selected date, example: if the user choose January 10 and type month, will find all sales between January 10 and February 10). <br/><br/>

<h2 id="screenshots">📷 Screen Shots</h2>

<h3 id="auth-screens">Authentication</h3>

![Landing-transition](https://user-images.githubusercontent.com/69125013/148226991-258b5e0c-93b6-4800-ae37-f431eeffe7e2.gif)

- <h4 id="landing">Landing Screen</h4>

![image](https://user-images.githubusercontent.com/69125013/147825665-aff715c5-473f-475f-964e-9657411c5313.png)

- <h4 id="sign-up">SignUp</h4>

![image](https://user-images.githubusercontent.com/69125013/148123918-ca63c481-98d6-4517-a7d4-f5a89546bdc0.png)

- <h4 id="sign-in">SignIn</h4>

![image](https://user-images.githubusercontent.com/69125013/147825769-131d2aad-e4f4-4f89-9259-0e255fbf6ae6.png)

- <h4 id="forgot-password">Forgot Password</h4>

![image](https://user-images.githubusercontent.com/69125013/147825808-ad1b14ff-51a2-4ecc-8d6e-5e1f315a8a12.png)
  
- <h4 id="recover-password">Recover Password</h4>

![image](https://user-images.githubusercontent.com/69125013/148124121-6f14aab9-eadd-4c50-ac0d-b79f86a3206e.png)

<h3 id="dashboard-screens">Dashboard</h3>
  
![Dashboard-transition](https://user-images.githubusercontent.com/69125013/148225486-c60a203b-2799-4a5b-86ae-f3f314c7e605.gif)

- <h4 id="company">Company - Employer View</h4>

![image](https://user-images.githubusercontent.com/69125013/147825927-cabeddf6-f544-4aed-808a-ab2a1701d80b.png)

- <h4 id="company">Company - Employee View</h4>

![image](https://user-images.githubusercontent.com/69125013/147826456-0737cf42-6836-4ba4-8abc-90b3ccfae628.png)

- <h4 id="company">Company - Unemployed View</h4>

![image](https://user-images.githubusercontent.com/69125013/147827544-8ad91f31-40f5-4cc8-add4-37854ad8cf6e.png)

- <h4 id="profile">Profile</h4>

![image](https://user-images.githubusercontent.com/69125013/147825972-7dd9d435-fc7f-4074-98ec-379920fa977f.png)

- <h4 id="products">Products</h4>

![image](https://user-images.githubusercontent.com/69125013/147826010-25e9ef50-474a-49a8-b486-3ead4bed8105.png)

- <h4 id="sales">Sales</h4>

![image](https://user-images.githubusercontent.com/69125013/147826176-79d6cf9a-9b0c-4369-8596-2f4bd7f3be20.png)

<h2 id="license">📝 License</h2>
This project is MIT Licensed. See <a href="https://github.com/RiadOliveira/Tradelous-desktop/blob/main/LICENSE">LICENSE</a> file for more details.

<br/>

<h2 id="author">👨 Author</h2>

<kbd style="display: inline-block; padding: 6px 6px 10px; font: 11px/10px SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; border: 1px solid #d1d5da; border-radius: 6px; box-shadow: inset 0 -1px 0 #d1d5da;">
  <a href="https://github.com/RiadOliveira" style="display: block;">
    <img src="https://avatars.githubusercontent.com/u/69125013?v=4" width="100" alt="Ríad Oliveira" style="border-radius: 4px; margin: 0;"/>
    <br/><br/>
    <p align="center" style="margin: 0;"><b>Ríad Oliveira</b></p>
  </a>
</kbd>

### 🌐 Socials

<div style="display: flex; flex-wrap: wrap; gap: 8px;">
  <a href = "mailto:riad.oliveira@hotmail.com">
    <img src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" target="_blank" style="border-radius: 2px; margin: 0;"/>
  </a>
  <a href = "mailto:riad.oliveira@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank" style="border-radius: 2px; margin: 0;"/>
  </a>
  <a href="https://www.linkedin.com/in/ríad-oliveira" target="_blank">
    <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank" style="border-radius: 2px; margin: 0;"/>
  </a>
</div>
