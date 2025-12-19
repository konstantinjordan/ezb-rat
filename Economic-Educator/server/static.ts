import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Resolve the path to dist/public from the current module's location
  // This works whether running from Economic-Educator or from root
  let distPath = path.resolve(__dirname, "public");
  
  // If not found (happens when bundled), try from process.cwd()
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(process.cwd(), "Economic-Educator", "dist", "public");
  }
  
  // Last resort: try dist/public from cwd
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(process.cwd(), "dist", "public");
  }
  
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
