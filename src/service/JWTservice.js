import db from "../models/index";

const getRoleUser = async (id) => {
  // Code ...
  let roles = await db.Group.findOne({
    where: { id: id },
    include: [
      {
        model: db.Role,
        attributes: ["id", "name", "description"],
        through: { attributes: [] },
      },
    ],
  });
  return roles ? roles : {};
};

module.exports = {
  getRoleUser,
};
