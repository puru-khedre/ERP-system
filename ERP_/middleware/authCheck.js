module.exports = {
  authCheck: (req, res, next) => {
    const auth = req.headers.authorization;
    const [type, token] = auth.split(" ");
    if (type == "Bearer" && token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } catch (error) {
        return res
          .status(401)
          .json({ msg: "Invalid Token", error: error.message });
      }
    } else {
      return res
        .status(403)
        .json({ error: "token not found or incorrect token type" });
    }

    return next();
  },
};
