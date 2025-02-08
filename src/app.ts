import express from 'express';
import { RegisterAuthControllers } from "./controllers/AuthControllers"
import connectDB from './config/Database';
import { setupSwagger } from './config/Swagger';

const app = express();

connectDB();

app.use(express.json());
RegisterAuthControllers(app);

app.listen(8000, function(){
    console.log('server running on port 8000');
});

setupSwagger(app);

export default app;