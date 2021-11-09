module.exports = (sequelize, DataTypes) => {
  const InstructorCat = sequelize.define(
    "InstructorCat",
    {
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      instructorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  InstructorCat.associate = models => {
    InstructorCat.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    InstructorCat.belongsTo(models.Instructor, {
      foreignKey: {
        name: "instructorId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return InstructorCat;
};
