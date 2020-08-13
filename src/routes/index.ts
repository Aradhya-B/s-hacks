import express from 'express';
import billsRoute from './bills';


const router = express.Router();

router.use('/api/bills', billsRoute)

export default router;