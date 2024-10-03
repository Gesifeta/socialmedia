import { verifyToken } from "../auth/token.js";

export const isAuthenticated = (req, res, next) => {
    const token = req.session["token"];
    if (!token) return res.redirect("/user/login");
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        if (!decoded) return res.status(401).json({ message: "You are not authorized" });
        req.user = decoded;
        next();
    } catch (error) {

        return res.status(500).json({ message: "Unable to handle your request." });
    }

}