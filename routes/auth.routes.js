const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

//auth/api/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimal lenght of password is 6 symbols ').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data',
        })
      }
      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        res.status(400).json({ message: 'Error. Such user has already existed' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: 'Success. Autorization has passed successful' })
    } catch (error) {
      res.status(500).json({ message: 'Something goes wrong. Try again...' })
    }
  },
)

//auth/api/login
router.post('/login', [
    check('email', "Enter correct email").normalizeEmail().isEmail(),
    check('password', "Enter password").exists()
], async (req, res) => {
  try {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array(),
            message: "Invalid login data"
        })
    }

    const {email, password} = req.body
 
    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({message: "User not find, such email isn't register "})
    }

    const isMatchPassword = await bcrypt.compare(password, user.password)
    
    if(!isMatchPassword){
        return res.status(400).json({message: 'Invalid password. Try again'})
    }

    const token = jwt.sign({userId: user.id},config.get('jwtSecret'),{expiresIn:'1h'})

    res.status(200).json({
        token, userId: user.id
    })

  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong. Try again...' })
  }
})

module.exports = router
