const express = require("express");
const request = require("supertest");
const app = express();
const createPost = require("../posts");
const db = require("../../db");

app.use(express.json({ extended: false }));

app.use("/posts", createPost);

beforeAll(async () => await db.connect());

// afterEach(async () => await db.clearDatabase());

// afterAll(async () => await db.closeDatabase());

it("Should save POST to database", async () => {
  const res = await request(app)
    .post("/posts")
    .set("Content-Type", "application/json")
    .set("Accept", /json/)
    .send({
      title: "title 3",
      text: "zrenjaninac zrenjaninac zrenjaninac zrenjaninac",
    });

  expect(res.statusCode).toEqual(200);
});
