const Sequelize = require('sequelize')

// const sequelize = new Sequelize('reactform', 'root', '', {
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306
// })

const sequelize = new Sequelize('railway', 'root', 'vHzbyapYDMCZxqTwmcTFAOSmHpSLbnyq', {
    dialect: "mysql",
    host: "autorack.proxy.rlwy.net",
    port: 57509
})

module.exports = sequelize