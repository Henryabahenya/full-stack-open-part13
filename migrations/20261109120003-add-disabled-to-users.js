"use strict";

module.exports = {
  up: async ({ queryInterface }, Sequelize) => {
    await queryInterface.addColumn("users", "disabled", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: async ({ queryInterface }) => {
    await queryInterface.removeColumn("users", "disabled");
  },
};
