import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('>> /raindrop/token');

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    optionsSuccessStatus: 200,
    origin: '*', // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  res.status(200).json({
    name: 'John Doe @ token',
  });
}

export default handler;
