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
    return await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        userName: "나수연",
        email: "na@coding.com",
        password: "1234",
        isPassed: false,
        score: 0,
        bio: "안녕하세요 여러분 나수연 입니다",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userName: "이연주",
        email: "e@coding.com",
        password: "1234",
        isPassed: false,
        score: 0,
        bio: "안녕하세요 여러분 이연주 입니다",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userName: "오성국",
        email: "oh@coding.com",
        password: "1234",
        isPassed: false,
        score: 0,
        bio: "안녕하세요 여러분 오성국 입니다",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userName: "오민석",
        email: "oh@coding2.com",
        password: "1234",
        isPassed: false,
        score: 0,
        bio: "안녕하세요 여러분 오민석 입니다",
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
    return queryInterface.bulkDelete("Users", null, {});
  },
};
