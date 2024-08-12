import express from 'express';
import cors from 'cors';
import rootRouter from './routes';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/',rootRouter);
app.listen(3000,()=>{
    console.log('App running on port 3000');
})