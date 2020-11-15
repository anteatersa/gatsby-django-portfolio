# Gatsby Django Portfolio
A beautiful and flexible portfolio for displaying your work.

This project deploys a django admin as a CMS backend and a Gatsby JS frontend to build a static portfolio for deployment to the static hosting provider of your choice

## Features

- Easily editable portfolio items and site settings in the Django admin
- Edits in Django trigger a gatsby rebuild
- Gatsby Dev server for previewing your site while editing
- Responsive Design for desktop and mobile
- Statically generated builds that can be hosted almost anywhere
- Customisable colours per page
- Customisable headers per page
- SVG logo support and logo will change to match page colour


## Setup
- Clone the project to your server
- docker-compose build
- docker-compose up
- visit http://localhost:8002 nad login with admin/Ieth8Joh
- change the default password
- Add/Edit your works for your project
- View your dev site at http://localhost:8000
- Publish your site by clicking the "Publish Site" button in the Django admin
- Copy the generated files in gatsby/public folder to your hosting provider (Github pages etc) 


## Screenshots

### Home Screen
![alt tag](https://raw.githubusercontent.com/anteatersa/gatsby-django-portfolio/blob/master/screenshots/home.png)

### Work Example 1
![alt tag](https://raw.githubusercontent.com/anteatersa/gatsby-django-portfolio/blob/master/screenshots/work-1.png)

### Work example 2
![alt tag](https://raw.githubusercontent.com/anteatersa/gatsby-django-portfolio/blob/master/screenshots/work-2.png)

### Preference Django
![alt tag](https://raw.githubusercontent.com/anteatersa/gatsby-django-portfolio/blob/master/screenshots/preferences.png)

### Editing Works Django
![alt tag](https://raw.githubusercontent.com/anteatersa/gatsby-django-portfolio/blob/master/screenshots/works.png)

### editing Work Django
![alt tag](https://raw.githubusercontent.com/anteatersa/gatsby-django-portfolio/blob/master/screenshots/work.png)
