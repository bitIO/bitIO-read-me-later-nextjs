import { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'query-string';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // await authorize();
  const url = `https://api.raindrop.io/v1/oauth/authorize?${stringify({
    client_id: process.env.RAINDROP_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/api/raindrop/callback',
  })}`;
  res.json({
    location: url,
  });
}

export default handler;
