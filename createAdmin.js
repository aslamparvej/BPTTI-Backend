require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);
const password = process.env.ADMIN_PASSWORD;

(async () => {
  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    username: "admin",
    password: hashedPassword
  });

  console.log("Admin created");
  process.exit();
})();