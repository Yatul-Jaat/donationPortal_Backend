import { compareSync } from "bcryptjs";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import SignupMail from "../nodeMailer/SignupMail.js";
import LoginMail from "../nodeMailer/LoginMail.js";

const Signup = async (req, res) => {
    const { name, email, userName, password, confirmPassword, google_id, role } = req.body;
    
    // Uncomment and fix validation if needed
    if (!name || !email || !userName || !password || !confirmPassword || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    const hashPassword=bcrypt.hashSync(password, 10);// Hash the password before saving it

    // Create a new user
    const newUser = new User({role, name, email, userName, password:hashPassword, google_id });
    await newUser.save();


    // sending welcome email
    SignupMail(email, name);

    // Fixed: Use newUser instead of user (which was undefined)
    res.status(200).json({ userId: newUser._id, name: name, email: email });
};

const NormalLogin = async (req, res) => {
    const { role,userName, password } = req.body;
    
    if (!userName || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    // Check if user exists
    const user = await User.findOne({ userName: userName, role: role });
    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }

    if(compareSync(password, user.password) === false) {
        return res.status(400).json({ error: "Invalid credentials" });
    }


    // sending login confirmation email
    LoginMail(user.email, user.name);

    res.status(200).json({userId:user._id, name: user.name, email: user.email });
};

const GoogleLogin = async (req, res) => {
    const {role, name, email, google_id } = req.body;
    
    if (!name || !email || !google_id || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    // Fixed: Added missing space in "await User"
    let user = await User.findOne({ google_id: google_id, role: role });
    if (!user) {
        // Fixed: Added return statement
        return res.status(400).json({ error: "User does not exist" });
    }


    res.status(200).json({ userId: user._id, name: name, email: email });
};


export { Signup, NormalLogin, GoogleLogin };
