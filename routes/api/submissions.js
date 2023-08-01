const express = require("express");
const router = express.Router();
const Submissions = require("../../models/Submissions");

router.get("/", async (req, res) => {
  try {
    const books = await Submissions.aggregate([{ $sample: { size: 10 } }]).exec()
    const bookList = books.filter((book) => book.frontPage !== undefined);
    res.json(bookList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error");
  }
});


router.get("/more", async (req, res) => {
  try {
    const books = await Submissions.aggregate([{ $sample: { size: 10 } }]).exec()
    const bookList = books.filter((book) => book.frontPage !== undefined);
    res.json(bookList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error");
  }
});

router.get("/book", async (req, res) => {
  try {
    const content = await Submissions.find({ lid: req.query.lid }).select({
      digitizationFiles: 1,
    });
    const bookContent = content[0].digitizationFiles;
    res.json(bookContent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error");
  }
});

router.get("/search", async (req, res) => {
  try {
    const contents = await Submissions.find({
      $or: [
        { artistName: { $regex: req.query.word, $options: 'i' } },
        { title: { $regex: req.query.word, $options: 'i' } },
        { 'address.countryCode': { $regex: req.query.word, $options: 'i' } },
        { 'address.city': { $regex: req.query.word, $options: 'i' } },
        { 'address.stateName': { $regex: req.query.word, $options: 'i' } },
        { 'address.zip': { $regex: req.query.word, $options: 'i' } }
      ]
    })
      .limit(50)
      .select({ frontPage: 1, artistName: 1, address: 1, lid: 1, title: 1 });
    const bookList = contents.filter((book) => book.frontPage !== undefined);
    res.json(bookList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error");
  }
});

router.get("/moreSearch", async (req, res) => {
  const perPage = 10;
  try {
    const books = await Submissions.find({
      $or: [
        { artistName: { $regex: req.query.word, $options: 'i' } },
        { title: { $regex: req.query.word, $options: 'i' } },
        { 'address.countryCode': { $regex: req.query.word, $options: 'i' } },
        { 'address.city': { $regex: req.query.word, $options: 'i' } },
        { 'address.stateName': { $regex: req.query.word, $options: 'i' } },
        { 'address.zip': { $regex: req.query.word, $options: 'i' } }
      ]
    })
      .skip(req.query.page * perPage)
      .limit(perPage)
      .select({ frontPage: 1, artistName: 1, address: 1, lid: 1 });
    const bookList = books.filter((book) => book.frontPage !== undefined);
    res.json(bookList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error");
  }
});

module.exports = router;
