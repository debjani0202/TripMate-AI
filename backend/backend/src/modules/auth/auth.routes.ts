import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import {
  register,
  login,
  getMe,
  updateProfile,
   updateProfilePhotoController,
} from "./auth.controller.js";
import { uploadProfilePhoto } from "../../middleware/upload.middleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.patch("/profile", authenticate, updateProfile);
router.patch(
  "/profile/photo",
  authenticate,
  uploadProfilePhoto.single("photo"),
  updateProfilePhotoController,
);

export default router;