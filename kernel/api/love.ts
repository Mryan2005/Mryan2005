import { VercelRequest, VercelResponse } from '@vercel/node';
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    const LoveToken = req.headers['Love-Token'];
    let message = "Hello!";
    let status = 'error';

    if (LoveToken !== 'yours_shadowcat') {
        status = 'error';
        message = `Invalid Token`;
    } else {
        status = 'success';
        message = "Oh, Dear. I Love you too!"
    }

    const data = {
        status: status,
        message: message,
    };
    res.setHeader('Access-Control-Allow-Headers', 'Love-Token'); // 示例
    res.status(200).json(data);
}