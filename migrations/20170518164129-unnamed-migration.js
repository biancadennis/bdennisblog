'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('projects', {
			id: {
				type:          Sequelize.INTEGER,
				primaryKey:    true,
				autoIncrement: true
			},
			title:     Sequelize.STRING,
			body:      Sequelize.TEXT,
			slug:      Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
		});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
