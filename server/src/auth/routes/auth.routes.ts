import express from "express";
import {
  forgotPasswordHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
  resetPasswordHandler,
  verifyEmailHandler,
} from "../controller/auth.controller";
import { deserializeUser } from "../../middleware/deserializeUser";
import { validate } from "../../middleware/validate";
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "../schema/auth.schema";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUserHandler);

router.post("/login", validate(loginUserSchema), loginUserHandler);

router.get("/refresh", refreshAccessTokenHandler);

router.get(
  "/verifyemail/:verificationCode",
  validate(verifyEmailSchema),
  verifyEmailHandler
);

router.get("/logout", deserializeUser, logoutUserHandler);

router.post(
  "/forgotpassword",
  validate(forgotPasswordSchema),
  forgotPasswordHandler
);

router.patch(
  "/resetpassword/:resetToken",
  validate(resetPasswordSchema),
  resetPasswordHandler
);

export default router;
