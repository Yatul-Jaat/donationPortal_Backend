import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, "10000");

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
		next();
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;