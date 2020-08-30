import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const cookies = new Cookies(req, res);
    cookies.set('token', req.body.token);

    res.status(200).json({ message: 'cookie setted' });
  }
};
