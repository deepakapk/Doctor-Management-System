## Project Flow

### App.js
1. configuring .env file
2. using cors for frontend
3. used three middlewares 
    - cookieParser
    - express.json()
    - express.urlencoded()
4. used another middleware to upload files to cloudinary
5. used routes middleware for messagerouter, userrouter and appointment router
6. connected to database
7. used errormiddleware in the end

### then we moved to server.js
1. setup cloudinary
2. listen the server

### then we have made a folder named database
1. which has database.js contains code to connect with mongoose database and export dbConnection() which is used in app.js

### then we created middlewares
1. auth.js - to authenticate and authorization
2. errorMiddlware - which is used in last at app.js
3. catchAsyncerror - which is used to catch asyncErrors

### then we created models folder
to create all modelschema





