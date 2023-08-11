import User from './../models/userSchema.js';

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please provide name, email, and password',
        success: false,
        status: res.statusCode,
      });
    }

    if (password.length <= 6) {
      return res.status(400).json({
        message: 'Password must be greater than 6 characters',
        success: false,
        status: res.statusCode,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: 'User already exists',
        success: false,
        status: res.statusCode,
      });
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    const { password: _password, ...userWithoutPassword } = newUser._doc;
    res.status(201).send({
      message: 'User Created Successfully',
      success: true,
      status: res.statusCode,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: 'Error in Register Controller',
      success: false,
      status: res.statusCode,
      error,
    });
  }
};
