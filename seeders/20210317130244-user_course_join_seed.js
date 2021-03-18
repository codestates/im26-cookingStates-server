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
    return await queryInterface.bulkInsert("user_course_joins", [
      {
        userId: 1,
        courseId: 1,
        endDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        courseId: 2,
        endDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        courseId: 3,
        endDate: null,
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
    return queryInterface.bulkDelete("user_course_joins", null, {});
  },
};
