const Router = require("express");
const { body, validationResult } = require("express-validator");

const balanceController = require("../controllers/balance_Controller");

const topupController = require("../controllers/topupController");

const historyTransaction = require("../controllers/historyController");

const mainTransaction = require("../controllers/transactionController");

const router = Router();

// Routing For Balance
router.get("/balance", [], async (req, res) => {
  const reqData = req.headers;

  const token = reqData.authorization.substring(7);

  const data = await balanceController.mainBalance(token);

  if (data.status === 0) {
    return res.status(200).json(data);
  } else if (data.status === 108) {
    return res.status(401).json(data);
  } else if (data.status === 404) {
    return res.status(404).json(data);
  }
});

// Routing For topup
router.post(
  "/topup",
  [
    body("top_up_amount")
      .exists()
      .withMessage("Amount is required")
      .isNumeric()
      .withMessage(
        "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
      )
      .isFloat({ min: 0 })
      .withMessage(
        "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
      ),
  ],
  async (req, res) => {
    const reqBody = req.body;
    const reqHead = req.headers;

    const token = reqHead.authorization.substring(7);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 400, message: errors.errors[0].msg, data: null });
    }

    const data = await topupController.topupController(token, reqBody);

    if (data.status === 0) {
      return res.status(200).json(data);
    } else if (data.status === 108) {
      return res.status(401).json(data);
    } else if (data.status === 404) {
      return res.status(404).json(data);
    }
  }
);

// Routing For transaction
router.post("/transaction", [], async (req, res) => {
  const reqHead = req.headers;
  const reqBody = req.body;

  const token = reqHead.authorization.substring(7);

  const data = await mainTransaction.mainTransaction(token, reqBody);
  if (data.status === 0) {
    return res.status(200).json(data);
  } else if (data.status === 108) {
    return res.status(401).json(data);
  } else if (data.status === 102) {
    return res.status(400).json(data);
  }
});

// Routing For transaction history
router.get("/transaction/history", [], async (req, res) => {
  const reqHead = req.headers;
  const reqBody = req.body;
  const { limit, offset } = req.query;

  const token = reqHead.authorization.substring(7);

  const data = await historyTransaction.historyTransaction(
    token,
    limit,
    offset
  );

  if (data.status === 0) {
    return res.status(200).json(data);
  } else if (data.status === 108) {
    return res.status(401).json(data);
  } else if (data.status === 404) {
    return res.status(404).json(data);
  }
});

module.exports = router;
