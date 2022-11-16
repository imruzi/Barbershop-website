const router = require('express').Router();
const NewUser = require('../models/User');

var key = 'real secret keys should be long and random';
var encryptor = require('simple-encryptor')(key);


router.get('/', async (req, res) => {


    res.send('Server running')
})


router.post('/register', async (req, res) =>{
    let {email, pass, confirmPass} = req.body

    console.log('register data: ',req.body)
    const userExists = await NewUser.find({ email: req.body.email })
    if (userExists[0]) return res.send({error:'Nome de utilizador já existente'})

    if( pass !== confirmPass) return res.send({error:'As senhas não coincidem'})

    let username = email.substring(0, email.indexOf('@'))

    const newUser = new NewUser({   
      email:email,
      password:pass,
      name:username
    })

    newUser.save()
    res.status(200).send('success')
})

router.post('/login', async (req, res) => {


    let {email, pass} = req.body
    console.log('login data: ',req.body)
    const userExists = await NewUser.find({email:email}) 
    if(!userExists[0]) return res.send({error:'Utilizador não existe'})
    
    if(pass !== userExists[0].password) return res.send({error:'Senha errada'})
    
    let username = email.substring(0, email.indexOf('@'))
    let userPhone = 'phone...'
    if(userExists[0].phone)
        userPhone = userExists[0].phone

    res.send({id:userExists[0]._id,
        status:'logged',name:username,
        admin:email.includes('admin'),
        phone:userPhone
        })
})


module.exports = router;
