import express from 'express';

const router = express.Router();

router.get('/', () => {
    console.log("bills");
})

export default router;