import { RegisterRequest } from "./models/RegisterRequest";
import { AuthorizeRequest } from "./models/AuthorizeRequest";
import { createUser, authUser, getUsers } from "../services/userService";
import { Request, Response } from 'express';
import { verifyAdminToken } from "../middleware/AuthMiddleware";


function RegisterAuthControllers(app: any){

    /**
     * @swagger
     * /signin:
     *   post:
     *     summary: Sign in a user
     *     description: This endpoint allows a user to sign in and receive a token.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             required:
     *               - email
     *               - password
     *     responses:
     *       200:
     *         description: Token generated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *       404:
     *         description: User authentication failed
     */
    app.post('/signin', async function (req: Request, res: Response){
        

        const body : AuthorizeRequest = req.body;
        const token = await authUser(body);

        if(token == null){
            res.status(404).json();
            return;
        }

        res.status(200).json({token});
    });

    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Register a new user
     *     description: This endpoint allows a new user to register.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             required:
     *               - username
     *               - password
     *     responses:
     *       201:
     *         description: User created successfully
     */
    app.post('/register', async (req: Request, res: Response) => {

        try {
            const body: RegisterRequest = req.body;

            await createUser(body);

            res.status(201).json();

        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

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
            res.status(500).json({ error: error });
        }
    })
}

export { RegisterAuthControllers }