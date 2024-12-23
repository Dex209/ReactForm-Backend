const Sequelize = require('sequelize')

// const sequelize = new Sequelize('reactform', 'root', '', {
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306
// })

const sequelize = new Sequelize('railway', 'root', 'aqKaIpJuYuwNFSXekrkMrTZtfCJfoZGU', {
    dialect: "mysql",
    host: "junction.proxy.rlwy.net",
    port: 31178
})

module.exports = sequelize