import User from '../Model/userModel.js'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config();


const createToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET_KEY)
}

//login users route 

const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({
            success: false,
            message: "users doesn't exists "
         })
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
         const token = createToken(User._id)
         return res.status(200).json({
            success: true,
            message : "user login sucess",
            token
         })
      }
      else {
         return res.status(400).json({
            success: false,
            message: "invalid creditional "
         })
      }


   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' });

   }

}


//Register users 

const registerUser = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      //validation for input data 
      if (!name || !email || !password) {
         return res.status(400).json({
            success: fasle,
            message: "All filed are require"
         })
      }

      //check user existing or not 

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(409).json({
            success: false,
            message: "user Already exists "
         })
      }

      //validation email format and strong password 
      if (validator.isEmail(email)) {
         return res.status(409).json({
            success: false,
            message: " please enater valid Email  "
         })
      }

      if (password.length < 8) {
         return res.status(409).json({
            success: false,
            message: "please enter a strong password"
         })
      }

      //hash the password 
      const hashPassword = await bcrypt.hash(password, 10);

      //create new user 
      const newUser = new User({
         name, email, password: hashPassword
      })

      await newUser.save();

      const token = createToken(User._id)

      res.status(200).json({
         success: true,
         message: "User created successfully ",
         token
      })

   } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
   }
}


// //route for Admin login 
const adminLogin = async (req, res) => {
   try { 
      const { email, password } = req.body;
      
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // Sign token with an object payload and include an admin flag
        const token = jwt.sign(
          { email: email, isAdmin: true },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );
        return res.status(200).json({
          success: true,
          message: "admin login successful",
          token: token
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "invalid credentials",
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };


export { registerUser, loginUser, adminLogin };