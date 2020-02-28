const router       = require('express').Router()
const {ensures}    =require('../midleWare/ensureAuths')
const {
  authSignup,
  profile,
  authLogin,
  sendMsgSignup}   =require('../controllers/authSignup')

router.get("/signup", sendMsgSignup);
router.post('/signup', authSignup)
router.post("/login",authLogin)
router.get('/logout', (req,res)=>{
    req.logOut()
})
router.get('/profile', ensures ,profile)

module.exports =router