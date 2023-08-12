import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, 'Passwords is Required'],
    },
    location: {
      type: String,
    },
    profile: {
      firstName: String,
      lastName: String,
      headline: String,
      summary: String,
      contactInfo: {
        phone: String,
        address: String,
        website: String,
      },
      experience: [
        {
          title: String,
          company: String,
          location: String,
          startDate: Date,
          endDate: Date,
          description: String,
        },
      ],
      education: [
        {
          degree: String,
          school: String,
          graduationDate: Date,
        },
      ],
      skills: [String],
      certifications: [String],
      languages: [String],
    },
    // applications: [
    //   {
    //     jobId: ObjectId,
    //     applicationDate: Date,
    //     status: String, // "Submitted", "Under Review", "Accepted", "Rejected"
    //     message: String, // Optional: Cover letter or additional message
    //   },
    // ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (userPasswd) {
  const isMatched = await bcrypt.compare(userPasswd, this.password);
  return isMatched;
};

userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.SECRET_KEY, {
    expiresIn: '3d',
  });
};

const User = mongoose.model('User', userSchema);
export default User;
