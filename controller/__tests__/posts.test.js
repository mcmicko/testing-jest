const express = require("express");
const request = require("supertest");
const app = express();

const posts = require("../posts");
const users = require("../users");
const db = require("../../db");

app.use(express.json({ extended: false }));

app.use("/posts", posts);
app.use("/users", users);

beforeAll(async () => await db.connect());
// afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe("Create Posts", () => {
  let user;
  it("initalize", async () => {
    user = await request(app)
      .post("/users/register")
      .set("Content-Type", "application/json")
      .set("Accept", /json/)
      .send({
        name: "milos",
        email: "milos@gmail.com",
        password: "zrenjaninac",
      });
  });
  it("Should save posts to database", async () => {
    const res = await request(app)
      .post("/posts")
      .set("Content-Type", "application/json")
      .set("Accept", /json/)
      .set("x-auth-token", user.body.token)
      .send({
        user: user.id,
        title: "title 3",
        text: "zrenjaninac zrenjaninac zrenjaninac zrenjaninac",
      });

    expect(res.statusCode).toEqual(200);
  });
});
