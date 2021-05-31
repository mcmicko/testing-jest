const express = require("express");
const request = require("supertest");
const app = express();
const users = require("../users");
const db = require("../../db");

app.use(express.json({ extended: false }));

app.use("/users", users);

beforeAll(async () => await db.connect());
afterAll(async () => await db.closeDatabase());

describe("Registration test : /register", () => {
  it("Without body", async () => {
    const res = await request(app)
      .post("/users/register")
      .set("Content-Type", "application/json")
      .set("Accept", /json/)
      .send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors).toEqual([
      {
        msg: "Name is required",
        param: "name",
        location: "body",
      },
      {
        msg: "Please include a valid email",
        param: "email",
        location: "body",
      },
      {
        msg: "Please a password with 6 or more characters",
        param: "password",
        location: "body",
      },
    ]);
  });
  it("Correct registration", async () => {
    const res = await request(app)
      .post("/users/register")
      .set("Content-Type", "application/json")
      .set("Accept", /json/)
      .send({
        name: "mcmzrc",
        email: "mcmzrc2@gmail.com",
        password: "zrenjaninac",
      });

    expect(res.statusCode).toEqual(200);
  });

  it("with duplicate EMAIL", async () => {
    const res = await request(app)
      .post("/users/register")
      .set("Accept", /json/)
      .send({
        name: "mcmzrc",
        email: "mcmzrc2@gmail.com",
        password: "zrenjaninac",
      });

    expect(res.status).toEqual(400);
    expect(res.body.errors).toEqual([{ msg: "User already exist" }]);
  });
});
