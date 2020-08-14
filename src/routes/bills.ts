import express from 'express';
import axios from 'axios';
import request from 'request';
import {COMPUTER_VISION_SUBSCRIPTION_KEY, COMPUTER_VISION_ENDPOINT} from '../config/keys';
import * as vision from '@google-cloud/vision';
const uriBase = COMPUTER_VISION_ENDPOINT + 'vision/v3.0/ocr';
const router = express.Router();

router.get('/', () => {
  console.log("bills");

})


router.post('/upload', async (req, res) => {
  const base64String = req.body.base64String;
  console.log("starting");
  const client = new vision.ImageAnnotatorClient();
  /* console.log('-------------------d'); */
  /* console.log(base64String); */

  const [result] = await client.textDetection(base64String);
  const detections = result.textAnnotations;
  console.log('Text:');
  detections.forEach(text => console.log(text));
})


router.get('/upload_old', (req, res) => {
  console.log("uploading..");
  //   const bin = req.body.bin;
  const params = {
    'language': 'unk',
    'detectOrientation': 'false'
  }
  const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": "https://i.ibb.co/F0Y284J/IMG-20200813-213630.jpg"}',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': COMPUTER_VISION_SUBSCRIPTION_KEY
    },
  };

  console.log("data:-----");
  //   console.log(bin);

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
