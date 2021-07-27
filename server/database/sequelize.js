const Sequelize = require("sequelize");
const config = require("./index");

const sequelize = new Sequelize(config.getConnectionString(), {
  define: {
    timestamps: false,
  },
  dialectOptions: {
    requestTimeout: 180000,
    useUTC: false,
  },
  pool: {
    max: 200,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

sequelize.authenticate().then(function (errors) {
	if(errors){
		console.log("Got error while connecting database", errors);
	}
});
sequelize.sync({force: false}).catch(error => {
  if(error){
		console.log("Got Error", errors);
	}
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;

