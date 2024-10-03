import jwt from "jsonwebtoken";

export  const verifyToken = (token) => {
 return   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            console.log(err);
            return false;
        } else {
            return decoded;
        }
    });
};
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });
};
