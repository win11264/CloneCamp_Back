module.exports = (sequelize, DataTypes) => {
  const ContactUs = sequelize.define(
    "ContactUs",
    {
      map: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      facebook: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      twitter: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      youtube: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      line: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  return ContactUs;
};
