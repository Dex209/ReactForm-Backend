const Sequelize = require('sequelize')
const database = require('../connection')

const bd_pontos = database.define('bd_pontos', {
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },

    email_usuario: 
    {
        type:Sequelize.STRING 
    },

    instituicao: 
    {
        type:Sequelize.STRING,
        unique: true
    },

    cep:
    {
        type:Sequelize.STRING
    },

    cidade:
    {
        type:Sequelize.STRING
    },

    bairro:
    {
        type:Sequelize.STRING
    },

    rua:
    {
        type:Sequelize.STRING
    },

    // foto:
    // {
    //     type:Sequelize.STRING
    // },

    // descricao:
    // {
    //     type:Sequelize.TEXT
    // },
    tipo: {
        type: Sequelize.JSON,

      },
})

// bd_pontos.sync({force:true})


module.exports = bd_pontos