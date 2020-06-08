# PASSPORT-JWT-TOKEN-AUTHENTICATION
A secured routes PASSPORT-JWT authentication for secured routes.


A secured authentication using JWT(jsonwebtokens)in Nodejs, with three major specialities -

 * Authenticating users with jsonwebtokens.
 * No user can access other routes unless JWT passed.
 * User has to re-login when token expires.
 * All user info are hashed and saved on to a MONGODB atlas.


## Setup

**1**  Setup the application by installing its dependencies with
```
npm install
```

**2.**  The app gets up and running on port 5000 with ```npm run dev```.

**3.**  **Important** Install some dependencies explicitly **npm install --save bcrypt body-parser express jsonwebtoken mongoose passport passport-local passport-jwt**


**4.**  **create a account on MongoDb Atlas and create a cluster and copy the 'srv' link to config directory under 'key.js' under MONGOURI: your link**

## Testing the API routes.
**1** Register yourself 

**2** Login by providing email and password

**3** Welcome to dashboard.


##Amendments to be done:
**1** UNIT TESTING WITH MOCHA

##BUILT WITH
**1** Express 
**2** Bcrypt
**3** Passport
**4** Jwt
**5** Ejs
