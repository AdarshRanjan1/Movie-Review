import express from 'express';
import reviewsController from './reviews.controller.js';

const router = express.Router();

router.route('/movie/:id').get(reviewsController.apiGetReviews);
router.route('/new').post(reviewsController.apiPostReview);
router.route('/:id')
  .get(reviewsController.apiGetReview)
  .put(reviewsController.apiUpdateReview)
  .delete(reviewsController.apiDeleteReview);

export default router;



// const express = require('express');
// const reviewsController = require('./reviews.controller.js');

// const router = express.Router();

// router.route('/movie/:id').get(reviewsController.apiGetReviews);
// router.route('/new').post(reviewsController.apiPostReview);
// router.route('/:id').get(reviewsController.apiGetReview)
//                     .put(reviewsController.apiUpdateReview)
//                     .delete(reviewsController.apiDeleteReview);


// module.exports = router;