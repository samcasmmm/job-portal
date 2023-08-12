import User from './../models/userSchema.js';
import cookie from 'cookie';
import http from 'http';

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
  const token = newUser.createJWT();
  const { password: _password, ...user } = newUser._doc;

  res.status(201).send({
    message: 'User Created Successfully',
    success: true,
    status: res.statusCode,
    user,
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next('Please provide valid field');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    next('Invalid username or password');
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next('Invalid username or password');
  }
  const token = user.createJWT();
  const { password: _password, ...userWithoutPassword } = user._doc;

  // res.setHeader(
  //   'Set-Cookie',
  //   cookie.serialize('Bearer Token', token, {
  //     httpOnly: true,
  //     maxAge: 3 * 24 * 60 * 60 * 1000,
  //     secure: true,
  //   })
  // );
  user.password = undefined;
  res.status(200).json({
    message: 'User Login Successfully',
    success: true,
    status: res.statusCode,
    user,
    token,
  });
};
