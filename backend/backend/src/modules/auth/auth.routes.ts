import { Router } from "express"
import { authenticate } from "../../middleware/auth.middleware.js";
import {
  register,
  login,
  getMe,
  updateProfile,
} from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.patch("/profile", authenticate, updateProfile);

export default router;