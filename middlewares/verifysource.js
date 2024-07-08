const allowedReferers = [
    'http://localhost:3000/api/v1/login',
    'http://localhost:3000/api/v1/register',
  ];
  
  const verifySource = (req, res, next) => {
    const referer = req.headers['referer'];
  
    if (!referer || allowedReferers.some(allowedReferer => referer.startsWith(allowedReferer))) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Request source not allowed' });
    }
  };
  
  export default verifySource;
  