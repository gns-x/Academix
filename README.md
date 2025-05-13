# ✨ AcademiX - The Future of School Management


[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](link_to_your_ci) <!-- Example badge -->
[![License](https://img.shields.io/github/license/gns-x/academix)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/gns-x/academix)](https://github.com/gns-x/academix/graphs/contributors)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%2CNestJS%2CTypeScript%2CPostgreSQL-blueviolet)](https://github.com/gns-x/academix)

AcademiX is a cutting-edge, open-source school management system designed to streamline administrative tasks, enhance communication, and foster a more connected educational environment. Built with modern, robust technologies, it offers a comprehensive suite of tools for managing students, teachers, finances, services, and families efficiently and effectively.

---

## 🚀 Why AcademiX?

In today's dynamic educational landscape, managing a school requires more than just tracking data. It demands intelligent systems that simplify complexity, save valuable time, and enable institutions to focus on what truly matters: education. AcademiX provides:

*   **Centralized Data:** A single source of truth for all school operations.
*   **Automation:** Reduce manual tasks with automated processes like billing and reminders.
*   **Improved Communication:** Tools to connect students, teachers, guardians, and administration.
*   **Scalability:** Built with modern frameworks ready to grow with your institution.
*   **Modern User Experience:** Intuitive interfaces for all user roles.

---

## ✨ Key Features

AcademiX offers a powerful set of modules to cover every facet of school administration:

### 🎓 Student Lifecycle Management
*   **Comprehensive Profiles:** Detailed records including demographics, medical information, documents, and communication history.
*   **Academic Tracking:** Manage grades, transcripts, progress reports, and academic history.
*   **Attendance Monitoring:** Efficiently record, track, and report student attendance.
*   **Service Enrollment:** Seamlessly manage student sign-ups for extra-curricular activities, transportation, etc.
*   **Behavioral Incidents:** Log and track disciplinary records.

### 💰 Financial Operations & Billing
*   **Automated Fee Management:** Define fee structures, calculate dues automatically.
*   **Flexible Payment Processing:** Support various payment methods and track transactions.
*   **Invoice & Receipt Generation:** Generate professional financial documents.
*   **Payment Plans & Reminders:** Configure installment plans and send automated reminders.
*   **Financial Reporting:** Generate insightful reports on revenue, outstanding balances, etc.

### 📚 Service & Activity Management
*   **Customizable Service Offerings:** Define and manage various services (e.g., bus routes, cafeteria, clubs).
*   **Enrollment & Capacity Tracking:** Manage sign-ups and monitor service capacity.
*   **Automated Billing Integration:** Link service usage directly to financial billing.
*   **Usage Analytics:** Track participation and resource allocation for services.

### 👨‍👩‍👧 Family & Guardian Engagement
*   **Family Tree Visualization:** Understand complex family structures and relationships.
*   **Guardian Portals:** Dedicated access for parents/guardians to view student progress, attendance, financials, and communicate.
*   **Emergency Contacts:** Centralized system for managing critical contact information.
*   **Communication Hub:** Tools for school-to-family communication preferences.

### 👩‍🏫 Teacher & Staff Empowerment
*   **Detailed Profiles:** Manage qualifications, certifications, and professional development.
*   **Class & Course Assignment:** Easily assign teachers to subjects and classes.
*   **Performance & Evaluation:** Track teacher performance and development goals.
*   **Schedule Management:** Manage teacher timetables and availability.
*   **Exam & Grading Tools:** Facilitate the creation, management, and grading of exams and assignments.

---

## 💻 Technology Stack

AcademiX is built using a modern, robust, and scalable technology stack:

*   **Frontend:**
    *   **React 18:** A leading JavaScript library for building dynamic user interfaces.
    *   **TypeScript:** Adds static typing for improved code quality and maintainability.
    *   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
    *   **Lucide React:** Beautiful, open-source icons.
    *   **React Router DOM:** Declarative routing for React applications.
    *   **React Hook Form:** Performant, flexible, and extensible forms with easy-to-use validation.
    *   **Zod:** TypeScript-first schema declaration and validation library.
    *   **Axios:** Promise-based HTTP client for the browser and node.js.

*   **Backend:**
    *   **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.
    *   **TypeScript:** Ensures type safety and enhances developer experience.
    *   **Prisma (ORM):** A modern database toolkit that makes databases easy. Provides type-safe database access.
    *   **PostgreSQL:** A powerful, open-source relational database system known for reliability and robustness.
    *   **JWT Authentication:** Secure, stateless authentication using JSON Web Tokens.
    *   **Class Validator & Class Transformer:** For elegant data validation and transformation in NestJS.

*   **Database & Realtime:**
    *   **PostgreSQL with Prisma:** Provides a reliable, scalable, and type-safe data layer.
    *   **Supabase:** Utilized for real-time features (like notifications, live updates) adding a dynamic element to the application.

---

## 📦 Getting Started

Follow these steps to get AcademiX up and running on your local machine.

### Prerequisites
Make sure you have the following installed:
*   Node.js (v18 or higher)
*   npm or yarn
*   PostgreSQL server running

### Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install # or yarn install

# Copy environment variables file
cp .env.example .env

# --- Configure your .env file now ---
# Update DATABASE_URL with your PostgreSQL connection string
# Generate a strong JWT_SECRET (e.g., using `node -e "console.log(crypto.randomBytes(32).toString('hex'))"`)

# Generate Prisma client and run migrations
npm run prisma:generate # or yarn prisma:generate
npm run prisma:migrate dev # or yarn prisma:migrate dev
# NOTE: `dev` is for development; adjust for production setup if needed.

# Start the backend server in development mode
npm run start:dev # or yarn start:dev
```
The backend should now be running at `http://localhost:3000` (or the PORT specified in your `.env`).

### Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install # or yarn install

# Copy environment variables file
cp .env.example .env

# --- Configure your .env file now ---
# Update VITE_API_URL to point to your backend (e.g., http://localhost:3000)
# Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY if using Supabase realtime features

# Start the frontend development server
npm run dev # or yarn dev
```
The frontend should now be running at `http://localhost:5173` (or the port indicated by your vite server).

---

## 🔧 Configuration

Environment variables are crucial for configuring AcademiX. Refer to the `.env.example` files in both `backend` and `frontend` directories.

#### Backend (`backend/.env`)
```env
NODE_ENV=development # or production
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/academix?schema=public" # Ensure schema is correct
JWT_SECRET="your_super_secret_key_replace_me" # **CRITICAL: Replace with a strong unique secret**
# Optional: Add configurations for email services, file storage, etc.
```

#### Frontend (`frontend/.env`)
```env
NODE_ENV=development # or production
VITE_API_URL="http://localhost:3000/api" # Ensure this matches your backend API endpoint
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL" # Required if using Supabase realtime
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_PUBLIC_KEY" # Required if using Supabase realtime
# Optional: Add configurations for feature flags, external service keys, etc.
```

---

## 📊 Database Schema Overview

AcademiX utilizes a well-structured relational database design centered around core educational entities. The schema includes tables for:

*   `Student`: Core student information, linking to academics, finances, family, etc.
*   `Teacher`: Staff profiles, qualifications, and assignments.
*   `Guardian`: Parent/Guardian information and relationships to students.
*   `Family`: Groups guardians and their related students.
*   `Course`/`Subject`: Defines academic offerings.
*   `Class`: Instances of courses for specific groups of students.
*   `Enrollment`: Links students to classes and services.
*   `Service`: Definitions of non-academic services (transport, clubs, etc.).
*   `FeeType`/`FeeAssignment`: Defines and assigns fees.
*   `Invoice`/`Payment`/`Transaction`: Handles financial tracking and processing.
*   `AttendanceRecord`: Logs student attendance.
*   `Grade`/`AcademicRecord`: Stores student performance data.
*   `User`: Authentication layer, linked to roles (Admin, Teacher, Guardian, etc.).

*(Suggestion: Consider adding a link to a database schema diagram or generating one and including it here later!)*

---

## 🔐 Security Measures

Security is a top priority for AcademiX, implementing multiple layers of protection:

*   **JWT Authentication:** Securely verifies user identity for API access.
*   **Role-Based Access Control (RBAC):** Ensures users only access resources permitted by their role (e.g., teachers see their students, guardians see their children).
*   **Password Hashing:** User passwords are encrypted using strong, industry-standard algorithms (bcrypt).
*   **Input Validation & Sanitization:** Prevents injection attacks by cleaning and validating all user input.
*   **CORS Protection:** Configured to restrict access from unauthorized domains.
*   **Rate Limiting:** Protects against brute-force attacks on authentication endpoints.
*   **SQL Injection Prevention:** Achieved by using Prisma ORM, which automatically parametrizes queries.

---

## 🚀 Deployment

Deploying AcademiX involves building both the frontend and backend applications.

### Backend Deployment
1.  Build the production-ready backend code:
    ```bash
    cd backend
    npm run build # or yarn build
    ```
2.  Ensure your production `.env` file is correctly configured (especially `DATABASE_URL`, `JWT_SECRET`, and `NODE_ENV=production`).
3.  Start the production server. This typically involves using a process manager like PM2 or deploying to a cloud service (e.g., Heroku, AWS, Google Cloud, DigitalOcean) that runs the build output:
    ```bash
    npm run start:prod # or yarn start:prod
    ```
    This command runs `node dist/main.js`.

### Frontend Deployment
1.  Build the production-ready frontend code:
    ```bash
    cd frontend
    npm run build # or yarn build
    ```
2.  This command creates a `dist` folder in your `frontend` directory containing the static production files.
3.  Deploy the contents of the `dist` folder to any static hosting provider (e.g., Netlify, Vercel, GitHub Pages, S3). Ensure your hosting is configured for a Single Page Application (SPA), redirecting all traffic to `index.html`. Make sure the `VITE_API_URL` and Supabase variables in the frontend `.env` are set for your *production* backend and Supabase instances.

---

## 🤝 Contributing

We welcome contributions to make AcademiX even better! Whether it's reporting bugs, suggesting features, writing documentation, or submitting code, your help is appreciated.

1.  **Fork** the repository.
2.  **Clone** your forked repository: `git clone https://github.com/[YourUsername]/academix.git`
3.  **Create a new branch:** `git checkout -b feature/your-feature-name` or `git checkout -b fix/bug-description`
4.  **Make your changes** and **commit** them with clear messages (`git commit -m 'feat: Add amazing feature'` or `git commit -m 'fix: Resolve login issue'`). Use conventional commits if possible.
5.  **Push** your changes to your fork: `git push origin feature/your-feature-name`
6.  **Open a Pull Request** from your branch to the `main` branch of the original repository.
7.  Describe your changes thoroughly in the Pull Request template.

Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) (Create this file!) for more detailed guidelines.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

*   **Hamza Hadioui** - *Initial Work & Project Lead* - [GitHub](https://github.com/gns-x) 

---

## 🙏 Acknowledgments

*   Huge thanks to the creators and maintainers of the open-source technologies used in this project (React, NestJS, Prisma, PostgreSQL, Tailwind CSS, etc.).
*   Inspiration from existing school management solutions and community feedback.
*   All contributors who help improve AcademiX!
