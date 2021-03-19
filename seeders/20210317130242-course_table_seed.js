'use strict';

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
    return await queryInterface.bulkInsert('Courses', [
      {
        id: 1,
        courseName: '한식',
        description: '매일 먹는 집밥 만들기',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        courseName: '양식',
        description: '양식 스킬 만렙 찍기',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        courseName: '비건',
        description: '맛도 좋고 지구도 좋아하는',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        courseName: '디저트',
        description: '5성급 호텔 파티쉐가 되어보자',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        courseName: '혼술 안주',
        description: '혼술해도 괜찮아... 맛있으니까',
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
    return queryInterface.bulkDelete('Courses', null, {});
  },
};
