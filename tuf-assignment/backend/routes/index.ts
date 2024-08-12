import express from 'express';
const rootRouter  = express.Router();
import userrouter from './user';
import adminrouter from './admin';
rootRouter.use('/user',userrouter);
rootRouter.use('/admin',adminrouter);
export default rootRouter;