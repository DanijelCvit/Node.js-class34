import { app } from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /", () => {
  describe("given a city name", () => {
    // Should respond with a 200 status code
    it("Should respond with a 200 status code", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "Amsterdam" });

      expect(response.statusCode).toBe(200);
    });
    // Should specify json in the content type header
    it("Should specify json in the content type header", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "Amsterdam" });

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // Should respond with a json object containing city name and temperature
    it("Json object should contains city name and temp", async () => {
      const json = { cityName: "Amsterdam" };
      const regexMatch = new RegExp(`${json.cityName} -?\\d+.\\d\u00B0C`, "g");

      const response = await request.post("/weather").send(json);
      expect(response.body.weatherText).toEqual(
        expect.stringMatching(regexMatch)
      );
    });
  });

  describe("when city name is missing", () => {
    // Should respond with a status code 400
    it("Should respond with a 400 status code", async () => {
      const response = await request.post("/weather").send({ cityName: "" });

      expect(response.statusCode).toBe(400);
    });
  });
});

describe("GET /", () => {
  // Should respond with a 200
  it("Should respond with a 200 status code", async () => {
    const response = await request.get("/");

    expect(response.statusCode).toBe(200);
  });

  // Should respond with a greeting message
  it("Should respond with a text greeting", async () => {
    const response = await request.get("/");

    expect(response.text.length).not.toBe(0);
  });
});
