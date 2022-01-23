import express from "express";
import moviesRoutes from "./routes/movies.js";

const app = express();
export const PORT = process.env.PORT || 3000;

// body parser for json
app.use(express.json());

// user movies routes
app.use("/movies", moviesRoutes);

export default app;
