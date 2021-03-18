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
    return await queryInterface.bulkInsert("Courses", [
      {
        id: 1,
        courseName: "한식",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        courseName: "중식",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        courseName: "비건",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        courseName: "디저트",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        courseName: "혼술 안주",
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
    return queryInterface.bulkDelete("Courses", null, {});
  },
};
