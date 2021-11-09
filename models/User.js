module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
        validate: {
          isEmail: true,
        },
      },
      mobileNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING,
      },
      googleEmail: {
        type: DataTypes.STRING,
      },
      googleName: {
        type: DataTypes.STRING,
      },
      googleImage: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["guest", "user", "admin"],
        defaultValue: "user",
      },

      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expireToken: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  User.associate = models => {
    User.hasMany(models.MyCourse, {
      foreignKey: {
        name: "userId",
        allowNull: true,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    User.hasMany(models.UserQuiz, {
      foreignKey: {
        name: "userId",
        allowNull: true,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    User.hasMany(models.UserAns, {
      foreignKey: {
        name: "userId",
        allowNull: true,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    User.hasMany(models.Comment, {
      foreignKey: {
        name: "userId",
        allowNull: true,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    // User.hasMany(models.Feedback, {
    //   foreignKey: {
    //     name: "userId",
    //     allowNull: true,
    //   },
    //   onDelete: "RESTRICT",
    //   onUpdate: "RESTRICT",
    // });
  };

  return User;
};
