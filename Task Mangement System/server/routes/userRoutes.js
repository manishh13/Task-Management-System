import express from "express";
const router = express.Router();

import * as userRoutes from "../controllers/userController.js";

router.post("/register", userRoutes.registerUser);
router.post("/login", userRoutes.loginUser);
router.post("/logout", userRoutes.logoutUser);
router.get("/getuser", userRoutes.getUser);
router.get("/getusername/:id", userRoutes.getusername);

router.delete("/deleteuser/:id", userRoutes.deleteUser);

export default router;
