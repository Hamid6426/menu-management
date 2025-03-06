import mongoose from "mongoose";

export const convertToObjectId = (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    req.params._id = new mongoose.Types.ObjectId(req.params._id); // Ensure it's an ObjectId
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid ObjectId format" });
  }
};
