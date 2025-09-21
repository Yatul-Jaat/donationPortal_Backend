import express from "express"
import {Signup,NormalLogin,GoogleLogin,Logout} from "../controller/auth.controller.js";

const router =express.Router();

router.post("/signup",Signup)
router.post("/login",NormalLogin)
router.post("/login/google",GoogleLogin)
router.post("/logout",Logout)

export {router}