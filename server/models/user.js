'use strict';
const {goHash} = require('../helper/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {foreignKey: "UserId", sourceKey:"id"})
    }

    get fullname(){
      return `${this.first_name} ${this.last_name}`
    }
  };
  User.init({
    first_name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `First name must not null`
        },
        notEmpty : {
          msg : `First name must not empty`
        }
      } 
    },
    last_name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : {
          msg : `must filled it with email`
        },
        notNull : {
          msg : `email must not null`
        },
        notEmpty : {
          msg : `email must not empty`
        }
      } 
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `password must not null`
        },
        notEmpty : {
          msg : `password must not empty`
        },
        isLength(value){
          if (value.length < 8) {
            throw new Error(`minimum length of password is 8`)
          }
        },
        isContain(value){
          let str = `1234567890-=[];',./~!@#$%^&*()_+|}{:"<>?}`
          let contain = true
          for (let i = 0; i < str.length; i++) {
            if (value.includes(str[i])) {
              contain = true
              break
            } else {
              contain = false
            }
          }
          if (contain === false) throw new Error(`Password must contain minimum numbers and/or symbols`)
        }
      } 
    }
  }, {
    hooks : {
      beforeCreate : (inst,opt) => {
        if (inst.last_name === '' || inst.last_name === undefined || inst.last_name === null) {
          inst.last_name = inst.first_name
        }
        inst.password = goHash(inst.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};