'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
    await queryInterface.bulkInsert('User', [
      {
        email: 'emailtest1@gmail.com',
        password: '123',
        username: 'user1',
      },
      {
        email: 'emailtest2@gmail.com',
        password: '123',
        username: 'user2',
      },
      {
        email: 'emailtest3@gmail.com',
        password: '123',
        username: 'user3',
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
