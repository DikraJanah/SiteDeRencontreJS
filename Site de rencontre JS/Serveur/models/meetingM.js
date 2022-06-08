const {DataTypes} = require('sequelize');
const {sequelize} = require('./db');
const Meeting = require('./rencontreM');

const clientMeet = sequelize.define('clientMeet', {
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    remarque:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
},);
clientMeet.hasMany(Meeting)
Meeting.belongsTo(clientMeet)
module.exports = clientMeet;