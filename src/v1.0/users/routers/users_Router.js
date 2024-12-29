const multer = require("multer");
const path = require("path");

const Router = require("express");
const { body, validationResult } = require("express-validator");

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, `${file.fieldname}-${file.originalname}`);
  },
});

// File filter to validate file type
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".png", ".jpg", ".jpeg"];

  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Format Image tidak sesuai")); // Reject the file
  }
};

// Multer Instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
}).single("photo");

const registerController = require("../controllers/register_Controller");

const loginController = require("../controllers/login_Controller");

const profileController = require("../controllers/profile_Controller");

const updateProfileController = require("../controllers/profile/userProfileUpdate");

const updatePhotoController = require("../controllers/profile/userPhotoUpdate");

const router = Router();

// Router Register User
router.post(
  "/registration",
  [
    body("email").isEmail().withMessage("Parameter Email Tidak Sesuai Format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password Length must be more 8 Character"),
  ],
  async (req, res) => {
    const data = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 400, message: errors.errors[0].msg, data: null });
    }

    const v_results = await registerController.register(data);

    if (v_results === 1) {
      return res.status(200).json({
        status: 200,
        message: "Registrasi Berhasil silahkan Login",
        data: null,
      });
    }
  }
);

// Router Login User
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Parameter Email Tidak Sesuai Format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password Length must be more 8 Character"),
  ],
  async (req, res) => {
    const reqData = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 102, message: errors.errors[0].msg, data: null });
    }

    const data = await loginController.login(reqData);

    if (data.status === 103) {
      return res.status(401).json(data);
    } else if (data.status === 0) {
      return res.status(200).json(data);
    }

    // console.log(data.status);

    // return res.status(200).json({
    //   status: 200,
    //   message: "Registrasi Berhasil silahkan Login",
    //   data,
    // });

    // if (v_results === 1) {
    //   return res.status(200).json({
    //     status: 200,
    //     message: "Registrasi Berhasil silahkan Login",
    //     data: null,
    //   });
    // }
  }
);

// Router See User
router.get("/profile", async (req, res) => {
  const reqData = req.headers;

  const token = reqData.authorization.substring(7);

  const data = await profileController.profile(token);

  if (data.status === 0) {
    return res.status(200).json(data);
  } else if (data.status === 108) {
    return res.status(401).json(data);
  } else if (data.status === 404) {
    return res.status(404).json(data);
  }
});

// Router Update User Info
router.put("/profile/update", async (req, res) => {
  const reqBody = req.body;
  const reqHead = req.headers;

  const token = reqHead.authorization.substring(7);

  const data = await updateProfileController.profileUpdate(token, reqBody);

  if (data.status === 0) {
    return res.status(200).json(data);
  } else if (data.status === 108) {
    return res.status(401).json(data);
  } else if (data.status === 404) {
    return res.status(404).json(data);
  }
});

// Router Update User Image
router.put("/profile/image", async (req, res) => {
  const reqHead = req.headers;

  const token = reqHead.authorization.substring(7);

  upload(req, res, async (err) => {
    if (err) {
      console.log(err.message);

      // Handle Custom Errors
      return res
        .status(400)
        .json({ status: "102", message: err.message, data: null });
    }

    const path = req.file.destination;

    const filename = req.file.filename;

    const fullpath = req.file.destination + req.file.filename;

    const data = await updatePhotoController.updatePhoto(token, fullpath);

    if (data.status === 0) {
      return res.status(200).json(data);
    } else if (data.status === 108) {
      return res.status(401).json(data);
    } else if (data.status === 404) {
      return res.status(404).json(data);
    }


    console.log(req.file);
  });

  // const data = await updatePhotoController.updatePhoto(token, reqBody);

  // res.status(200).json({
  //   message: "File uploaded successfully",
  //   file: req.file,
  // });
});

module.exports = router;
