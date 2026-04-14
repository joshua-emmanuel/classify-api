import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use("/api", routes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
