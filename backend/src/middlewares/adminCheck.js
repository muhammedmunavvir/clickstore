export const adminCheckmiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ status: "error", message: "User not authenticated" });
  }

  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ status: "fail", message: "Access denied" });
  }

  next();
};
