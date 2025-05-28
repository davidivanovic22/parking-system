import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ParkingZoneController } from "../controllers/ParkingZoneController";
import { TicketController } from "../controllers/TicketController";
import { PaymentController } from "../controllers/PaymentController";
import { RoleController } from "../controllers/RoleController";
import { RegistrationPlateController } from "../controllers/RegistrationPlateController";
import { ParkingSpotController } from "../controllers/ParkingSpotContoller";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthController } from "../controllers/AuthController";

const router = Router();

const authController = new AuthController();
router.use("/auth", authController.router);

// ✅ Protect everything after this line
router.use(authMiddleware);

const registerRoutes = (path: string, controller: any) => {
  router.get(`/${path}`, controller.all.bind(controller));
  router.get(`/${path}/:id`, controller.one.bind(controller));
  router.post(`/${path}`, controller.save.bind(controller));
  router.put(`/${path}/:id`, controller.update.bind(controller));
  router.delete(`/${path}/:id`, controller.delete.bind(controller));
};

registerRoutes("users", new UserController());
registerRoutes("roles", new RoleController());
registerRoutes("plates", new RegistrationPlateController());
registerRoutes("zones", new ParkingZoneController());
registerRoutes("spots", new ParkingSpotController());
registerRoutes("tickets", new TicketController());
registerRoutes("payments", new PaymentController());

export default router;
