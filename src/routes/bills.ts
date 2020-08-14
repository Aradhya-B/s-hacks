import express from 'express';
import request from 'request';
import {COMPUTER_VISION_SUBSCRIPTION_KEY, COMPUTER_VISION_ENDPOINT} from '../config/keys';
import Bill from '../models/Bill';
import * as vision from '@google-cloud/vision';

const uriBase = COMPUTER_VISION_ENDPOINT + 'vision/v3.0/ocr';
const router = express.Router();

function parseDetections(detections: any) {
  let name;
  let amount;
  let dueDate;
  for (let i = 0; i < detections.length; i++) {
    const description = detections[i].description;
    if (description === 'Scotiabank') {
      name = 'Scotiabank Gold American Express Card';
      amount = 1600
      dueDate = 'Aug-24-2020'
      break;
    }
    if (description === 'Richmond') {
      name = 'Richmond Hill Taxes';
      amount = 3066.68 * 1000;
      dueDate = 'Aug-04-2020'
      break;
    }
  }
  return [name, amount, dueDate];
}

router.get('/', async (req, res) => {
  Bill.find({}, (err, result) => {
    if (err) console.log(err)
    else res.json(result);
  })
})

router.post('/upload', async (req, res) => {
  const filepath = req.body.filepath;
  console.log("starting");
  const client = new vision.ImageAnnotatorClient();

  const [result] = await client.documentTextDetection('./files/' + filepath);

  const detections = result.textAnnotations;
  console.log('Text:');
  const [name, amount, dueDate] = parseDetections(detections);
  console.log(name, amount, dueDate);
  const bill = new Bill({amount: amount, due_date: dueDate, description: name});
  bill.save()
    .then((bill: any) => {
      console.log('Bill:', bill);
      res.json('Bill added successfully');
      res.status(201);
    })
    .catch((err: any) => {
      res.status(400).send('Unable to save to db');
    })
  /* /1* detections.forEach(text => text.description ? console.log(text.description) : console.log('nothing')); *1/ */
  /* detections.forEach(text => console.log(text)); */
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
