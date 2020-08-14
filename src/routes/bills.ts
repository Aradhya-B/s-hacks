import express from 'express';
import request from 'request';
import {COMPUTER_VISION_SUBSCRIPTION_KEY, COMPUTER_VISION_ENDPOINT} from '../config/keys';
import * as vision from '@google-cloud/vision';
const uriBase = COMPUTER_VISION_ENDPOINT + 'vision/v3.0/ocr';
const router = express.Router();

function parseDetections(detections: any) {
  detections.forEach((detection: any) => {
    const description = detection.description;
    const vertices = detection.boundingPoly.vertices;
    console.log(description, vertices);
  });
}

router.get('/', () => {
  console.log("bills");

})

router.post('/upload', async (req, res) => {
  const filepath = req.body.filepath;
  console.log("starting");
  const client = new vision.ImageAnnotatorClient();

  const [result] = await client.textDetection('./files/' + filepath);
  console.log(JSON.stringify(result));
  const detections = result.textAnnotations;
  console.log('Text:');
  /* parseDetections(detections) */
  /* detections.forEach(text => text.description ? console.log(text.description) : console.log('nothing')); */
  detections.forEach(text => console.log(text));
  console.log('Ended');
})


router.get('/upload_old', (req, res) => {
  console.log("uploading..");
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
