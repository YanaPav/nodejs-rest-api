const express = require("express");
const router = express.Router();
const contactsCtrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const {
  addSchema,
  updateSchema,
  statusUpdateSchema,
} = require("../../schemas/contacts");
const {
  isValidId,
  validateBody,
  authMiddleware,
} = require("../../middlewares");

router.use(authMiddleware);

router.get("/", ctrlWrapper(contactsCtrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(contactsCtrl.getById));

router.post("/", validateBody(addSchema), ctrlWrapper(contactsCtrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(contactsCtrl.remove));

router.put(
  "/:contactId",
  isValidId,
  validateBody(updateSchema, "missing fields"),
  ctrlWrapper(contactsCtrl.update)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(statusUpdateSchema, "missing field favorite"),
  ctrlWrapper(contactsCtrl.statusUpdate)
);

module.exports = router;
