import { getUsers } from "../services/userService";
import { Request, Response } from 'express';
import { verifyAdminToken } from "../middleware/AuthMiddleware";

function RegisterUserControllers(app: any){
        /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     description: Retrieve a list of all users (admin only)
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: A list of users.
     *         content:
     *           application/json:
     *             schema:
     *             type: array
     *             properties:
     *               id:
     *                 type: string
     *               username:
     *                 type: string
     *               email:
     *                 type: string
     *               role:
     *                 type: string
     *       401:
     *         description: Unauthorized, invalid or missing token.
     *       403:
     *         description: Forbidden, admin access required.
     *       500:
     *         description: Internal server error.
     */
        app.get('/users', verifyAdminToken, async (req: Request, res: Response) => {
            try {
    
                const users = await getUsers();
    
                res.status(201).json(users);
    
            } catch (error) {
                console.log(error);
            }
        })
}

export default RegisterUserControllers;