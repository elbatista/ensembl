# Species Assembly Summaries Page (React)

A small React application that consumes the **Ensembl REST API** to display chromosome lengths for a selected species.

The app:
- Fetches available species from Ensembl
- Allows the user to select a species from a dropdown
- Displays chromosomes in **customary karyotype order**
- Shows chromosome lengths in **megabases (Mb)**
- Computes and displays the **total genome length**
- Works on desktop and mobile (responsive CSS)

---

## 📦 Prerequisites

Make sure you have the following installed:

- **Node.js** ≥ 18  
- **npm** ≥ 9  

Check your versions:

```bash
node -v
npm -v
```

---

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

2. **Install dependencies**

```bash
npm install
```

---

## ▶️ Running the app locally

Start the development server:

```bash
npm start
```

The app will be available at:

```
http://localhost:3000
```

---

## 🌐 Ensembl APIs used

This app consumes the following Ensembl REST endpoints:

- **Species list**
  ```
  https://rest.ensembl.org/info/species
  ```

- **Assembly information**
  ```
  https://rest.ensembl.org/info/assembly/{species}
  ```

Only chromosomes (`coord_system === "chromosome"`) are displayed, ordered according to the `karyotype` field returned by the API.

---