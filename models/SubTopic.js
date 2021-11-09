module.exports = (sequelize, DataTypes) => {
  const SubTopic = sequelize.define(
    "SubTopic",
    {
      subTopName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      video: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  SubTopic.associate = models => {
    SubTopic.belongsTo(models.Topic, {
      foreignKey: {
        name: "topicId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return SubTopic;
};
