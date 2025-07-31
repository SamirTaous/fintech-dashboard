# ASMAS Bank - Modern Fintech Dashboard

![ASMAS Bank Dashboard Showcase](https://github.com/user-attachments/assets/f8ce381f-be05-4e8e-92f0-5eb5fbbdd693)

<p align="center">
  <strong><a href="https://fintech-dashboard-gray.vercel.app">View Live Demo</a></strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="Chakra UI" src="https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakraui&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
</p>

## About This Project

ASMAS Bank is a comprehensive and responsive fintech dashboard built from the ground up to showcase a modern, full-stack development workflow. This is not just a concept; it's a fully functional application designed to demonstrate advanced skills in front-end architecture, UI/UX design, API integration, and back-end simulation.

The project features a complete user journey, from a beautifully designed landing page to a secure, data-rich client dashboard, all powered by a custom-built Express.js mock server.

---

## ✨ Key Features

-   **Secure User Authentication:** A robust login flow with state management via JWT.
-   **Comprehensive Multi-Account Dashboard:** An overview of all financial accounts, including real-time balance summaries and income/expense tracking.
-   **Interactive Data Visualization:** Dynamic charts and graphs built with Recharts and Chart.js to visualize account and money distribution.
-   **Detailed Transaction History:** A filterable and searchable list of all transactions across all accounts.
-   **Card Management Interface:** A dedicated section to view and manage virtual cards linked to accounts.
-   **Full Loan Application System:** A complete module for users to apply for loans and track their application status (Pending, Approved, Rejected).
-   **Fully Responsive Design:** A seamless experience across desktop, tablet, and mobile devices, built with Chakra UI's responsive design system.
-   **Custom Mock API:** A hand-crafted Express.js server that provides realistic, structured data and simulates a real-world RESTful API.

---

## 🛠️ Tech Stack & Tools

| Category      | Technology                                                                                                                                                                                          |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**  | `React.js`, `Vite`, `Chakra UI`, `Axios`, `Framer Motion`, `Recharts`, `Chart.js`, `jwt-decode`                                                                                                         |
| **Backend**   | `Node.js`, `Express.js`, `cors`                                                                                                                                                                     |
| **Tooling**   | `ESLint`, `Prettier`, `npm`                                                                                                                                                                           |
| **Hosting**   | **Frontend:** Vercel/Netlify, **Backend:** Render/Fly.io                                                                                                                                              |

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   Node.js (v18.x or later)
-   npm

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/SamirTaous/fintech-dashboard.git
    cd fintech-dashboard
    ```

2.  **Install Dependencies:**
    This will install packages for both the client and the mock server.
    ```bash
    npm install
    ```

3.  **Run the Application:**
    The most convenient way is to run both the front-end and back-end servers concurrently.
    ```bash
    npm run dev:full
    ```
    This command will:
    -   Start the mock API server on `http://localhost:3001`
    -   Start the React development server on `http://localhost:5173`

4.  **Access the App:**
    Open your browser and navigate to `http://localhost:5173`.

### Demo Credentials

-   **Username:** `demo@asmasbank.com`
-   **Password:** `password` (any password will work)

---

## 🏛️ Project Architecture

The project is structured for scalability and maintainability, with a clear separation of concerns.

<details>
<summary>Click to view project structure</summary>
/  
├── public/ # Static assets (favicon, logos)  
├── src/  
│ ├── api/ # API service layer (Axios)  
│ ├── assets/ # Global styles and images  
│ ├── components/ # Reusable React components (Buttons, Cards, Charts)  
│ ├── pages/ # Page-level components (Dashboard, Login, Landing)  
│ ├── App.jsx # Main application component with routing  
│ └── main.jsx # Application entry point  
├── mock-server.js # Custom Express.js mock server logic  
├── mock-data.json # Realistic sample data for the mock server  
├── .env # Environment variables (VITE_API_URL)  
└── package.json # Project dependencies and scripts


</details>

### Development Decisions

-   **Custom Express Server:** Instead of a simple `db.json`, a custom Express server was built to more accurately simulate a real-world REST API, including custom logic for different endpoints and providing a more robust demonstration of back-end integration skills.
-   **Chakra UI:** Chosen for its excellent out-of-the-box accessibility, component-based styling, and powerful theming capabilities, which allowed for rapid development of a consistent and professional UI.

---

## 📸 Gallery

| Landing Page                                                                                                                       | Login Page                                           |
| :--------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| ![Landing Page](https://github.com/user-attachments/assets/191a68d5-f864-4a64-959a-70f668acd03d)                                   | ![LoginPage](https://i.imgur.com/bEf0g0O.png)        |
| **Dashboard Overview**                                                                                                             | **Transactions Page**                                |
| ![Dashboard Overview](https://github.com/user-attachments/assets/f8ce381f-be05-4e8e-92f0-5eb5fbbdd693)                             | ![TransactionsPage](https://i.imgur.com/lm97aMh.png) |
| **Cards & Loans**                                                                                                                  | **Responsive Design**                                |
| ![Cards](https://github.com/user-attachments/assets/bd3d8a9a-1fdb-43d9-964b-085532fe1761)![Loans](https://i.imgur.com/Uzz5BHy.png) | ![ResponsiveDesign](https://i.imgur.com/2Vsp50k.png) |

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.