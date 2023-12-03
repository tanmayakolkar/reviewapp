'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Company.hasMany(models.Review);
        }
    }
    Company.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50],
            }
        },
        founded: {
            type: DataTypes.DATE,
            allowNull: false,
            // validate: {
            //     isDate: true,
            //     notEmpty: true,
            // }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                // len: [10, 100],
            }
        }
    }, {
        sequelize,
        modelName: 'Company',
        tableName: 'Companies'
    });
    return Company;
};