module.exports = (sequelize, DataTypes) => {
  const UserAns = sequelize.define(
    "UserAns",
    {
      answer: {
        type: DataTypes.ENUM(["A", "B", "C", "D"]),
        allowNull: false,
      },
      isCorrected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  UserAns.associate = models => {
    UserAns.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    UserAns.belongsTo(models.Question, {
      foreignKey: {
        name: "questionId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return UserAns;
};
