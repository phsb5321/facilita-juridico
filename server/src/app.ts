import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";

import { RegisterRoutes } from "@/routes/routes";
import * as swaggerDocument from "@/swagger/swagger.json";

// Create an Express application
const app = express();

// Middleware setup
app.use(cors()); // CORS for cross-origin requests
app.use(helmet()); // Helmet for security headers
app.use(logger("dev")); // Morgan for request logging
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded requests
app.use(cookieParser()); // Parse cookies

// Serve Swagger UI on '/docs' route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Register TSOA-generated routes
RegisterRoutes(app);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Send the error message as response
  res.status(err.status || 500);
  res.send({ error: err.message });
});

export default app;
