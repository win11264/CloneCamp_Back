module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choiceA: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choiceB: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      choiceC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      choiceD: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      correct: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Question.associate = models => {
    Question.hasMany(models.UserAns, {
      foreignKey: {
        name: "questionId",
        allowNull: true,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Question.belongsTo(models.Quiz, {
      foreignKey: {
        name: "quizId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Question;
};
