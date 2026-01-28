// const db = require("../db/pool.js");
// const passport = require("../config/passport");
const bcrypt = require("bcryptjs");

// express validator
const { body, validationResult, matchedData } = require("express-validator");

const showIndex = async (req, res) => {
  res.render("index");
};

module.exports = { showIndex };
