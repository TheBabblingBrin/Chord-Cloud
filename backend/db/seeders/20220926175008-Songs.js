"use strict";

const { Op } = require("sequelize");

const songs = [
  {
    albumId: 1,
    userId: 1,
    title: "Tuesday",
    description: "Soft hiphop by feature amaksi",
    imageUrl: "https://cdn.openai.com/labs/images/A%20photograph%20of%20a%20sunflower%20with%20sunglasses%20on%20in%20the%20middle%20of%20the%20flower%20in%20a%20field%20on%20a%20bright%20sunny%20day.webp?v=1",
    url: "https://cdn.pixabay.com/audio/2022/08/25/audio_4f3b0a816e.mp3",
  },
  {
    albumId: 1,
    userId: 1,
    title: "Weeknds",
    description: "feat DayFox",
    url: "https://cdn.pixabay.com/audio/2022/01/12/audio_45cacdef8f.mp3",
    imageUrl: "https://cdn.pixabay.com/audio/2022/08/25/21-06-21-240_200x200.png",
  },
  {
    albumId: 2,
    userId: 2,
    title: "Modern chill future calm",
    description: "feat penguinmusic",
    url: "https://cdn.pixabay.com/audio/2021/12/22/audio_9da2a60074.mp3",
    imageUrl: "https://cdn.pixabay.com/audio/2022/09/21/03-40-41-971_200x200.jpeg",
  },
  {
    albumId: 3,
    userId: 3,
    title: "War",
    description: "Performed by itsWatr",
    url: "https://cdn.pixabay.com/audio/2021/12/16/audio_232a4bdedf.mp3",
    imageUrl: "https://media.pitchfork.com/photos/5e70fa234b101700083a93d5/1:1/w_450%2Cc_limit/Through%2520Water_La%25CC%258Apsley.jpg",
  },
  {
    albumId: 4,
    userId: 4,
    title: "Saphhire City",
    description: "Performed by Leonell Cassio",
    url: "https://cdn.pixabay.com/audio/2021/11/07/audio_35719208a2.mp3",
    imageUrl: "https://cdn.pixabay.com/audio/2022/09/01/08-10-48-631_200x200.jpg",
  },
  {
    albumId: 5,
    userId: 5,
    title: "Brainsfluid",
    description: "INIM Official collabs",
    url: "https://cdn.pixabay.com/audio/2022/10/14/audio_84b5738b17.mp3",
    imageUrl: "https://cdn.pixabay.com/audio/2022/10/14/13-08-36-813_200x200.png",
  },
  {
    albumId: 1,
    userId: 1,
    title: "Summer Surf",
    description: "feat DayFox",
    url: "https://cdn.pixabay.com/audio/2022/09/17/audio_45f3ecf98b.mp3",
    imageUrl: "https://cdn.pixabay.com/audio/2022/09/17/11-32-26-864_200x200.jpg",
  },
  {
    albumId: 1,
    userId: 1,
    title: "LofI Summers",
    description: "feat Vlad Kurnikov",
    url: "https://cdn.pixabay.com/audio/2022/05/31/audio_cc96befbf4.mp3",
    imageUrl: "https://cdn.pixabay.com/audio/2022/03/15/07-20-33-888_200x200.jpg",
  },
  {
    albumId: 1,
    userId: 1,
    title: "I want to sleep",
    description: "feat MadRi",
    url: "https://cdn.pixabay.com/audio/2022/01/14/audio_13fe9a1248.mp3",
    imageUrl: "https://cdn.pixabay.com/audio/2022/03/15/07-25-56-171_200x200.jpg",
  },
  {
    albumId: 1,
    userId: 1,
    title: "Refined Style",
    description: "feat Daddys Music OFFICIAL",
    url: "https://cdn.pixabay.com/audio/2022/09/05/audio_2a37da50b5.mp3",
    imageUrl: "https://cdn.pixabay.com/audio/2022/09/05/16-55-13-976_200x200.jpeg",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Songs", songs);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Songs", { [Op.or]: songs });
  },
};
