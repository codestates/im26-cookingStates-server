"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return await queryInterface.bulkInsert("User_Recipe_joins", [
      {
        userId: 1,
        recipeId: 1,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        recipeId: 2,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        recipeId: 3,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        recipeId: 4,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        recipeId: 5,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        recipeId: 6,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        recipeId: 7,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        recipeId: 8,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        recipeId: 9,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        recipeId: 10,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        recipeId: 11,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        recipeId: 12,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        recipeId: 13,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        recipeId: 14,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        recipeId: 15,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("User_Recipe_joins", null, {});
  },
};
