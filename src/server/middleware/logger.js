// these middleware for follow up the requests from the front end .
export default (req, res, next) => {
  console.log(`${req.method.toUpperCase()}: ${req.url}`);
  next();
};
