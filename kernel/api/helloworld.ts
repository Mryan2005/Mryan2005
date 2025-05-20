import { VercelRequest, VercelResponse } from '@vercel/node';
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    const data = {
        msg: "Hello!"
    };
    res.status(200).json(data);
}