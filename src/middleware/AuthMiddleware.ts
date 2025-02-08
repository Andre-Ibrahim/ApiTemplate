import  jwt, { JwtPayload } from 'jsonwebtoken';
import { Role } from '../controllers/models/RegisterRequest';

function verifyUserToken(req, res, next) {
    
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'your-secret-key') as CustomJwtPayload;

        if(decoded.role !== Role.User && decoded.role !== Role.Admin){
            res.status(401).json({ error: 'Invalid token' });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
 };

 async function verifyAdminToken(req, res, next) {
    
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = await jwt.verify(token, 'your-secret-key') as CustomJwtPayload;

        if(decoded.role !== Role.Admin){
            res.status(401).json({ error: 'Invalid token' });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
 };

 interface CustomJwtPayload extends jwt.JwtPayload {
     email: string;
     role: string;
 }