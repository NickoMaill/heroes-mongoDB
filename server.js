const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Hero = require("./schema/heroesSchema");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to mongo"));

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("hello");
});

app.get("/heroes", async (_req, res) => {
  const heroes = await Hero.find().select("-__v");
  try {
    heroes;
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "an error happened",
    });
  }
  res.json(heroes);
});

app.get("/heroes/:id/", async (req, res) => {
  const heroes = await Hero.findById(req.params.id);

  try {
    heroes;
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "an error happened",
    });
  }

  res.json(heroes);
});

app.post("/heroes", async (req, res) => {
  try {
    await Hero.create(req.body);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "an error happened",
    });
  }
  res.status(201).json({
    message: "hero added",
  });
});

app.patch("/heroes/:name/power/", async (req, res) => {
  console.log(req.params.name);

  const power = await Hero.updateOne(
    { name: req.params.name },
    { $push: { power: req.body.power } }
  );

  try {
    power;
  } catch (err) {
    console.error(err);
    res.json({
      message: "an error happened",
    });
  }
  res.json({ message: "power added" });
});

app.delete("/heroes/:name/delete", async (req, res) => {
const del = await Hero.find({ name: req.params.name }).remove().exec();
  try {
    del;
  } catch (err) {
    console.log(err);
    res.json({
      message: "an error happened",
    });
  }
  res.json({
    message: "hero removed",
  });
});
app.listen(8000, () => console.log("Listening"));
