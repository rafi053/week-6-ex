import express from 'express';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/users', userRoutes);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
