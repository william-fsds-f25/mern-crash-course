import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

//to make it works

app.use(express.json()); // allows us to accept JSON data in the req.body


app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    try {
        if (!fs.existsSync(path.join(__dirname, "/frontend/dist"))) {
            console.log("Building frontend...");
            execSync("npm run build --prefix frontend", { stdio: 'inherit' });
        }
    } catch (err) {
        console.error("Build failed:", err);
    }
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+ PORT);
});

