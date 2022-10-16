'use strict';

const bcrypt = require("bcryptjs");

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
     return queryInterface.bulkInsert(
       "Users",
       [
         {
           firstName: "Jackie",
           lastName: "Smith",
           email: "demo5@user.io",
           username: "Demo-lition",
           hashedPassword: bcrypt.hashSync("password"),
         },
         {
           firstName: "Dean",
           lastName: "Smith",
           email: "user1@user.io",
           username: "FakeUser1",
           hashedPassword: bcrypt.hashSync("password2"),
         },
         {
           firstName: "Allie",
           lastName: "Smith",
           email: "user2@user.io",
           username: "FakeUser2",
           hashedPassword: bcrypt.hashSync("password3"),
         },
         {
           firstName: "Alex",
           lastName: "Smith",
           email: "user3@user.io",
           username: "FakeUser3",
           hashedPassword: bcrypt.hashSync("password4"),
         },
         {
          firstName: "Mike",
          lastName: "Allen",
          email: "user4@user.io",
          username: "MikeyAllen27",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Jef",
          lastName: "Richards",
          email: "user5@user.io",
          username: "BigBoiJef",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Allison",
          lastName: "Smith",
          email: "user6@user.io",
          username: "AlliThePokeTheif",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Sebastion",
          lastName: "Ants",
          email: "user7@user.io",
          username: "ChileanSeabas",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "William",
          lastName: "Ngo",
          email: "user8@user.io",
          username: "LalisaStan",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Allen",
          lastName: "Pham",
          email: "user9@user.io",
          username: "BowlingForBanhXeo",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Dion",
          lastName: "Pham",
          email: "user10@user.io",
          username: "DecentSized",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Kyle",
          lastName: "Solano",
          email: "user11@user.io",
          username: "DropKickKid",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Ben",
          lastName: "Thai",
          email: "user12@user.io",
          username: "LilDBolagna",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Matt",
          lastName: "Li",
          email: "user13@user.io",
          username: "SlySoJu",
          hashedPassword: bcrypt.hashSync("password4"),
        },

       ],
       {}
     );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Users", {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2", 'FakeUser3'] },
      },{});
  }
};
