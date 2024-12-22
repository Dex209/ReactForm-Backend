const Sequelize = require('sequelize')
const database = require('./connection')

const bd_users = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING
    },

    password: {
        type: Sequelize.STRING
    },

    state: {
        type: Sequelize.STRING
    },

    hasPermission: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

bd_users.sync({force: true})


module.exports = bd_users