const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User model
const User = require("../models/user");
//
exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("-__v -password")
    .sort({ createdAt: "desc" })
    .then((users) => {
      // console.log(users);
      res.status(200).json({ users: users, message: `Get users successfully` });
    })
    .catch((error) => {
      // console.log(error);
      res.status(200).json({ message: `Get users failed` });
    });
};
//
exports.signUp = (req, res, next) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    job,
    country,
  } = req.body;
  //simple validation
  if (!email || !password) {
    return res.status(400).json({
      message: `Please provide required fields`,
      status: 400,
      id: "EMPTY_FIELD",
    });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user)
        return res.status(409).json({
          message: "User already exists. Sign in ...",
          status: 409,
          id: "USER_EXISTS",
        });
      //return null if does not exist
      return user;
    })
    .then((user) => {
      const newUser = new User({
        email,
        password,
        firstName,
        lastName,
        phone,
        job,
        country,
      });
      //Create salt and hash
      bcrypt.genSalt(10, (error, salt) => {
        if (error) return;
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error)
            return res
              .status(500)
              .json({ message: "Can not hash password", status: 500 });
          //
          newUser.password = hash;
          //
          newUser
            .save()
            .then((user) => {
              //create token for registered user
              jwt.sign(
                { id: user._id, email: user.email },
                process.env.SECRET || config.get("jwtSecret"),
                { expiresIn: 3600 },
                (error, token) => {
                  if (error)
                    return res
                      .status(400)
                      .json({ message: "Creating token failed", status: 400 });
                  res.status(201).json({
                    token: token,
                    user: {
                      id: user._id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      phone: user.phone,
                      job: user.job,
                      country: user.country,
                    },
                  });
                }
              );
            })
            .catch((error) => {
              // console.log(error);
              res
                .status(400)
                .json({ message: "User registration failed", status: 400 });
            });
        });
      });
    })
    .catch((error) => {
      // console.log(error);
      res.status(500).json({ message: "Something went wrong..." });
    });
};
//
exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: `Please provide required fields`,
      status: 400,
      id: "EMPTY_FIELD",
    });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user)
        return res.status(409).json({
          message: "User does not exist...",
          status: 409,
          id: "USER_DOES_NOT_EXIST",
        });
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch)
            return res.status(403).json({
              message: "Invalid credentials",
              status: 403,
              id: "INVALID_CREDENTIALS",
            });
          jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET || config.get("jwtSecret"),
            { expiresIn: 3600 },
            (error, token) => {
              if (error)
                return res.status(400).json({
                  message: "Creating token failed",
                  status: 400,
                  id: "CREATING_TOKEN_FAILED",
                });
              res.status(201).json({
                token: token,
                user: {
                  id: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  phone: user.phone,
                  job: user.job,
                },
              });
            }
          );
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
//
exports.getAuthUser = (req, res, next) => {
  User.findById(req.user.id) //from token payload
    .select("-password -__v")
    .then((user) => res.status(200).json(user));
};
