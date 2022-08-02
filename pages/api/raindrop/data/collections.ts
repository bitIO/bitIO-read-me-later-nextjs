import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('>> /raindrop/data/collections');
  await fetch('');
  res.status(200).json({
    name: 'John Doe @ token',
  });
}

export default handler;
