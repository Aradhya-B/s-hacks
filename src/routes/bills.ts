import express from 'express';
import {COMPUTER_VISION_SUBSCRIPTION_KEY, COMPUTER_VISION_ENDPOINT} from '../config/keys';

const router = express.Router();

router.get('/', () => {
  console.log("bills");
})

router.post('/upload', (req, res) => {

})

export default router;
