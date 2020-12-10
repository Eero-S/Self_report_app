import { Router } from "../deps.js";
import { register, login, logout } from "./api/auth.js";
import { reportMorning } from "./api/report.js";
import { showLogin, showRegister } from "./controller/authController.js";
import { showHome, showReportMoning } from "./controller/homeController.js";

const router = new Router();

router.get("/behavior/reporting", showHome);
router.get("/behavior/reporting/morning", showReportMoning);
router.get("/behavior/reporting/evening", showHome);
router.post("/behavior/reporting/morning", reportMorning);

// Auth
router.get("/auth/login", showLogin);
router.get("/auth/registration", showRegister);
router.post("/auth/registration", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

export { router };
