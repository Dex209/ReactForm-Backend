const Sequelize = require('sequelize')

const sequelize = new Sequelize('u342643381_database', 'u342643381_root', 'OKn2089x', {
    dialect : 'mysql', 
    host: 'srv1782.hstgr.io',
    port: 3306
})

module.exports = sequelize