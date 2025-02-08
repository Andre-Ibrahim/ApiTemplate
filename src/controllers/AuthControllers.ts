import { RegisterRequest } from "./models/RegisterRequest";
import { AuthorizeRequest } from "./models/AuthorizeRequest";
import { createUser, authUser } from "../services/userService";
import { Request, Response } from 'express';


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
}

export { RegisterAuthControllers }