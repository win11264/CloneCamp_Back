module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define(
    "Promotion",
    {
      discountRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discountUntil: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Promotion.associate = models => {
    Promotion.belongsTo(models.Course, {
      foreignKey: {
        name: "courseId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Promotion;
};
