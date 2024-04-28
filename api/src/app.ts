import cors from "cors";
import express from "express";
import documentRoutes from "./routes/documentRoutes";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use("/api", documentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
