# A node-js backend Service Template

### Pre-Requisite
 - NodeJS
 - Redis
 - Linux/Debian (Ubuntu )

### Installation
 - Run the command `npm install --verbose`
 - Update the .env file with following values :
   ```

    CHARSET=utf8mb4 <YOUR MYSQL DATABASE CHARSET>
   ```
  - [OPTIONAL] To install dev-dependencies
     ```
     $ sudo npm install -g nodemon
     $ sudo npm install -g pm2
     ```


### Execution
 - ##### [NOTE] RUN THE COMMANDS IN SPECIFIED WAY ONLY!
 - `For Dev mode (Hot-Reloading Enabled) / Local Testing:`
    ```
    $ nodemon server.js
    ```
 - `For Deployment (PM2/ Instance):`
    - In root directory execute the below commands :
    ```
    $ pm2 start server.js --name your-service
    ```
