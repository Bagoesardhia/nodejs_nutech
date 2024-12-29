const Router = require("express");

const moduleControllers = require("../controllers/module_Controller");

const router = Router();

router.get("/banner", [], async (req, res) => {
  const data = await moduleControllers.menus();

  return res.status(200).json(data);
});

router.get("/service", [], async (req, res) => {
  const reqHead = req.headers;

  const token = reqHead.authorization.substring(7);

  const data = await moduleControllers.service(token);

  if (data.status === 0) {
    return res.status(200).json(data);
  } else if (data.status === 108) {
    return res.status(401).json(data);
  } else if (data.status === 404) {
    return res.status(404).json(data);
  }
});

module.exports = router;
