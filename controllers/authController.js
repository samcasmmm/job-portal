import User from './../models/userSchema.js';

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    next('Please provide name, email, and password');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    next('User already exists');
  }

  if (password?.length <= 6) {
    next('Password must be greater than 6 characters');
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
    data: newUser._doc,
  });
};
