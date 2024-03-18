const express = require("express");
const { handleSigninUser, handleSignupUser, handleResetPassword, handleGetUsers } = require("../controller/user")
const router = express.Router();


router.get("/", handleGetUsers);

router.post("/signin", handleSigninUser);
router.post("/signup", handleSignupUser);
router.post("/reset-password", handleResetPassword);


module.exports = router;