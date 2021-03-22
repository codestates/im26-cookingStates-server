"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("User_Recipe_joins", {
      fields: ["userId"],
      type: "foreign key",
      name: "user_recipe",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("User_Recipe_joins", {
      fields: ["recipeId"],
      type: "foreign key",
      name: "recipe_user",
      references: {
        table: "Recipes",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("User_Course_joins", {
      fields: ["userId"],
      type: "foreign key",
      name: "user_course",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("User_Course_joins", {
      fields: ["courseId"],
      type: "foreign key",
      name: "course_user",
      references: {
        table: "Courses",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("Recipes", {
      fields: ["courseId"],
      type: "foreign key",
      name: "course_recipe",
      references: {
        table: "Courses",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("User_Recipe_joins", "user_recipe");
    await queryInterface.removeConstraint("User_Recipe_joins", "recipe_user");
    await queryInterface.removeConstraint("User_Course_joins", "user_course");
    await queryInterface.removeConstraint("User_Course_joins", "course_user");
    await queryInterface.removeConstraint("Recipes", "course_recipe");
  },
};
