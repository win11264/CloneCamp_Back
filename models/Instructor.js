module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define(
    "Instructor",
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      ratingAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      ratingTotal: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      learner: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      expertise: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      facebook: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      youtube: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      twitter: {
        type: DataTypes.STRING,
        allowNull: true,
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

  Instructor.associate = models => {
    Instructor.hasMany(models.InstructorCat, {
      foreignKey: {
        name: "instructorId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Instructor.hasMany(models.Topic, {
      foreignKey: {
        name: "instructorId",
        allowNull: true,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Instructor;
};
