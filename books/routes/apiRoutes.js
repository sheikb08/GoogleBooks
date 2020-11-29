const router = require("express").Router();
const axios = require("axios");
const apiKey = process.env.BOOKS_API_KEY;


router.get("/books/", async (req, res, next) => {
  try {
    const { q } = req.query;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&projection=lite&key=${apiKey}`);
    res.json(response.data);
  }
  catch (err) {
    console.error("Error in API Call", err);
  }
})

router.get("/book/", async (req, res, next) => {
  try {
    const { selfLink } = req.query;
    const response = await axios.get(`${selfLink}?projection=lite&key=${apiKey}`);
    res.json(response.data);
  }
  catch (err) {
    console.error("Error in API Call", err);
  }
})

module.exports = router;