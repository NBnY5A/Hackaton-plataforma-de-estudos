import "dotenv/config";
import jwt from "jsonwebtoken";

export function login(req, res) {
  const { username, password } = req.body || [{}];

  if (username !== process.env.USUARIO || password !== process.env.SENHA)
    return res.status(401).json({ message: "usuario ou senha invalido" });

  const token = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ bearer: `${token}` });
}
