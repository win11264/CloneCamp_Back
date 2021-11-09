module.exports = (sequelize, DataTypes) => {
  const CourseCat = sequelize.define(
    "CourseCat",
    {
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      courseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      underscored: true,
      paranoid: false,
    }
  );

  CourseCat.associate = models => {
    CourseCat.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    CourseCat.belongsTo(models.Course, {
      foreignKey: {
        name: "courseId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return CourseCat;
};
