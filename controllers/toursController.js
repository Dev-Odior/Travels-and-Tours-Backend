const featuredTours = async (req, res) => {
  res.send("tours route");
};

const singleTour = async (req, res) => {
  res.send("single tour");
};

const allTours = async (req, res) => {
  res.send("all tours");
};

const filterTours = async (req, res) => {
  res.send("filter tours");
};

module.exports = { featuredTours, allTours, singleTour, filterTours };
