'use strict';

const { Comment } = require('../models');

const comments = [
  {
    songId: 1,
    userId: 1,
    
    body: 'Nice song!'
  },
  {
    songId: 1,
    userId: 6,
    
    body: 'fire!!!!!'
  },
  {
    songId: 2,
    userId: 7,
    
    body: 'Chill beats'
  },
  {
    songId: 2,
    userId: 4,
    
    body: 'Weeknds on the weekend'
  },
  {
    songId: 5,
    userId: 8,
    
    body: 'This song is ass'
  },
  {
    songId: 4,
    userId: 10,
    
    body: 'My bowling team loves this song!'
  },
  {
    songId: 6,
    userId: 11,
    
    body: 'Decent sized song'
  },
  {
    songId: 9,
    userId: 12,
    
    body: 'My sampled in my next remix'
  },
  {
    songId: 7,
    userId: 9,
    
    body: 'Pretty good, but BP is better!'
  },
  {
    songId: 9,
    userId: 13,
    
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
