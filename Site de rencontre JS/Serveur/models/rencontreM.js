const {DataTypes} = require('sequelize');
const {sequelize} = require('./db');
const Meeting = sequelize.define('Meeting', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    rating: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    remarque: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});
module.exports = Meeting;