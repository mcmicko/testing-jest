const createRestaurant = require("../controller/createRestaurant");
const Restaurant = require("../model/Restaurant");
const db = require("./db");

beforeAll(async () => await db.connect());

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

describe("Restaunts created when", () => {
  it("First restaurant", async (done) => {
    const { restaurantId } = await createRestaurant("First", "Sydney", "$");

    // find the restaurant from db
    const restaurant = await Restaurant.findById(restaurantId);

    // check the name location ect of the restaurant found
    expect(restaurant.name).toEqual("First");
    expect(restaurant.cost).toEqual("$");
    expect(restaurant.location).toEqual("Sydney");
    done();
  });
});

describe("Errors throw when", () => {
  it("name repeated", async (done) => {
    await createRestaurant("First", "Sydney", "$");
    await expect(
      createRestaurant("First", "Melbourne", "$$")
    ).rejects.toThrow();
    done();
  });

  it("invalid budget", async (done) => {
    await expect(
      createRestaurant("First", "Melbourne", "cheap")
    ).rejects.toThrow();
    done();
  });
});
