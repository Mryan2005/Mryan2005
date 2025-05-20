import { VercelRequest, VercelResponse } from '@vercel/node';

module.exports = async (req: VercelRequest, res: VercelResponse) => {
    // --- CORS Headers ---
    // 1. 允许的源 (根据你的需求设置为特定域名或 '*')
    res.setHeader('Access-Control-Allow-Origin', '*'); // 警告：'*' 允许任何源，生产环境请指定具体域名

    // 2. 允许客户端发送的头部 (包括你的自定义头部和常见的 Content-Type)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Love-Token');

    // 3. 允许的 HTTP 方法
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 根据你的 API 支持的方法调整

    // 4. (可选) 预检请求结果的缓存时间 (秒)
    // res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

    // 5. (可选) 如果客户端需要读取服务器响应中的自定义头部，则需要设置这个
    // 例如，如果你的响应中有一个 'X-My-Response-Header'，客户端想读取它
    // res.setHeader('Access-Control-Expose-Headers', 'X-My-Response-Header');
    // 在你当前的代码中，你没有在响应中发送自定义头部让客户端读取，所以这个不是必需的。

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
        message = "Oh, Dear. I Love you too!";
    }

    const data = {
        status: status,
        message: message,
    };

    res.status(200).json(data);
};