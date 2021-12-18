import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";

export const PORT = process.env.PORT || 3000;

export const app = express();

// Body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;

  try {
    const response =
      await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}
  `);
    const json = await response.json();

    if (json.cod === 200) {
      res
        .json({
          weatherText: `${cityName} ${(+json.main.temp - 273.15).toFixed(
            1
          )}\u00B0C`,
        })
        .end();
    } else {
      res.status(400).json({ weatherText: "City is not found!" }).end();
    }
  } catch (error) {
    console.log(error);
  }
});
