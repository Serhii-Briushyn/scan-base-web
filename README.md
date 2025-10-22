# 📦 Scan Base Web

**Scan Base Web** is a browser-based application for tracking and managing material cuts in production.
Built with **React + Vite + Electron + Dexie + TypeScript**, it works **fully offline** in the browser and supports **barcode scanners (Bluetooth/USB)**.

---

## 🚀 Main Features

| Category               | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| 🧾 Material Records    | Scans and stores material data with automatic timestamps                         |
| 🔍 Scanner Integration | Reads barcodes via keyboard emulation and validates scanned data automatically   |
| 💾 Local Database      | Saves all records locally using **IndexedDB (Dexie)** for full offline operation |
| 📊 Daily Archive       | Displays all saved records with date-based filtering                             |
| 📁 Excel Export        | Exports daily data to `.xlsx` files `(materials_DD-MM-YYYY.xlsx)`                |
| 🧠 Error Handling      | Centralized validation and toast-based notifications for better UX               |
| 🔈 Sound Feedback      | Plays short sounds on success or error events                                    |
| 🌙 User Interface      | Clean, minimal UI optimized for scanning workflows                               |

---

## 🏗 Project Structure

```
📦 SCAN-BASE-WEB
│
├── src/
│   ├── features/
│   │   ├── excel/
│   │   │   └── lib/
│   │   │       └── exportDailyXlsx.ts
│   │   └── material/
│   │       ├── components/
│   │       │   └── ScanCapture.tsx
│   │       ├── lib/
│   │       │   ├── errors.ts
│   │       │   ├── messages.ts
│   │       │   └── parse.ts
│   │       └── types/scan.ts
│   │
│   ├── pages/
│   │   └── MainPage/
│   │       ├── components/
│   │       │   ├── RecordsControls.tsx
│   │       │   ├── RecordsSection.tsx
│   │       │   ├── RecordsTable.tsx
│   │       │   └── ScanPanel.tsx
│   │       └── MainPage.tsx
│   │
│   ├── shared/
│   │   ├── db/
│   │   │   └── index.ts
│   │   ├── styles/
│   │   │   ├── fonts.css
│   │   │   ├── globals.css
│   │   │   └── vars.css
│   │   ├── types/
│   │   │   └── material.ts
│   │   └── utils/
│   │       ├── date.ts
│   │       ├── playSound.ts
│   │       └── showErrorToast.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
│
├── public/
│   ├── fonts/
│   └── icons/
│
├── .gitignore
├── eslint.config.mjs
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Quick Start

```ts
type ScanParsed = {
  materialId: string;
  steelGrade: string;
  treatmentCode: string;
  sourceNestingId: string | null;
  thickness: string;
  width: string;
  length: string;
};

type MaterialRecord = {
  id: string;
  date: string;
  material: ScanParsed;
  createdAt: number;
};
```

---

## ⚙️ Quick Start

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Serhii-Briushyn/scan-base-web.git
cd scan-base-web
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Open your browser and navigate to:\
👉 **http://localhost:5173**

### 4️⃣ Build the production version

```bash
npm run build
```

### 5️⃣ Preview the production build locally

```bash
npm run preview
```

---

## 🧠 Scanning Mechanism

`ScanCapture` listens for scanner input and parses valid labels:

```tsx
<ScanCapture ref={scanRef} onParsed={handleParsed} blurOnParsed />
```

- Buffers input until a complete material code is detected
- Parses lines via `parseScanLines()`
- Emits structured data through `onParsed()`
- Handles errors via centralized toast notifications

---

## 🗃 Local Database (Dexie / IndexedDB)

```ts
export const db = new Dexie("scan-base");
db.version(1).stores({ records: "id, date, materialId, createdAt" });

await db.records.add({
  id: crypto.randomUUID(),
  date: ymd(),
  material,
  createdAt: Date.now(),
});
```

- All data stored locally in IndexedDB
- Fully offline — no external server required

---

## 📤 Excel Export (XLSX)

File: `features/excel/lib/exportDailyXlsx.ts`  
Exports all records for the selected day:

```tsx
materials_19-10-2025.xlsx
```

- Auto-generated column headers and formatting
- Includes export timestamp for unique filenames

---

## 🧰 Tech Stack

| Category        | Technologies                    |
| --------------- | ------------------------------- |
| 🧠 Language     | TypeScript                      |
| ⚛️ Frontend     | React + Vite                    |
| 💾 Database     | Dexie (IndexedDB)               |
| 📊 Export       | ExcelJS                         |
| 🔈 UX           | react-hot-toast + sound effects |
| 🎨 Styling      | CSS Modules + global variables  |
| 🧱 Architecture | Feature-based                   |
| 🧩 Typing       | Strict TypeScript               |

---

## 📜 Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start development server  |
| `npm run build`   | Build production version  |
| `npm run preview` | Preview built app locally |

---

## 👤 Author

**Serhii Briushyn** — Full Stack Developer  
📍 Slovakia  
💼 Internal production tool for **NMH s.r.o.**
