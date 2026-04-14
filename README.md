# 🔍 Gender Classification API

A lightweight REST API that predicts the gender of a name using the [Genderize.io](https://genderize.io) API — with data processing, confidence scoring, and proper error handling built in.

---

## 🚀 Live API

```
https://classify-api-production.up.railway.app/api/classify
```

---

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **External API:** [Genderize.io](https://genderize.io)

---

## 🛠️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/joshua-emmanuel/classify-api.git
cd classify-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

The server runs on **port 5001** by default.

---

## 📡 API Reference

### `GET /api/classify`

Classifies the likely gender of a given name.

#### Query Parameters

| Parameter | Type   | Required | Description          |
| --------- | ------ | -------- | -------------------- |
| `name`    | string | ✅ Yes   | The name to classify |

#### Success Response `200 OK`

```json
{
  "status": "success",
  "data": {
    "name": "James",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-01T12:00:00.000Z"
  }
}
```

#### Field Descriptions

| Field          | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| `name`         | The name that was queried                                                 |
| `gender`       | `"male"` or `"female"`                                                    |
| `probability`  | Confidence score from the Genderize API (0–1)                             |
| `sample_size`  | Number of data points the prediction is based on                          |
| `is_confident` | `true` if `probability >= 0.7` **and** `sample_size >= 100`, else `false` |
| `processed_at` | UTC timestamp of when the request was processed (ISO 8601)                |

---

## ⚠️ Error Responses

All errors follow a consistent structure:

```json
{
  "status": "error",
  "message": "<description of the error>"
}
```

| Scenario                         | Status Code |
| -------------------------------- | ----------- |
| `name` parameter is missing      | `400`       |
| `name` parameter is empty        | `400`       |
| `name` is not a string           | `422`       |
| No prediction available for name | `500`       |
| Genderize API unreachable        | `502`       |
| Unexpected server error          | `500`       |

---

## 📁 Project Structure

```
├── src/
│   ├── index.js
│   └── routes/
│       └── index.js
├── package.json
└── README.md
```
