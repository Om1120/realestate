# 🏰 Aurelia Estates — Luxury Real Estate Web Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Website-success?style=for-the-badge&logo=vercel&logoColor=white)](https://realestate-two-gray.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Om1120/realestate)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.12.0-764ABC?style=flat&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

> **Aurelia Estates** is a modern, high-performance luxury real estate web platform showcasing premier residential and commercial properties across major Indian metropolitan areas including Mumbai, Ahmedabad, Bengaluru, and Delhi.

---

## 🌐 Live Website Links

- **Primary Live URL**: [https://realestate-two-gray.vercel.app](https://realestate-two-gray.vercel.app)
- **Alternative URL**: [https://realestate-om1120s-projects.vercel.app](https://realestate-om1120s-projects.vercel.app)
- **Source Code**: [https://github.com/Om1120/realestate](https://github.com/Om1120/realestate)

---

## ✨ Features

- 🏡 **Luxury Property Showcase**: Browse curated listings including apartments, penthouses, luxury villas, and commercial spaces.
- 🔍 **Advanced Filtering & Search**: Instant filtering by city/location, property type, price range, bedrooms, and amenities.
- ❤️ **Saved Favourites / Wishlist**: Persisted favorites list managed via Redux Toolkit with quick access.
- 📅 **Schedule Tour & Inquiry Booking**: Interactive appointment scheduling and inquiry modals with Formik & Yup validation.
- 🛡️ **Admin Portal & Management**: Dedicated administrative console to create, update, and manage property listings and inquiries.
- 📊 **Market Insights & Analytics**: Real-time interactive charts powered by Chart.js & React-Chartjs-2.
- 📱 **Responsive & Clean UI**: Elegant luxury typography, smooth micro-interactions, preloader animations, and modern layout.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router DOM v7
- **State Management**: Redux Toolkit & React-Redux
- **Styling**: Modern CSS with luxury design tokens & responsive grids
- **Form Handling & Validation**: Formik, Yup
- **Charts & Visualizations**: Chart.js, React-Chartjs-2
- **Icons**: Lucide React & Font Awesome 6
- **Build Tool**: Vite 8 with HMR & Oxlint
- **Hosting & CI/CD**: Vercel

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Om1120/realestate.git
   cd realestate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```text
├── public/                 # Static assets
├── src/
│   ├── api/                # API and mock data services
│   ├── assets/             # Images and local media
│   ├── components/         # Reusable UI components (Navbar, Footer, Cards, Forms)
│   ├── data/               # Properties, agents, and testimonials datasets
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Page layouts & structure
│   ├── pages/              # App pages (Home, Properties, Details, Admin, About, Contact)
│   ├── redux/              # Redux slices (auth, favorites, properties, ui)
│   ├── routes/             # App routing configuration
│   ├── schemas/            # Yup validation schemas
│   ├── utils/              # Helper utilities
│   ├── App.jsx             # Main Application root
│   └── main.jsx            # Entry point
├── index.html              # HTML shell & font definitions
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
