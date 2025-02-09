import  jwt from 'jsonwebtoken';
import { Role } from '../controllers/models/RegisterRequest';

function verifyUserToken(req, res, next) {
    
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {

        const trimmedToken = token.replace("Bearer ", "");

        const decoded = jwt.verify(trimmedToken, process.env.JWT_SECRET) as CustomJwtPayload;

        if(decoded.role !== Role.User && decoded.role !== Role.Admin){
            return res.status(403).json();
        }

        next();
    } catch (error) {
        return res.status(401).json();
    }
 };

 async function verifyAdminToken(req, res, next) {
    
    const token = req.header('Authorization');

    if (!token) return res.status(401).json();
    try {

        const trimmedToken = token.replace("Bearer ", "");

        const decoded = await jwt.verify(trimmedToken, process.env.JWT_SECRET) as CustomJwtPayload;

        if(decoded.role !== Role.Admin){
            return res.status(403).json();
        }

        next();
    } catch (error) {
        return res.status(401).json();
    }
 };

 interface CustomJwtPayload extends jwt.JwtPayload {
     email: string;
     role: string;
 }

 export { verifyAdminToken, verifyUserToken };