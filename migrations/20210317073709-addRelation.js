"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("user_recipe_joins", {
      fields: ["userId"],
      type: "foreign key",
      name: "user_recipe",
      references: {
        table: "users",
        field: "id",
      },
    });
    await queryInterface.addConstraint("user_recipe_joins", {
      fields: ["recipeId"],
      type: "foreign key",
      name: "recipe_user",
      references: {
        table: "recipes",
        field: "id",
      },
    });
    await queryInterface.addConstraint("user_course_joins", {
      fields: ["userId"],
      type: "foreign key",
      name: "user_course",
      references: {
        table: "users",
        field: "id",
      },
    });
    await queryInterface.addConstraint("user_course_joins", {
      fields: ["userId"],
      type: "foreign key",
      name: "course_user",
      references: {
        table: "courses",
        field: "id",
      },
    });
    await queryInterface.addConstraint("recipes", {
      fields: ["courseId"],
      type: "foreign key",
      name: "course_recipe",
      references: {
        table: "courses",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("user_recipe_joins", "user_recipe");
    await queryInterface.removeConstraint("user_recipe_joins", "recipe_user");
    await queryInterface.removeConstraint("user_course_joins", "user_course");
    await queryInterface.removeConstraint("user_course_joins", "course_user");
    await queryInterface.removeConstraint("recipes", "course_recipe");
  },
};
