# Meow Moments
## About this Project
Meow Moments features a lot of the common functionality you would see in a standard social media application. This includes posting images with descriptions and hashtags of your choice, viewing posts by recent or trending, viewing the profiles of other users, user authorization and authentication, and much more. The authorization and authentication was self-implemented so that I could learn the methods used to maintain and protect user data before using an auth provider like Auth0. To list some of the things I learned and ended up implementing in this project:
 - User registration, logging in, logging out, and reset password functionality.
 - Securing passwords by hashing and salting them using bcrypt before storing them in the database.
 - Conditionally rendering components that require auth.
 - User account verification through email.
 - User authorization using secure access and refresh token cookies.
 - Protecting certain routes from unverified/unregistered users.

This project was built using a number of tools and libraries. The significant ones are as listed:
 - Typescript
 - React using create-react-app
 - React Router
 - Tailwind
 - A storage bucket to store images posted on the website, a CDN to quickly distribute them throughout parts of the world, and a load balancer to take care of request traffic. I used Google Cloud to provide me all of these services. These services will be cancelled once the project is completed to prevent billing to my card.
 - A Postgres database to store any user data like posts, post likes, hashtags, etc.
 - JSON Web Token to generate secure refresh and access tokens and protect specific routes.
 - bcrypt to salt and hash passwords before storing them in the database.
 - Express to build an API, allowing the client and server side to communicate.

## Getting Started
cd to the server directory and run "npm run dev" to get the server side of the application started. Then cd to the client and run "npm start" and navigate to http://localhost:3000/.

## Next Steps
I plan to focus on refining my skills in React, while also learning about TDD with Jest and how to handle global states using Redux + Redux Toolkit.
