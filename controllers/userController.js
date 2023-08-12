import User from './../models/userSchema.js';

export const updateUserController = async (req, res, next) => {
  const { name, email, location, profile } = req.body;
  if (!name || !email || !location) {
    next('Please provide name, email, and location');
  }
  //   const { email: _email } = req.params.email;
  const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
    new: true,
  });
  if (!updatedUser) {
    res.status(404).json({ message: 'User not found' });
  } else {
    const token = updatedUser.createJWT();
    res
      .status(200)
      .json({
        message: 'User updated successfully!',
        user: updatedUser,
        token,
      });
  }
};
