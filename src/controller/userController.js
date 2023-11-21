import crudUserService from '../service/crudUserService';

const read = async (req, res) => {
  try {
    if (req.query && req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await crudUserService.getUserByPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await crudUserService.getAllUser();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const create = async (req, res, next) => {
  try {
    let data = await crudUserService.createNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.data,
    });
  } catch (error) {
    console.error(error);
  }
};

const update = async (req, res, next) => {
  try {
    let data = await crudUserService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.data,
    });
  } catch (error) {
    console.error(error);
  }
};

const remove = async (req, res, next) => {
  try {
    let id = req.body.id;
    let data = await crudUserService.deleteUser(id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.data,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { read, create, update, remove }