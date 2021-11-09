module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Category.associate = models => {
    Category.hasMany(models.CourseCat, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Category.hasMany(models.InstructorCat, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Category;
};
