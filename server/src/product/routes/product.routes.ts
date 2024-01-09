import express from "express";
import { uploadFile } from "../../middleware/uploadFile";
import { validate } from "../../middleware/validate";
import { addProductHandler } from "../controller/product.controller";
import { addProductSchema } from "../schema/product.schema";

const router = express.Router();

router.post("/", uploadFile, validate(addProductSchema), addProductHandler);

export default router;
