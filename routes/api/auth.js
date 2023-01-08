const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const {
  login,
  register,
  logout,
  current,
  avatarUpdate,
} = require("../../controllers/auth");
const {
  validateBody,
  authMiddleware,
  upload,
  prepareAvatar,
} = require("../../middlewares");
const authSchema = require("../../schemas/auth/authSchema");

router.post("/register", validateBody(authSchema), ctrlWrapper(register));
router.get("/login", validateBody(authSchema), ctrlWrapper(login));
router.post("/logout", authMiddleware, ctrlWrapper(logout));
router.get("/current", authMiddleware, ctrlWrapper(current));
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  prepareAvatar,
  ctrlWrapper(avatarUpdate)
);

module.exports = router;
