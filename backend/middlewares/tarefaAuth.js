import "dotenv/config";
import jwt from "jsonwebtoken";

export default function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "nao autorizado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "nao autorizado" });

    req.user = user;
    next();
  });
}
