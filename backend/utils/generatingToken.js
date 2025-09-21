import jwt from "jsonwebtoken";
export const creatingToken = async (name, res) => {
  const token = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    http: true,
    sameSite: "strict",
  });
};
