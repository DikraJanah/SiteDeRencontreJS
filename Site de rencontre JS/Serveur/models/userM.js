const {DataTypes} = require('sequelize');
const {sequelize} = require('./db');
const Meeting = require('.require/meetingM');
const Client = sequelize.define('Client', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull : false
    },
    sexe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sexe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        len:[12,999],
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
});
Client.hasMany(Meeting)
Meeting.belongsTo(Client)
module.exports = User;