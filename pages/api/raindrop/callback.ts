import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { stringify } from 'query-string';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    optionsSuccessStatus: 200,
    origin: '*', // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const { code } = req.query;
  const response = await fetch(
    'https://api.raindrop.io/v1/oauth/access_token',
    {
      body: JSON.stringify({
        client_id: process.env.RAINDROP_CLIENT_ID,
        client_secret: process.env.RAINDROP_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/api/raindrop/callback',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );
  const json = await response.json();
  res.redirect(`/raindrop/callback?${stringify(json)}`);
}

export default handler;
