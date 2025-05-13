# AcademiX - School Management System

AcademiX is a comprehensive school management system built with modern web technologies. It provides a robust platform for managing students, teachers, finances, services, and family relationships within an educational institution.

## 🌟 Features

### Student Management
- Complete student profile management
- Academic record tracking
- Attendance monitoring
- Service enrollment system
- Financial record keeping

### Financial Management
- Fee management and tracking
- Payment processing
- Financial reporting
- Invoice generation
- Payment history tracking

### Service Management
- Customizable service offerings
- Service enrollment tracking
- Billing cycle management
- Automated payment reminders
- Service usage analytics

### Family & Guardian Management
- Comprehensive family tree visualization
- Guardian profile management
- Emergency contact system
- Communication preferences
- Relationship tracking

### Teacher Management
- Teacher profiles and qualifications
- Class assignment
- Performance tracking
- Schedule management
- Exam management

## 🛠 Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- React Router DOM
- React Hook Form
- Zod (for validation)
- Axios

### Backend
- NestJS
- TypeScript
- Prisma (ORM)
- PostgreSQL
- JWT Authentication
- Class Validator
- Class Transformer

### Database
- PostgreSQL with Prisma
- Supabase for real-time features

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env # Configure your environment variables
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env # Configure your environment variables
npm run dev
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/academix"
JWT_SECRET="your-jwt-secret"
PORT=3000
```

#### Frontend (.env)
```env
VITE_API_URL="http://localhost:3000"
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-key"
```

## 🚀 Deployment

### Backend Deployment
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start:prod
```

### Frontend Deployment
1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

## 📊 Database Schema

The system uses a comprehensive database schema including:
- Students
- Parents/Guardians
- Teachers
- Services
- Payments
- Enrollments
- Transactions
- Academic Records

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting
- SQL injection prevention through Prisma

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Hamza Hadioui** - *Initial work* - [HamzaHadioui](https://github.com/gns-x)

## 🙏 Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
