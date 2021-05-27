const Restaurant = require("../model/Restaurant");

// This function should return the ID of newly created restaurant
// as restaurantId
module.exports = async function createRestaurant(name, location, budget) {
  try {
    // step 1 check name is not repeated
    const existingRestaurant = await Restaurant.findOne({ name: name });
    if (existingRestaurant)
      throw new Error(`A restaurant with name ${name} already exists.`);

    // step 2 assuming all is good, create
    const newRestaurant = new Restaurant({
      name,
      location,
      cost: budget,
    });
    await newRestaurant.save();

    return {
      restaurantId: newRestaurant._id,
    };
  } catch (err) {
    throw err;
  }
};
