 const express= require('express')
 const server = express()
 const bd_users = require('./database/bd_users')
 const cors = require('cors')
 const bodyParser = require('body-parser')
//  const bcrypt = require('bcrypt')

 server.use(express.json())
 server.use(cors())
 server.use(bodyParser.urlencoded({extended:false}))

//  async function cryptPassword(password){
//      const saltRounds = 10
//      const hash = bcrypt.hash(password, saltRounds)
//      return hash
//  }

//  async function comparePassword(password, hashedPassword){
//      try{
//          const result = await bcrypt.compare(password, hashedPassword)

//          if(result){
//               console.log("Senhas coincidem")
//              return 'true'
            
//          }else{
//               console.log("Senhas nao coincidem")
//              return 'false'
            
//          }

//      }
//      catch(err){
//          console.log("Erro ao tentar comparar senhas " + err)
//      }
//  }

 server.get('/', (req,res)=>{
     res.send('Olá bem vindo ao servidor backend')
 })

 server.get('/getUsers', async (req,res)=>{
     bd_users.findAll({})
     .then(user =>{
         console.log("Usuarios encontrados")
         console.log(user)

         const jsonData = user.map(user => user.get({plain:true}));
         console.log(JSON.stringify(jsonData, null, 2));
         res.send(jsonData);
     })
     .catch(err =>{
         console.log("Erro ao procurar usuarios")
         console.log(err)
     })
 })

 server.get('/getUser/:id', async (req,res) =>{
     console.log("buscando usuario unico")
     const id = req.params.id 
     console.log(`Id do usuario: ${id}`)

     bd_users.findOne({where : {id : id}})
     .then(user => {
         if(user){
             console.log("Usuario encontrado")
             const jsonData = JSON.stringify(user, null, 2)
             console.log(jsonData)
             res.send(jsonData)
         }else{
             console.log("Usuario nao encontrado")
         }
     })
     .catch(err =>{
         console.log("Erro ao acessar banco de dados" + err)
     })
 })

 server.post('/cadUsers', async(req,res)=>{
     console.log("Cadastrando usuarios")
     var password =  req.body.password
     res.status(201).json({message : "Ok"})
    //  cryptPassword(password)
    //  .then(hash =>{
    //      password = hash
    //      console.log(password)
    //      const user = {
    //          name : req.body.name,
    //          password : password,
    //          state : req.body.state
    //      }
    //      console.log(user)
    //      bd_users.create({
    //          name : user.name ,
    //          password : user.password,
    //          state: user.state
    //      })
    //      .then(()=>{
    //          console.log("Usuario cadastrado com sucesso")
    //          res.status(201).json({message : "Usuario cadastrao com sucesso"})
    //      })
    //      .catch(err =>{
    //          console.log(`Erro ao cadastrar usuario: ${err}`)
    //          res.status(400).json({message : "Erro ao cadastrar usuario"})
    //      })
    //  })
    //  .catch(err =>{
    //      console.log(`Err: ${err}`)
    //      res.sendStatus(501)
    //  })

    
 })

 server.delete("/deleteUser/:id", async(req,res)=>{
     console.log("Deletando usuario")
     let id = req.params.id
     console.log(`Usuario com id: ${id}`)


     bd_users.destroy({
         where: {id : id},
         limit
     })
     .then(()=>{
         console.log("Usuario deletado")
     })
     .catch(err =>{
         console.log(`Erro ao deletar usuario: ${err}`)
     })
 })

 server.post('/verifyUser', async(req,res)=>{
     console.log("Verificando usuario")
     const user = {
         name : req.body.name,
         password : req.body.password
     }

     var hasPermission = false
     var passWordHash
     console.log(user)
    
    //  cryptPassword(user.password)
    //  .then((passwordHash)=>{
    //      passWordHash = passwordHash
    //      try {
        
    //          bd_users.findOne({where : {name : user.name}})
    //          .then(User =>{
    //              if(User){
    //                  console.log("Usuario encontrado, verificando credenciais...")
    //                  console.log(User)
    //                  comparePassword(user.password, User.password )
    //                  .then(result =>{
    //                      if(result === 'true'){
    //                          console.log("Usuario logado com sucesso")
                              
    //                          res.send({ user : User.name, hasPermission : User.hasPermission, id : User.id})
    //                      }else{
    //                          console.log("Credenciais invalidas")
    //                          res.sendStatus(400)
    //                          res.send({message: "Senha ou Usuario  inválidos"})
    //                      }
    //                  })
    //                  .catch(err =>{
    //                      console.log("Erro ao verificar as credenciais")
    //                  })
                    
                    
    //                    res.status(200).send({ message: 'Login successful' , user: `${User.name}`})
    //              }
    //              else{
    //                  console.log("Usuario nao encontrado")
    //                  res.send({message: "Usuario não encontrado no banco de dados"})
    //              }
    //          })
    //          .catch(err=>{
    //              console.log(`Erro ao consultar banco de dados  ${err}`)
    //          })
    //      }
    //      catch{
    //          console.log("erro")
    //      }

    //  })
    //  .catch(err=>{
    //      console.log("Erro ao criptografar senha : "+err)
    //  })



    
 })


 server.get('/ping', (req,res)=>{
     console.log("Servidor pingado")
     const jsonData = {status : true}
     res.send(jsonData)
 })

 const port = process.env.PORT ||3000;

 // Listen on `port` and 0.0.0.0
 server.listen(port, "0.0.0.0", function () {
   console.log(`SERVER OPEN ON PORT ${port}`)
 });