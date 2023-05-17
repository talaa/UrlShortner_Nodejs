const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  no_links: {
    type: Number
  },
  no_clicks:{
    type: Number
  },
  user_type:{
    type:String
  },
  user_URL:[
    {
      URL_ID:{
        type:String
      }
    }
  ]
});

UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);