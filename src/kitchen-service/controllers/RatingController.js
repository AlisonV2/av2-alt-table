import Rating from '../models/RatingModel';

const rateDish = (req, res) => {
  try {
    const newRating = new Rating({
      dish_name: req.params.name,
      comment: req.body.comment,
      score: req.body.score,
    });
    newRating.save((err, rating) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      return res.status(201).json({
        message: 'Successfully added a rating',
        rating: rating,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { rateDish };