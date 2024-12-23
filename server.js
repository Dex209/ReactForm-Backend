 const express= require('express')
 const server = express()
 const bd_users = require('./database/bd_users')
 const cors = require('cors')
 const bodyParser = require('body-parser')
 const dataUsers = require('./database/Data.json')
 const port = process.env.PORT ||3001;

 server.use(express.json())
 server.use(cors())
 server.use(bodyParser.urlencoded({extended:false}))


 async function setDatabase(){
    try{
        await bd_users.bulkCreate(dataUsers)
        console.log("USUARIOS CRIADOS COM SUCES")
    }catch(err){
        console.log("Erro ao inserir dados existentes no banco de dados: " +err)
    }
 }


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
             res.send((jsonData))
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
    //  res.status(201).json({message : "Ok"})
     const user = {
        name : req.body.name,
        password : password,
        state : req.body.state
    }


    try{
        bd_users.findOne({where : {name : user.name}})
        .then(User=>{
            if(User){
                console.log("NOME DE USUARIO JA CADASTRADO")
                res.status(403).send({message : "Já existe um usuario com este nome", error : 'true'})
            }else{
                console.log("NOME DISPONIVEL")

                try{
                    bd_users.create({
                        name : user.name ,
                        password : user.password,
                        state: user.state
                    })
                    .then(()=>{
                        console.log("Usuario cadastrado com sucesso")
                        res.status(201).json({message : "Usuario cadastrao com sucesso", error: 'false'})
                    })
                    .catch(err =>{
                        console.log(`Erro ao cadastrar usuario: ${err}`)
                        res.status(403).json({message : "Erro ao cadastrar usuario", error : 'true'})
                    })
                }catch(err){
                    console.log("Erro ao cadastrar usuario : " +err)
                }
            }
        })
    }catch(err){
        console.log("Erro ao realizar busca: " + err)
    }


 })

 server.delete("/deleteUser/:id", async(req,res)=>{
     console.log("Deletando usuario")
     let id = req.params.id
     console.log(`Usuario com id: ${id}`)


     bd_users.destroy({
         where: {id : id},
         limit: 1
     })
     .then(()=>{
         console.log("Usuario deletado")
         res.send({message: "Usuario deletado", delete : true})
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

    //  console.log(user)
    
     try {
        
        bd_users.findOne({where : {name : user.name, password : user.password}})
        .then(User =>{
            if(User)
            {
                console.log("usuario encontrado no banco de dados")
                res.send({ user : User.name, hasPermission : User.hasPermission, id : User.id})
            }else{
                console.log("usuario nao encontrado no banco de dados")
                res.send({message: "Usuario nao encontrado no banco de dados"})
            }
        })
        .catch(err=>{
            console.log(`Erro ao consultar banco de dados  ${err}`)
            res.send({message: "sem comunicação com banco de dados", status : false})
        })
    }
    catch{
        console.log("erro")
    }


    
 })


 server.get('/ping', (req,res)=>{
    //  console.log("Servidor pingado")
     const jsonData = {status : true}
     res.send(jsonData)
 })

 server.put('/atualizarDados/:id', async (req,res)=>{
    let id = req.params.id
    const newData = {
        name : req.body.name,
        password : req.body.password, // pq esta duplicando o campo de passsword? ??????? caga caga
        state : req.body.state
    }

    console.log("Atualizando dados do id " +id)
    console.log(JSON.stringify(newData, null, 2))

    try{
        bd_users.findOne({where : {id : id}})
        .then((user)=>{
            if(user){
                console.log("usuario encontrado")
                
                
                bd_users.update(
                    {
                        name : newData.name,
                        password: newData.password,
                        state : newData.state
                    },
                    {where : {id : id}}
                )
                


                console.log("Dados atualizados com sucesso")
                res.send({message:"Dados atualizados com sucesso", id : user.id})
            }else{
                console.log("Usuario nao encontrado")
            }
        })
        .catch((err)=>{
            console.log("Erro ao fazer busca no banco de dados: "+err)
        })
    }catch(err){
        console.log("Erro ao fazer atualização de dados")
    }   

    

 })



 // Listen on `port` and 0.0.0.0
 server.listen(port, "0.0.0.0",  ()=> {
   console.log(`SERVER OPEN ON PORT ${port}`)
   setTimeout(()=>{setDatabase()},5000)
 });