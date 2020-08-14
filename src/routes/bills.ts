import express from 'express';
import axios from 'axios';
import request from 'request';
import {COMPUTER_VISION_SUBSCRIPTION_KEY, COMPUTER_VISION_ENDPOINT} from '../config/keys';
const uriBase = COMPUTER_VISION_ENDPOINT + 'vision/v3.0/ocr';

const router = express.Router();

router.get('/', () => {
  console.log("bills");
})

router.post('/upload', (req, res) => {
  const bin = req.body.bin;
  const params = {
    'language': 'unk',
    'detectOrientation': 'false'
  }
  const options = {
    uri: uriBase,
    qs: params,
    body: '{"data": ' + '"' + bin + '"}',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subsrciption-Key': COMPUTER_VISION_SUBSCRIPTION_KEY
    },
  };
  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    const jsonResponse = JSON.stringify(JSON.parse(body), null, ' ');
    console.log(jsonResponse);
  })
})

export default router;
