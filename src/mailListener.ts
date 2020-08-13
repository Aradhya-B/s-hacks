import Imap from 'imap';
import util from 'util';
import fs from 'fs';
import {Base64Decode} from 'base64-stream';
import {IMAP_USER, IMAP_PASSWORD, IMAP_HOST, IMAP_PORT} from './config/keys'

const imap = new Imap({
  user: IMAP_USER,
  password: IMAP_PASSWORD,
  host: IMAP_HOST,
  port: IMAP_PORT,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false
  }
});

const base64 = new Base64Decode();

function openInbox(cb: any) {
  imap.openBox('INBOX', true, cb);
}

function toUpper(thing: string) {return thing && thing.toUpperCase ? thing.toUpperCase() : thing;}

function findAttachmentParts(struct: any, attachments?: any) {
  attachments = attachments || [];
  for (let i = 0, len = struct.length, r; i < len; ++i) {
    if (Array.isArray(struct[i])) {
      findAttachmentParts(struct[i], attachments);
    } else {
      if (struct[i].disposition && ['INLINE', 'ATTACHMENT'].indexOf(toUpper(struct[i].disposition.type)) > -1) {
        attachments.push(struct[i]);
      }
    }
  }
  return attachments;
}

function buildAttMessageFunction(attachment: any) {
  const filename = attachment.params.name;
  const encoding = attachment.encoding;

  return function (msg: any, seqno: any) {
    const prefix = '(#' + seqno + ') ';
    msg.on('body', function (stream: any, info: any) {
      //Create a write stream so that we can stream the attachment to file;
      console.log(prefix + 'Streaming this attachment to file', filename, info);
      const writeStream = fs.createWriteStream('./' + filename);
      writeStream.on('finish', function () {
        console.log(prefix + 'Done writing to file %s', filename);
      }).on('open', () => {
        if (toUpper(encoding) === 'BASE64') {
          //the stream is base64 encoded, so here the stream is decode on the fly and piped to the write stream (file)
          stream.pipe(base64).pipe(writeStream);
        } else {
          stream.pipe(writeStream);
        }
      })
    });
    msg.once('end', function () {
      console.log(prefix + 'Finished attachment %s', filename);
    });
  };
}
function getLatestMessageContent(box: any) {
  const f = imap.seq.fetch(box.messages.total + ':*', {bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)', struct: true});
  f.on('message', function (msg, seqno) {
    console.log('Message #%d', seqno);
    const prefix = '(#' + seqno + ') ';
    msg.on('body', function (stream, info) {
      let buffer = '';
      stream.on('data', function (chunk) {
        buffer += chunk.toString('utf8');
      });
      stream.once('end', function () {
        console.log(prefix + 'Parsed header: %s', util.inspect(Imap.parseHeader(buffer)));
      });
    });
    msg.once('attributes', function (attrs) {
      console.log(prefix + 'Attributes: %s', util.inspect(attrs, false, 8));
      const attachments = findAttachmentParts(attrs.struct);
      console.log(prefix + 'Has attachments: %d', attachments.length);
      for (let i = 0, len = attachments.length; i < len; ++i) {
        const attachment = attachments[i];
        /*This is how each attachment looks like {
            partID: '2',
            type: 'application',
            subtype: 'octet-stream',
            params: { name: 'file-name.ext' },
            id: null,
            description: null,
            encoding: 'BASE64',
            size: 44952,
            md5: null,
            disposition: { type: 'ATTACHMENT', params: { filename: 'file-name.ext' } },
            language: null
          }
        */
        console.log(prefix + 'Fetching attachment %s', attachment.params.name);
        const f = imap.fetch(attrs.uid, {
          bodies: [attachment.partID],
          struct: true
        });
        //build function to process attachment message
        f.on('message', buildAttMessageFunction(attachment));
      }
    });
    msg.once('end', function () {
      console.log(prefix + 'Finished');
    });
  });
  f.once('error', function (err) {
    console.log('Fetch error: ' + err);
  });
  f.once('end', function () {
    console.log('Done fetching all messages!');
    imap.end();
  });
}

imap.once('ready', () => {
  console.log('Email server connected!')
  openInbox((err: any, box: any) => {
    if (err) throw err;
    imap.on('mail', (mail: number) => {
      getLatestMessageContent(box);
    });
  })
})
imap.once('error', (err: any) => console.log(err));

export default imap;
