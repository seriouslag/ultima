import https from 'https';
import dotenv from 'dotenv';

import 'colors';

dotenv.config();

let error = false;
let errorMessage = '';

const domains = [
  {
    url: 'ultima.band',
    id: 'e1890014faef5bf228cf5fcb4a7088c8',
  },
];

const apiKey = process.env.CLOUDFLARE_API_KEY;
const apiEmail = process.env.CLOUDFLARE_API_EMAIL;

console.log('Clearing Cloudflare cache...'.yellow);

if (!domains.length) {
  const message = 'No domains were supplied; ';
  console.log(message.red);
  error = true;
  errorMessage += message;
}

if (!apiKey || apiKey === 'undefined') {
  const message = 'No api key was supplied; ';
  console.log(message.red);
  error = true;
  errorMessage += message;
}

if (!apiEmail || apiEmail === 'undefined') {
  const message = 'No api email was supplied; ';
  console.log(message.red);
  error = true;
  errorMessage += message;
}

if (error) {
  throw new Error(errorMessage);
}

domains.forEach((domain) => {
  const { url, id} = domain;

  const data = JSON.stringify({
    purge_everything: true,
  });

  const options = {
    hostname: 'api.cloudflare.com',
    port: 443,
    path: `/client/v4/zones/${id}/purge_cache`,
    method: 'POST',
    headers: {
      'X-Auth-Email': `${apiEmail}`,
      'X-Auth-Key': `${apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      const statusCode = res.statusCode;
      console.log(`statusCode: ${statusCode}`);
      if (statusCode && statusCode >= 200 && statusCode < 300) {
        console.log(`Purged cloudflare cache for ${url}!`.green);
      } else {
        const response = JSON.parse(String.fromCharCode.apply(null, d));
        console.log(`Failed to purge cloudflare cache for ${url}!`.red, response.errors);
      }
    });
  });

  req.on('error', (e) => {
    console.log('Failed to purge cloudflare cache!'.red, e);
  });

  req.write(data);
  req.end();
});
