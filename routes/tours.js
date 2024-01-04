const Router = require("express").Router();

const {
  featuredTours,
  allTours,
  singleTour,
  filterTours,
} = require("../controllers/toursController");

Router.route("/featured").get(featuredTours);
Router.route("/all").get(allTours);
Router.route("/single").get(singleTour);
Router.route("/filter").get(filterTours);

module.exports = Router;
