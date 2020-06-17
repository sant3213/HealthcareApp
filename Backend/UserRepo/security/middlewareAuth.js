const jwt = require('jsonwebtoken')
const authUser= require('./authUser.model')
const OAuth2Data = require('./google_key.json')

const auth = async (req, res, next) =>{
    try {
        
        const token = req.header('Authorization').replace('Bearer ','')
        
        const decode = jwt.verify(token, OAuth2Data.client_secret)
        

        const user = await authUser.findOne({ _id: decode._id, 'tokens.token': token })
        
        if(!user){
            throw new Error()
        }
        
        req.token = token
        
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error:'You´re not authenticated.'})
    }
}

module.exports = auth