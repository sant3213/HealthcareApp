const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const OAuth2Data = require('./google_key.json')
const authUserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  canAccessPublications: {
    type: Boolean,
    required: false,
    trim: true
  },
  canAccessAccount: {
    type: Boolean,
    required: false,
    trim: true
  },
  canAccessComments: {
    type: Boolean,
    required: false,
    trim: true
  },
  canAccessMyPublications: {
    type: Boolean,
    required: false,
    trim: true
  },
  pin:{
    type: String,
    required: false,
    trim: true
  },
  specialization: {
    type: String,
    required: false,
    trim: true
  },
  qualification: {
    type: String,
    required: false,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  eps: {
    type: String,
    required: false,
    trim: true
  },
  university: {
    type: String,
    required: false,
    trim: true
  },
  experience: {
    type: String,
    required: false,
    trim: true
  },
  state: {
    type: String,
    required: false,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

authUserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject._id

  return userObject
}

authUserSchema.methods.generateAuthToken = async function () {
  const user = this
  
  const token = jwt.sign({ _id: user._id.toString() }, OAuth2Data.client_secret)
  user.tokens = user.tokens.concat({ token })

  await user.save()
  
  return token
}

authUserSchema.statics.findByEmail = async (email) => {
  const user = await AuthUser.findOne({ email} )

  if (!user) {
    throw new Error('Unable to find email')
  }

  return user
}


authUserSchema.statics.findByCredentials = async (email, password) => {
  const user = await AuthUser.findOne({ email })
  
  if (!user) {
    throw new Error('Unable to login')
  }
  
  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    throw new Error('Unable to login')
  }

  return user
}

authUserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const AuthUser = mongoose.model('AuthUser', authUserSchema);
module.exports = AuthUser;