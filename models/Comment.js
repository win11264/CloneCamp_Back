module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      commentName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.ENUM(["1", "2", "3", "4", "5"]),
        allowNull: false,
      },
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  Comment.associate = models => {
    Comment.belongsTo(models.Course, {
      foreignKey: {
        name: "courseId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Comment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Comment;
};
