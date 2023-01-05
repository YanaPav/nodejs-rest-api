const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { login, register, logout, current } = require("../../controllers/auth");
const { validateBody, authMiddleware } = require("../../middlewares");
const authSchema = require("../../schemas/auth/authSchema");

router.post("/register", validateBody(authSchema), ctrlWrapper(register));
router.get("/login", validateBody(authSchema), ctrlWrapper(login));
router.post("/logout", authMiddleware, ctrlWrapper(logout));
router.get("/current", authMiddleware, ctrlWrapper(current));

module.exports = router;
