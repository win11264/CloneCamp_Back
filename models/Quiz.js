module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    "Quiz",
    {
      quizName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  Quiz.associate = models => {
    Quiz.belongsTo(models.Topic, {
      foreignKey: {
        name: "topicId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Quiz.hasMany(models.UserQuiz, {
      foreignKey: {
        name: "quizId",
        allowNull: true,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Quiz.hasMany(models.Question, {
      foreignKey: {
        name: "quizId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Quiz;
};
