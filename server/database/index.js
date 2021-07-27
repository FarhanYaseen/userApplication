 require("dotenv").config();

 const config = {
   getConnectionString: function () {
     return process.env.DATABASE_URL;
   },
 };
 
 module.exports = config;
 