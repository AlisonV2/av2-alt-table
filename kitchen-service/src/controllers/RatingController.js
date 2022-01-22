import Rating from '../models/RatingModel';

const rateDish = (req, res) => {
  try {
    const { dish_name, comment, score } = req.body;
    const newRating = new Rating({
      dish_name: dish_name,
      comment: comment,
      score: score,
    });
    newRating.save((err, rating) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      return res.status(200).json({
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