module.exports = (sequelize, DataTypes) => {
  const UserQuiz = sequelize.define(
    "UserQuiz",
    {
      isPassed: {
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

  UserQuiz.associate = models => {
    UserQuiz.belongsTo(models.Quiz, {
      foreignKey: {
        name: "quizId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    UserQuiz.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return UserQuiz;
};
