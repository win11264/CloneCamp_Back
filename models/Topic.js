module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      topicName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      learner: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Topic.associate = models => {
    Topic.belongsTo(models.Instructor, {
      foreignKey: {
        name: "instructorId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Topic.belongsTo(models.Course, {
      foreignKey: {
        name: "courseId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Topic.hasMany(models.SubTopic, {
      foreignKey: {
        name: "topicId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Topic.hasMany(models.Quiz, {
      foreignKey: {
        name: "topicId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Topic;
};
