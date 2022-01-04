<h1 align="center">Tradelous (Desktop)</h1>

<p align="center">
  A app developed in order to provide an easy way to managment stocks and sales of varied companies. It was made mainly in order to pratice
  my development skills on web and desktop.
</p>

<h4 align="center"> 
	:convenience_store:&nbsp; Tradelous :heavy_check_mark: Finished &nbsp; :convenience_store: </br>
</h4>

![image](https://img.shields.io/github/license/RiadOliveira/Tradelous-frontend-desktop)

Contents
=================
<!--ts-->
   * [🛠 Technologies](#technologies)
   * [:computer: Install & Run](#install&run)
      * [Prerequisites](#prerequisites)
      * [Running the app](#running)
   * [:gear: Features](#features)
   * [:camera: Screen Shots](#screenshots)
      * [Authentication](#auth-screens)
      * [Dashboard](#dashboard-screens)
   * [:man: Author](#author)
<!--te-->
</br>

<h2 id="technologies">🛠 Technologies</h2>
Tools used on this project:

- [React](https://reactjs.org/)
- [Electron](https://www.electronjs.org/)
- [TypeScript](https://www.typescriptlang.org/) </br></br>

<h2 id="install&run">:computer: Install & Run</h2>

<ul>
  <li id="prerequisites"><h3>Prerequisites</h3></li>
  
  Before you start, it will be necessary to install those tools on your machine: [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/). Also, you will need the backend of this app installed and running on your machine, which is explained how to do on this repository: [Tradelous Backend](https://github.com/RiadOliveira/Tradelous-backend)
  
  <li id="running"><h3>Running the app</h3></li>
  
  ```bash
    # Clone this repository
    $ git clone <https://github.com/RiadOliveira/Tradelous-frontend-desktop.git>

    # Install the dependecies
    $ npm install
    or
    $ yarn

    # Run the app (With backend running on background)
    $ npm start
    or
    $ yarn start
  ```
</ul>

</br>

<h2 id="features">:gear: Features</h2>

- [Admin] Can hire (Using their IDs, which the user can access on profile's screen) and fire employees of/from the company.
- User's register which can be admin or employee of a company.
- Company's register (When a user creates an account as admin or when he already has an account, but isn't associated to any company).
- Product's register, update and delete (By an employee or the admin of the company).
  - It's possible to read a barcode from products, using a scanner, and associate this code to the product saved on the app, being possible to use it on products' search afterwards.
- Sale's system to register product's sales, determining product's quantity and saving it on the current date.
- Search system to find products (By name) and sales (By date, being possible to choose the type of the search, that can be: day, week and month. Starting on the selected date, example: if the user choose January 10 and type month, will find all sales between January 10 and February 10). </br></br>

<h2 id="screenshots">:camera: Screen Shots</h2>

- <h3 id="auth-screens">Authentication</h3>

  - #### Landing screen
  ![image](https://user-images.githubusercontent.com/69125013/147825665-aff715c5-473f-475f-964e-9657411c5313.png)

  - #### SignUp
  ![image](https://user-images.githubusercontent.com/69125013/147825679-bc36e7af-caa7-4975-97b5-8acb118c7463.png)

  - #### Register Company (On account creation)
  ![image](https://user-images.githubusercontent.com/69125013/147825717-2a838b4f-23e2-4e8a-9f28-79ad62575c2b.png)

  - #### SignIn
  ![image](https://user-images.githubusercontent.com/69125013/147825769-131d2aad-e4f4-4f89-9259-0e255fbf6ae6.png)

  - #### Forgot Password
  ![image](https://user-images.githubusercontent.com/69125013/147825808-ad1b14ff-51a2-4ecc-8d6e-5e1f315a8a12.png)

- <h3 id="dashboard-screens">Dashboard</h3>

  - #### Company 
    - **Admin view**
    ![image](https://user-images.githubusercontent.com/69125013/147825927-cabeddf6-f544-4aed-808a-ab2a1701d80b.png)
    - **Employee view**
    ![image](https://user-images.githubusercontent.com/69125013/147826456-0737cf42-6836-4ba4-8abc-90b3ccfae628.png)
    - **Unemployed view**
    ![image](https://user-images.githubusercontent.com/69125013/147827544-8ad91f31-40f5-4cc8-add4-37854ad8cf6e.png)

  - #### Profile
  ![image](https://user-images.githubusercontent.com/69125013/147825972-7dd9d435-fc7f-4074-98ec-379920fa977f.png)

  - #### Products
  ![image](https://user-images.githubusercontent.com/69125013/147826010-25e9ef50-474a-49a8-b486-3ead4bed8105.png)

  - #### Sales
  ![image](https://user-images.githubusercontent.com/69125013/147826176-79d6cf9a-9b0c-4369-8596-2f4bd7f3be20.png)
  
</br>

<h2 id="author">:man: Author</h2>

---
<a href="https://github.com/RiadOliveira">
 <img src="https://avatars.githubusercontent.com/u/69125013?v=4;" width="100px;" alt=""/>
 <br/>
 <sub><b>Ríad Oliveira</b></sub>
</a>

</br>Contact:</br>

[![Linkedin Badge](https://img.shields.io/badge/-Ríad&nbsp;Oliveira-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/r%C3%ADad-oliveira-8492891b4/)](https://www.linkedin.com/in/r%C3%ADad-oliveira-8492891b4/) 
[![Gmail Badge](https://img.shields.io/badge/-riad.oliveira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:riad.oliveira@gmail.com)](mailto:riad.oliveira@gmail.com)
