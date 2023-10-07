import express from 'express';
import path from 'path';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
dotenv.config();
import cookieParser from 'cookie-parser';
const port=process.env.PORT ||5000;
import { notFound,errorHandler } from './middleware/errormiddleware.js';
import userRoutes from './routes/userRoutes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/api/users', userRoutes);

connectDB();


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on ${port}`));