"use strict";

module.exports = {
  up: async ({ queryInterface }, Sequelize) => {
    await queryInterface.addColumn("blogs", "year", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async ({ queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
