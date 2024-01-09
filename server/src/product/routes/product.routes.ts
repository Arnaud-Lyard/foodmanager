import express from "express";
import { uploadFile } from "../../middleware/uploadFile";
import { validate } from "../../middleware/validate";
import { addProductHandler } from "../controller/product.controller";
import { addProductSchema } from "../schema/product.schema";
import { authenticateAdmin } from "../../middleware/authenticateAdmin";

const router = express.Router();

router.post(
  "/",
  uploadFile,
  validate(addProductSchema),
  authenticateAdmin,
  addProductHandler
);

export default router;
