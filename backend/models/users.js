var bcrypt = require('bcryptjs');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password_hash: {type: DataTypes.STRING, allowNull: true}
  }, {
    classMethods: {
      associate: function(models) {
      }
    },
    instanceMethods: {
        setPassword: function(password, done) {
            var that = this;
            return bcrypt.genSalt(10, function(err, salt) {
                if(err) {
                    throw err;
                }
                bcrypt.hash(password, salt, function(err, password_hash) {
                    if (err) {
                        throw err;
                    }
                    that.password_hash = password_hash;
                    if(done)
                        return done();
                });

            });
        }, 
        verifyPassword: function(password, done){
            return bcrypt.compare(password, this.password_hash, function(err, res) {
                if(done)
                    return done(err, res);
            });
        }
    }
    });
  return User;
};