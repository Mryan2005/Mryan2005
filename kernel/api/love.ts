import { VercelRequest, VercelResponse } from '@vercel/node';

module.exports = async (req: VercelRequest, res: VercelResponse) => {
    // --- CORS Headers ---
    res.setHeader('Access-Control-Allow-Origin', '*'); // 警告：'*' 允许任何源，生产环境请指定具体域名

    // 2. 允许客户端发送的头部 (包括你的自定义头部和常见的 Content-Type)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Love-Token');

    // 3. 允许的 HTTP 方法
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 根据你的 API 支持的方法调整

    // --- Handle OPTIONS request (Preflight) ---
    if (req.method === 'OPTIONS') {
        return res.status(204).end(); // 204 No Content 是常见的响应
    }

    // --- Actual Request Logic ---
    // 读取头部时，最好转换为小写，因为 HTTP 头部名称是大小写不敏感的
    const loveTokenHeader = req.headers['love-token'] || req.headers['Love-Token']; // 兼容大小写

    let message = "I have no LoveToken";
    let status = 'error';

    if (!loveTokenHeader) { // 检查头部是否存在
        status = 'error';
        message = `Love-Token header is missing.`;
    } else if (loveTokenHeader !== 'yours_shadowcat') {
        status = 'error';
        message = `Invalid Token. Received: '${loveTokenHeader}'`;
    } else {
        status = 'success';
        message = "Oh, Dear. I Love you too! ❤️💐";
    }

    const data = {
        status: status,
        message: message,
    };

    res.status(200).json(data);
};