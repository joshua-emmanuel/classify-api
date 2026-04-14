import express from "express";

const router = express.Router();

router.get("/classify", async (req, res) => {
  const { name } = req.query;

  if (typeof name !== "string") {
    return res.status(422).json({
      status: "error",
      message: "Name must be a string",
    });
  }

  if (!name || name.trim() === "") {
    return res.status(400).json({
      status: "error",
      message: "Missing or empty name",
    });
  }

  try {
    const response = await fetch(
      `https://api.genderize.io?name=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      return res.status(502).json({
        status: "error",
        message: "Failed to reach the Genderize API",
      });
    }

    const result = await response.json();
    const { gender, probability, count: sample_size } = result;

    if (gender == null || sample_size == 0) {
      return res.status(500).json({
        status: "error",
        message: "No prediction available for the provided name",
      });
    }

    const is_confident = probability >= 0.7 && sample_size >= 100;

    return res.json({
      status: "success",
      data: {
        name,
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
