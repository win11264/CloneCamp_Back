module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    "Feedback",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      feedbackName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(["solved", "unsolved"]),
        allowNull: false,
        defaultValue: "unsolved",
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  // Feedback.associate = models => {
  //   Feedback.belongsTo(models.User, {
  //     foreignKey: {
  //       name: "userId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //     onUpdate: "RESTRICT",
  //   });
  // };

  return Feedback;
};
