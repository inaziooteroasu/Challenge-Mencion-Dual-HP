This application is a social service that comppletes the following functions:

o Sign Up. 
 * A new user requests to register to our service, providing its username and password. 
 * Username must be unique, from 5 to 10 alphanumeric characters. 
 * Password from 8 to 12 alphanumeric characters. 
o Request friendship. 
 * A registered user requests friendship to another registered user. 
 * A user cannot request friendship to himself or to a user that already has a pending request from him. 
o Accept friendship. 
 * A registered user accepts a requested friendship. 
 * Once accepted both users become friends forever and cannot request friendship again. 
o Decline friendship. 
 * A registered user declines a requested friendship. 
 * Once declined friendship can be requested again. 
o List friends. 
 * List friend of a registered user. 
o Edit Profile. 
 * There is no functionality finished.

 User Manual:

  o Open two ternimals for running both back-end and front-end.
   * Back-end: navigate to the next directory: \Challenge-Mencion-Dual-HP\social-service and run the following line: node server.js
   * Front-end: navigate to the next directory: \Challenge-Mencion-Dual-HP\social-service\social-service-frontend  and run the following line: npm start 
     The web page will open in your browser automatically.
   
  o The navigation is very intuitive and the functionalities can be checked.

  o If neccesary, the database can be removed by deleting the 'database.db' file of the social-service folder.