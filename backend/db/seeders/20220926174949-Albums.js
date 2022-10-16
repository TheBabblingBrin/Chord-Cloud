'use strict';

const { Op } = require("sequelize");

const albums = [
  {
    userId: 1,
    title: "Pacific DayDream",
    description: "West Coast Sunset Beats",
    imageUrl: "https://cdn.openai.com/labs/images/A%20photograph%20of%20a%20sunflower%20with%20sunglasses%20on%20in%20the%20middle%20of%20the%20flower%20in%20a%20field%20on%20a%20bright%20sunny%20day.webp?v=1",
  },
  {
    userId: 2,
    title: "Just like leaving",
    description: "a great album",
    imageUrl: "image.url",
  },
  {
    userId: 3,
    title: "Sorry",
    description: "a great album",
    imageUrl: "image.url",
  },
  {
    userId: 4,
    title: "hometwon",
    description: "a great album",
    imageUrl: "image.url",
  },
  {
    userId: 7,
    title: "No Regrets",
    description: "Forgiving myself for stealing my friends shit.",
    imageUrl: "https://openailabsprodscus.blob.core.windows.net/private/user-mSCtNYkxAKQ6D26Shj7MdHaH/generations/generation-z6jHfK5tQ5q2UDxRZp63GPbs/image.webp?st=2022-10-16T20%3A34%3A12Z&se=2022-10-16T22%3A32%3A12Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-16T19%3A26%3A43Z&ske=2022-10-23T19%3A26%3A43Z&sks=b&skv=2021-08-06&sig=pqL0hkYURs7CgFih6jsIhxQMqX8ZJBkUZbGo8s5pdlg%3D",
  },
  {
    userId: 8,
    title: "Not Sorry",
    description: "A 9/11 tribute album",
    imageUrl: "https://openailabsprodscus.blob.core.windows.net/private/user-mSCtNYkxAKQ6D26Shj7MdHaH/generations/generation-qxfoiF6YMw0fTtQdioy2J1gB/image.webp?st=2022-10-16T20%3A28%3A49Z&se=2022-10-16T22%3A26%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-16T20%3A28%3A35Z&ske=2022-10-23T20%3A28%3A35Z&sks=b&skv=2021-08-06&sig=C9XwXPHolZU6mqnm45g%2Bo54sYw/yhk5yfM3GMDYvYZU%3D",
  },
  {
    userId: 9,
    title: "Shades of Pink",
    description: "BLACKPINK REMIXES",
    imageUrl: "https://openailabsprodscus.blob.core.windows.net/private/user-mSCtNYkxAKQ6D26Shj7MdHaH/generations/generation-nKbIoji9QsiP986Y2EzicO98/image.webp?st=2022-10-16T20%3A38%3A37Z&se=2022-10-16T22%3A36%3A37Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-10-16T21%3A18%3A34Z&ske=2022-10-23T21%3A18%3A34Z&sks=b&skv=2021-08-06&sig=92LB2dCimBHdhhKamrrAXsWiNaI5ol8LuE1LR0hluLw%3D",
  },
  {
  userId: 10,
  title: "200 Commits",
  description: "The struggles of a retired bowler turned programmer",
  imageUrl: "https://i.postimg.cc/fT5b7XxL/bowling.jpg"
},
{
  userId: 11,
  title: "Cream of the Crop",
  description: "Inspired tracks sampling WWE history",
  imageUrl: "https://www.biography.com/.image/t_share/MTc5Mzk0NDcxNjk0MTgxNzA5/macho01_ba.jpg"
},
{
  userId: 12,
  title: "Straight Out of 4th Grade",
  description: "Fight them kids",
  imageUrl: "https://i.imgflip.com/2wurrf.png"
},
{
  userId: 13,
  title: "Spellin Bee Hard",
  description: "Ayoooo",
  imageUrl: "https://www.readabilitytutor.com/wp-content/uploads/2020/08/my-child-is-struggling-with-reading.jpg"
},
{
  userId: 14,
  title: "Watermelon Friendships",
  description: "What does it mean",
  imageUrl: "https://c8.alamy.com/comp/F5WYKC/bizarre-farmer-drinking-watermelon-juice-through-a-tubules-F5WYKC.jpg"
},
];
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Albums", albums);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Albums", { [Op.or]: albums });
  }
};
