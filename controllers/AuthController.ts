import { Router, Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  public router: Router;
  private authService: AuthService;

  constructor() {
    this.router = Router();
    this.authService = new AuthService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Use inline arrow functions or bind this explicitly
    this.router.post("/register", (req, res) => this.register(req, res));
    this.router.post("/login", (req, res) => this.login(req, res));
    this.router.post("/refresh", (req, res) => this.refreshToken(req, res));
  }

  private register = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  private login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const tokens = await this.authService.login(email, password);
      res.json(tokens);
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  };

  private refreshToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.body.refreshToken;
    if (!token) {
      res.status(400).json({ message: "Missing refresh token" });
      return;
    }

    try {
      const result = await this.authService.refreshToken(token);
      res.json(result);
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  };
}
