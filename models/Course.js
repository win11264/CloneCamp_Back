module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      courseName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shortDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      level: {
        type: DataTypes.ENUM(['Beginner', 'Intermediate', 'Expert']),
        defaultValue: 'Beginner',
      },
      clip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      totalStage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      courseImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      discountRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      discountUntil: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: DataTypes.ENUM(['ready', 'notReady']),
        defaultValue: 'notReady',
      },
    },

    {
      underscored: true,
      paranoid: true,
    }
  );

  Course.associate = models => {
    Course.hasMany(models.Topic, {
      foreignKey: {
        name: 'courseId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Course.hasMany(models.Promotion, {
      foreignKey: {
        name: 'courseId',
        allowNull: true,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Course.hasMany(models.CourseCat, {
      foreignKey: {
        name: 'courseId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Course.hasMany(models.Comment, {
      foreignKey: {
        name: 'courseId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Course.hasMany(models.MyCourse, {
      foreignKey: {
        name: 'courseId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Course;
};
