const User = require('../model/models');
const handleerror = require('../utils/handleerror');

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    const errors = handleerror(error)
    res.status(400).json(errors)
  }
};

const login = async (req, res) => {
const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide email and password' });
    }

    
try{
  const userExist = await User.findOne({ email });
    if (!userExist) {
      // return res
      //   .status(400)
      //   .json({ success: false, msg: 'Email has not been registered' });
throw Error("incorrect email");


    }

    // Assuming User model has an instance method for comparing passwords
    const authenticated = await userExist.comparePassword(password);
    if (!authenticated) {
      // return res
      //   .status(400)
      //   .json({ success: false, msg: 'Email or password is incorrect' });
      throw Error("Incorrect password");
      
    }
// generate token
const token = userExist.generatetoken();
  
    res.status(200).json({
      success: true,
      user: { name: userExist.name, email: userExist.email },
      token
      
    });
  } catch (error) {
    const errors = handleerror(error)
    res.status(400).json(errors)
  }
};

module.exports = { register, login };
