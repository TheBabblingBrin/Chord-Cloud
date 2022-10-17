'use strict';

const { Comment } = require('../models');

const comments = [
  {
    songId: 1,
    userId: 1,
    // body: 'hi aphextwin'
    body: 'Nice song!'
  },
  {
    songId: 1,
    userId: 6,
    // body: 'hi aphextwin'
    body: 'fire!!!!!'
  },
  {
    songId: 2,
    userId: 7,
    // body: 'hi aphextwin'
    body: 'Chill beats'
  },
  {
    songId: 2,
    userId: 4,
    // body: 'hi aphextwin'
    body: 'Weeknds on the weekend'
  },
  {
    songId: 5,
    userId: 8,
    // body: 'hi aphextwin'
    body: 'This song is ass'
  },
  {
    songId: 4,
    userId: 10,
    // body: 'hi aphextwin'
    body: 'My bowling team loves this song!'
  },
  {
    songId: 6,
    userId: 11,
    // body: 'hi aphextwin'
    body: 'Decent sized song'
  },
  {
    songId: 9,
    userId: 12,
    // body: 'hi aphextwin'
    body: 'My sampled in my next remix'
  },
  {
    songId: 7,
    userId: 9,
    // body: 'hi aphextwin'
    body: 'Pretty good, but BP is better!'
  },
  {
    songId: 9,
    userId: 13,
    // body: 'hi aphextwin'
    body: 'Me too man me too..'
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.bulkCreate(comments, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comment', {
      where: { id: comments.map(comment => comment.id) }
    }, {});
  }
};
