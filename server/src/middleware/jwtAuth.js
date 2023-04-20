import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  // console.log(req.headers.authorization);
  const authHeader =
  req.body.token || req.query.token || req.headers["authorization"] || req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1]
  // console.log(token);
    if (!token) {
      console.log('no token');
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, "secret");
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
export default verifyToken;