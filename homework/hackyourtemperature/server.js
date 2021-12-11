import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

// Body parser
app.use(express.json());

app.get("/", function (req, res) {
  res.send("hello from backend to frontend!");
});

app.post("/weather", function (req, res) {
  const cityName = req.body.cityName;
  res.json({ cityName });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
