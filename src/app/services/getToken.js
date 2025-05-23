// utils/verifyToken.js
import jwt from "jsonwebtoken";
import {parse} from "cookie"

export function getToken(req) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;
  if (!token) throw new Error("No token provided");

  //   const authHeader = req.headers.authorization;

  //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //     throw new Error("No token provided");
  //   }

  //   const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { id, email, ... }
  } catch (err) {
    throw new Error("Invalid token");
  }
}
