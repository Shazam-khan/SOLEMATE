import jwt from "jsonwebtoken";

export const generateTokenSetCookie = (res, userId, isAdmin) => {
  const token = jwt.sign({ userId, isAdmin }, "my_secret", {
    expiresIn: "2h",
  });

  res.cookie("token", token, {
    httpOnly: true, // prevents XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //prevents CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
