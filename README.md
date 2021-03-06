# Bookstore
> React website created with Node.js, Express, Axios, SCSS, React-Bootstrap, Animate.css

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)


## General Information
Web application that allows you to add items with information about the book: author, title and book cover in the form of an image file. The item can also be deleted, sorted ascending or descending. The list is paginated to display up to 4 books and filters to search by name or author. The page has an animated caption and a list. The data is stored in a MySQL database named ksiegarnia and table ksiazka. Autoincrementation is applied to the primary key id. The other columns are title, author, and img.


## Technologies Used
Project is created with:
* [`react-bootstrap`](https://www.npmjs.com/package/react-bootstrap) v1.6.0 (Bootstrap 4.6)
* [`node-sass`](https://www.npmjs.com/package/node-sass)
* [`react-transition-group`](https://www.npmjs.com/package/react-transition-group)
* [`express`](https://www.npmjs.com/package/express)
* [`axios`](https://www.npmjs.com/package/axios)
* [`mysql`](https://www.npmjs.com/package/mysql)
* [`cors`](https://www.npmjs.com/package/cors)
* [`mutler`](https://www.npmjs.com/package/multer)
* [`fs`](https://www.npmjs.com/package/fs-js)


## Features
List of features:
- CR*D books
- animations on deleting and adding


## Screenshots
![1](https://github.com/dilejt/ksiegarnia/blob/master/screenshots/sreenshot.png)


## Setup
To run this project, install it locally using npm:

In main folder:
```
$ npm install
$ npm start
```
Second console for backend api:
```
$ cd .\express\
$ npm install
$ node .\app.js
```

Use XAMPP, for example, to create a database locally and then import it using the [`file`](https://github.com/dilejt/ksiegarnia/blob/master/ksiegarnia.sql)

Then visit [`http://localhost:3000`](http://localhost:3000).


## Room for Improvement
- fix file uploads (some files do not upload properly)
- updating items


## Contact
Created by [@Damian Jancewicz](https://www.linkedin.com/in/damian-jancewicz/) - feel free to contact me!
