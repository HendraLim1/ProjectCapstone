import mongoose from 'mongoose';

const checkId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid ID');
  }
  next();
};

export default checkId;
