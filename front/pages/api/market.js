import { getToken } from 'next-auth/jwt';

const secret = 'HS256';
let accessToken;

export default async (req, res) => {
    const token = await getToken({ req, secret });
    accessToken = token.accessToken;
    const data = await getYTData();
    res.status(200).json(data);
};