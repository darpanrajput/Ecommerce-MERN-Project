const AllowedOrigin = async (req, res, next) => {
    console.log("headers", req?.headers);
    const origin = req?.headers?.origin || 'No Origin Header';
    const referer = req?.headers?.referer || 'No Referer Header';
    const host = req?.headers?.host || 'No Host Header';
    const clientIP = req?.ip || 'No IP';
    const forwardedFor = req?.headers['x-forwarded-for'] || 'No X-Forwarded-For Header';

    const clientIPs = req?.headers['x-forwarded-for']?.split(':')[0] || req?.connection?.remoteAddress;

    if (blockedIPs.includes(clientIPs)) {
        console.log(`Blocked request from IP: ${clientIPs}`);
        return res.status(200).json({ error: 'Forbidden: Unauthorized Origin' });
    }

    if (process.env.NODE_ENV == 'developement') {
        /* if it is in development environment bypass the AllowedOrigin */
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        next()
    }
    const allowedOrigins = [
        `https://ecommer-frontend.netlify.app/`,
        `https://ecommer-frontend.netlify.app`
    ];
    const requestOrigin = req.headers.origin;
    // console.log("requestOrigin:", requestOrigin)

    const baseDomain = "https://ecommer-frontend.netlify.app";
    const regex = new RegExp(`^${baseDomain}(/.*)?$`);//regex using for whitelisting the Jockey sub paths

    // Check if the request's origin is in the list of allowed origins
    if (allowedOrigins.includes(requestOrigin) || allowedOrigins.includes(referer) || regex.test(referer)) {
        // Allow the request's origin
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        next()
    } else {
        // Block all other origins
        // res.setHeader('Access-Control-Allow-Origin', null);
        res.status(200).json({ error: "Forbidden: Unauthorized Origin" });
    }

}

module.exports = AllowedOrigin;