# 🏠 HostelVoice - Smart Hostel Management System

A comprehensive full-stack hostel management solution with **Next.js 16** frontend, **Express.js** backend API, and **Supabase** database. Features secure role-based authentication, real-time issue tracking, announcements, lost & found management, and analytics dashboard.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-green)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

---

## ✨ Features

### 🔐 Authentication & Authorization

- **Role-based access control** (Student, Caretaker, Admin)
- Secure authentication with Supabase Auth
- **User approval system** - Admins approve student/caretaker registrations
- Protected routes with automatic redirects
- Session management with automatic refresh

### 👥 User Roles

#### 🎓 Student

- Report and track issues
- View announcements
- Post/search lost & found items
- Personal dashboard

#### 🛠️ Caretaker

- Manage and resolve issues
- Create announcements
- Manage lost & found items
- View resident information

#### 👔 Admin

- Comprehensive analytics
- User management
- System-wide announcements
- Audit logs and reporting

### 🎯 Core Modules

- **📋 Issue Tracking** - Report, assign, and resolve hostel issues with priority levels and status tracking
  - View detailed issue information with modal dialogs
  - Category-based filtering (maintenance, cleaning, security, facilities, other)
  - Priority management (low, medium, high, urgent)
  - Role-based issue visibility and assignment

- **📢 Announcements** - Create and manage announcements with audience targeting
  - Target specific audiences (all, students, staff)
  - Pin important announcements
  - Full CRUD operations with role-based permissions
  - Real-time updates across all connected users

- **🔍 Lost & Found** - Comprehensive lost and found item management
  - Report lost or found items with detailed information
  - Track location (location_lost/location_found/current_location)
  - Date tracking with datetime precision
  - Contact information for reporters
  - Category-based organization (wallet, electronics, bags, keys, documents, clothing, other)
  - Status tracking (open, claimed, returned, closed)
  - Smart matching notifications for potential matches
  - All students can view all items for better recovery chances

- **👥 Resident Management** - Role-based student information access
  - Students: View only their own profile
  - Caretakers: View all students in their assigned hostel
  - Admins: View all students across all hostels
  - Search and filter capabilities
  - Approval status tracking

- **📊 Analytics** - Comprehensive data-driven insights
  - Real-time statistics for issues, announcements, and items
  - Role-specific dashboards with relevant metrics
  - Visual charts and graphs (powered by Recharts)
  - Export capabilities for reporting

- **🔔 Notifications** - In-app notification system
  - Real-time updates for issue assignments
  - Lost item match notifications
  - Announcement alerts
  - Action-based notifications

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Supabase account

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd HostelVoice
```

2. **Install frontend dependencies**

```bash
npm install
```

3. **Install backend dependencies**

```bash
cd backend
npm install
cd ..
```

4. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your credentials from Settings → API
   - Copy your Service Role key (for backend) from Settings → API → Service Role

5. **Configure environment variables**

   **Frontend (.env.local in root directory):**

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   **Backend (backend/.env):**

   ```bash
   PORT=3001
   SUPABASE_URL=your_project_url
   SUPABASE_SERVICE_KEY=your_service_role_key
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

6. **Set up database**
   - Open Supabase SQL Editor
   - Run `supabase-schema.sql` to create all tables
   - Run `approval-system-schema.sql` for user approval system

7. **Start backend server**

```bash
cd backend
npm run dev
```

8. **Start frontend server (in new terminal)**

```bash
npm run dev
```

9. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3001](http://localhost:3001)
   - **Register an admin account first** (auto-approved)
   - Then register student/caretaker accounts (admin approval required)

**📖 For detailed setup instructions, see [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)**

---

## 📚 Documentation

Comprehensive documentation is available:

### Getting Started

- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Quick overview of what's been implemented
- **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Step-by-step setup verification
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Cheat sheet for common tasks

### In-Depth Guides

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Complete Supabase configuration guide
- **[AUTH_README.md](./AUTH_README.md)** - Authentication system documentation
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Code organization and architecture

### Reference

- **[SQL_COMMANDS_REFERENCE.md](./SQL_COMMANDS_REFERENCE.md)** - Database queries and schema
- **[.env.example](./.env.example)** - Environment variables template

---

## 🏗️ Tech Stack

### Frontend

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible UI components
- **[Lucide Icons](https://lucide.dev/)** - Modern icon library
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Backend API

- **[Express.js 4.21](https://expressjs.com/)** - Fast, minimalist web framework
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe backend code
- **[Zod](https://zod.dev/)** - Request validation schemas
- **Centralized API Architecture**:
  - RESTful API endpoints at `http://localhost:3001`
  - JWT-based authentication middleware
  - Role-based access control (RBAC)
  - Automatic error handling and logging
  - Request validation with Zod schemas
  - Audit logging service
  - Notification service

### Database & Auth

- **[Supabase](https://supabase.com/)** - Backend as a Service
  - **PostgreSQL Database** - Powerful relational database
  - **Supabase Auth** - Authentication and user management
  - **Row Level Security (RLS)** - Database-level access control
  - **Supabase Admin Client** - Backend uses service role for full access
  - **Real-time subscriptions** - Live data updates
  - **Storage** - File upload capabilities

### Architecture Pattern

- **Backend-First Design**: All database operations go through Express.js API
- **Centralized API Client** (`lib/api.ts`): Type-safe API functions with automatic JWT injection
- **No Direct Database Calls**: Frontend never calls Supabase directly (except auth)
- **Role-Based Filtering**: Backend controllers handle all permission logic
- **Type Safety**: Shared TypeScript interfaces between frontend and backend

### Development Tools

- **[npm](https://www.npmjs.com/)** - Package manager
- **[ESLint](https://eslint.org/)** - Code linting
- **[tsx](https://github.com/esbuild-kit/tsx)** - TypeScript execution for backend
- **[Nodemon](https://nodemon.io/)** - Backend hot reload
- **[Vercel Analytics](https://vercel.com/analytics)** - Usage analytics

---

## 📁 Project Structure

```
HostelVoice/
├── app/                          # Next.js App Router (Frontend)
│   ├── login/                   # Login page
│   ├── register/                # Registration pages
│   │   ├── student/            # Student registration
│   │   ├── caretaker/          # Caretaker registration
│   │   └── admin/              # Admin registration
│   ├── dashboard/              # Protected dashboard
│   │   ├── page.tsx           # Main dashboard (role-specific)
│   │   ├── analytics/         # Analytics page (admin only)
│   │   ├── announcements/     # View announcements
│   │   ├── announcements-manage/ # Manage announcements (staff)
│   │   ├── issues/            # Issue tracking
│   │   ├── lost-found/        # Lost & Found management
│   │   ├── residents/         # Resident information
│   │   ├── management/        # Hostel management (admin)
│   │   └── user-approvals/    # Approve users (admin)
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
│
├── backend/                      # Express.js Backend API
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   │   ├── announcements.controller.ts
│   │   │   ├── issues.controller.ts
│   │   │   ├── lostfound.controller.ts
│   │   │   ├── residents.controller.ts
│   │   │   └── admin.controller.ts
│   │   ├── routes/             # API routes
│   │   │   ├── announcements.routes.ts
│   │   │   ├── issues.routes.ts
│   │   │   ├── lostfound.routes.ts
│   │   │   ├── residents.routes.ts
│   │   │   └── admin.routes.ts
│   │   ├── middleware/         # Custom middleware
│   │   │   ├── auth.middleware.ts    # JWT verification
│   │   │   ├── error.middleware.ts   # Error handling
│   │   │   └── index.ts
│   │   ├── services/           # Business logic
│   │   │   ├── audit.service.ts
│   │   │   └── notification.service.ts
│   │   ├── utils/              # Utilities
│   │   │   ├── validators.ts   # Zod schemas
│   │   │   └── response.ts     # Response helpers
│   │   ├── config/             # Configuration
│   │   │   └── supabase.ts     # Supabase admin client
│   │   └── index.ts            # Express app entry
│   ├── package.json
│   └── .env                    # Backend environment variables
│
├── components/                   # React Components
│   ├── theme-provider.tsx
│   └── ui/                      # Shadcn UI components (40+ components)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── table.tsx
│       └── ... (and more)
│
├── lib/                         # Frontend Utilities
│   ├── api.ts                  # Centralized API client with typed functions
│   ├── auth-context.tsx        # React Context for authentication
│   ├── utils.ts                # Helper functions
│   └── supabase/               # Supabase clients
│       ├── client.ts           # Browser client (auth only)
│       ├── server.ts           # Server component client
│       └── middleware.ts       # Auth middleware
│
├── hooks/                       # Custom React Hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── public/                      # Static Assets
│   └── logo/                   # Application logos
│
├── styles/
│   └── globals.css             # Global CSS styles
│
├── Database Schemas:
├── supabase-schema.sql         # Main database schema
├── approval-system-schema.sql  # User approval system
│
├── Documentation:
├── README.md                    # This file
├── AUTH_README.md              # Authentication documentation
├── SUPABASE_SETUP.md           # Supabase setup guide
├── PROJECT_STRUCTURE.md        # Detailed project structure
│
├── Configuration:
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── components.json             # Shadcn UI configuration
├── middleware.ts               # Next.js middleware (auth)
└── package.json                # Frontend dependencies
```

---

## 🗄️ Database Schema

### Core Tables

#### 1. **users** - User Profiles and Authentication

- Stores all user information with role-based fields
- Fields: `id`, `email`, `full_name`, `phone_number`, `role`, `hostel_name`, `room_number`, `student_id`, `approval_status`, `created_at`, `updated_at`
- Roles: `student`, `caretaker`, `admin`
- Approval system: New users require admin approval (except admins)
- Used by residents API for role-based filtering

#### 2. **issues** - Issue/Complaint Tracking

- Complete issue management system
- Fields: `id`, `title`, `description`, `category`, `priority`, `status`, `reported_by`, `assigned_to`, `location`, `created_at`, `updated_at`, `resolved_at`
- Categories: `maintenance`, `cleaning`, `security`, `facilities`, `other`
- Priorities: `low`, `medium`, `high`, `urgent`
- Status flow: `open` → `in_progress` → `resolved` / `closed`

#### 3. **announcements** - System Announcements

- Broadcast important updates to users
- Fields: `id`, `title`, `content`, `target_audience`, `created_by`, `is_pinned`, `created_at`, `updated_at`
- Target audiences: `all`, `students`, `staff`
- Pin important announcements to top
- Full CRUD with role-based permissions

#### 4. **lost_found** - Lost and Found Items

- Comprehensive item tracking with datetime precision
- Fields:
  - Basic: `id`, `item_name`, `description`, `category`, `type`
  - Location: `location_lost`, `location_found`, `current_location`
  - Dates: `date_lost`, `date_found`, `claimed_at` (ISO datetime format)
  - Contact: `contact_info`, `notes`
  - Status: `status` (open, claimed, returned, closed)
  - Relations: `reported_by`, `claimed_by`
  - Timestamps: `created_at`, `updated_at`
- Categories: `wallet`, `electronics`, `bags`, `keys`, `documents`, `clothing`, `other`
- Type: `lost` or `found`
- All students can view all items for better recovery
- Smart matching system notifies users of potential matches

#### 5. **residents** - Extended Student Information

- Additional information for students
- Fields: `id`, `user_id`, `guardian_name`, `guardian_phone`, `guardian_email`, `permanent_address`, `blood_group`
- Linked to users table via foreign key

#### 6. **notifications** - User Notifications

- In-app notification system
- Fields: `id`, `user_id`, `title`, `message`, `type`, `is_read`, `created_at`
- Types: `issue_assigned`, `announcement`, `lost_found_match`, etc.

#### 7. **audit_logs** - Action Tracking

- Complete audit trail for accountability
- Fields: `id`, `user_id`, `action`, `entity_type`, `entity_id`, `old_data`, `new_data`, `ip_address`, `user_agent`, `created_at`
- Tracks all CRUD operations
- Stores before/after state for data changes

### Database Features

✅ **Row Level Security (RLS)** - Database-level access control policies  
✅ **Proper Indexes** - Optimized queries for performance  
✅ **Foreign Key Relationships** - Data integrity enforcement  
✅ **Automatic Timestamps** - `created_at` and `updated_at` managed by triggers  
✅ **Check Constraints** - Valid enum values enforced at DB level  
✅ **Cascading Deletes** - Proper cleanup of related records

### API Architecture

**Backend-First Approach:**

- Frontend NEVER calls Supabase directly (except for auth)
- All data operations go through Express.js API at `localhost:3001`
- Backend uses Supabase Admin client for full database access
- Role-based filtering implemented in controllers
- Type-safe API client in `lib/api.ts` with automatic JWT injection

**Example: Residents API Flow**

```typescript
// Frontend calls centralized API
const residents = await residentsApi.getAll(page, limit);

// Backend controller handles role-based logic
// - Students: See only their own record
// - Caretakers: See students in their hostel
// - Admins: See all students
```

**See [supabase-schema.sql](./supabase-schema.sql) for complete schema**

---

## 🔐 Security

- ✅ **Row Level Security (RLS)** - Database-level access control
- ✅ **Password hashing** - Secure password storage via Supabase
- ✅ **Role-based access** - Users can only access permitted resources
- ✅ **Protected routes** - Middleware guards all dashboard pages
- ✅ **Session management** - Automatic token refresh
- ✅ **Environment variables** - Sensitive data never committed

---

## 🧪 Testing

### Create Test Users

```bash
# Start dev server
pnpm dev

# Register test users at http://localhost:3000/register
# IMPORTANT: Register admin first, then approve other accounts

# Admin (auto-approved):
Admin: admin@hostelvoice.com / password123

# Student/Caretaker (need admin approval):
Student: student@hostelvoice.com / password123
Caretaker: caretaker@hostelvoice.com / password123
```

### Verify Setup

Follow the checklist in [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md)

---

## 📦 Build & Deploy

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

---

## 🛠️ Development

### Available Scripts

**Frontend:**

```bash
npm run dev       # Start Next.js development server (localhost:3000)
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

**Backend:**

```bash
cd backend
npm run dev       # Start Express.js with hot reload (localhost:3001)
npm run build     # Compile TypeScript to JavaScript
npm start         # Start production server
```

### Development Workflow

1. **Start Backend First:**

   ```bash
   cd backend
   npm run dev
   ```

   Backend runs on `http://localhost:3001`

2. **Start Frontend (new terminal):**

   ```bash
   npm run dev
   ```

   Frontend runs on `http://localhost:3000`

3. **Both servers must be running for the app to work**

### API Development

**Adding a New API Endpoint:**

1. Create controller in `backend/src/controllers/`
2. Add route in `backend/src/routes/`
3. Add validation schema in `backend/src/utils/validators.ts`
4. Add API function in `lib/api.ts` (frontend)
5. Add TypeScript interface in `lib/api.ts`

**Example:**

```typescript
// backend/src/controllers/example.controller.ts
export class ExampleController {
  static async getData(req: Request, res: Response) {
    const user = req.user!; // From auth middleware
    const data = validate(exampleSchema, req.body);
    // ... implement logic
    sendSuccess(res, "Success", result);
  }
}

// lib/api.ts (frontend)
export const exampleApi = {
  getData: (params: ExampleParams) =>
    apiGet<ExampleResponse>("/api/example", params),
};
```

### Database Development

```bash
# Access Supabase Dashboard at app.supabase.com
# SQL Editor: Run custom queries and migrations
# Table Editor: View/edit data directly
# Authentication: Manage users and sessions
# Database: Monitor performance and connections
```

### Debugging

**Backend Logs:**

- All API requests logged to console
- Error stack traces shown in development
- Audit logs written to database

**Frontend Logs:**

- Network requests visible in browser DevTools
- React components use `console.log` for debugging
- Toast notifications for user feedback

---

## 🎨 Customization

### Add New User Role

1. Update `UserRole` type in `lib/auth-context.tsx`
2. Update database check constraint in `supabase-schema.sql`
3. Add RLS policies for the new role
4. Update UI to show role option

### Modify User Fields

1. Update `User` interface in `lib/auth-context.tsx`
2. Update database `users` table schema
3. Update registration forms

### Change Theme

Edit `app/globals.css` for global styles or modify Tailwind config.

---

## 🐛 Troubleshooting

### Common Issues

**"Cannot connect to API" / "Network Error"**

- Ensure backend server is running: `cd backend && npm run dev`
- Check backend is on port 3001: `http://localhost:3001`
- Verify `NEXT_PUBLIC_API_URL=http://localhost:3001` in `.env.local`
- Check backend terminal for error messages

**"Invalid API credentials" / "Unauthorized"**

- Frontend: Check `.env.local` has correct Supabase ANON key
- Backend: Check `backend/.env` has correct SUPABASE_SERVICE_KEY
- Verify JWT_SECRET matches between frontend and backend
- Clear browser localStorage and login again
- Restart both servers after changing env variables

**"Table does not exist"**

- Run `supabase-schema.sql` in Supabase SQL Editor
- Run `approval-system-schema.sql` for user approvals
- Check Supabase dashboard → Database → Tables

**"Permission denied" / "403 Forbidden"**

- Check Row Level Security policies in Supabase
- Verify user role matches expected permissions
- Backend uses service role key (bypasses RLS)
- Frontend should never call Supabase directly for data

**"Failed to fetch residents" / Data not loading**

- Ensure you're calling the API through `lib/api.ts`
- Never use `supabase.from()` directly in frontend (except auth)
- Check backend controller implements role-based filtering
- Verify backend route has correct middleware (`authMiddleware`)

**Backend build errors**

- Run `npm install` in backend directory
- Check TypeScript version compatibility
- Verify all imports are correct

**Date/Time validation errors (Lost & Found)**

- Backend expects ISO datetime: `"2026-01-21T00:00:00.000Z"`
- Frontend must use `.toISOString()` when sending dates
- Never send plain date strings like `"2026-01-21"`

**Port already in use**

- Frontend (3000): `npx kill-port 3000`
- Backend (3001): `npx kill-port 3001`
- Or change PORT in `backend/.env`

**More help:** See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) and [AUTH_README.md](./AUTH_README.md)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful UI Components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
- [Vercel](https://vercel.com/) - Deployment Platform

---

## 📞 Support

- **Documentation**: Check the `*.md` files in the project root
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Supabase Help**: [Discord](https://discord.supabase.com)
- **Next.js Help**: [Documentation](https://nextjs.org/docs)

---

## 🗺️ Roadmap

### Current Version (v1.0) ✅

- ✅ Full-stack architecture with Express.js backend
- ✅ User authentication with role-based access control
- ✅ Centralized API pattern (backend-only database access)
- ✅ Complete issue tracking system with view details modal
- ✅ Announcements with targeting and pinning
- ✅ Comprehensive Lost & Found with datetime tracking
  - ✅ Smart location handling (lost/found/current)
  - ✅ Date precision (ISO datetime format)
  - ✅ Contact information and notes
  - ✅ All students can view all items
- ✅ Role-based resident management
  - ✅ Students: Self-view only
  - ✅ Caretakers: Hostel-specific view
  - ✅ Admins: All students
- ✅ Analytics dashboard with role-specific metrics
- ✅ User approval system for new registrations
- ✅ Audit logging for all critical actions
- ✅ Type-safe API with TypeScript across stack

### Upcoming Features

- [ ] **File Upload System**
  - [ ] Image upload for lost & found items
  - [ ] Attachment support for issues
  - [ ] Integration with Supabase Storage
- [ ] **Real-time Features**
  - [ ] Live notifications using WebSockets
  - [ ] Real-time issue status updates
  - [ ] Live announcement broadcasting
- [ ] **Email Notifications**
  - [ ] Welcome emails for new users
  - [ ] Issue assignment notifications
  - [ ] Lost item match alerts
  - [ ] Announcement digests
- [ ] **Enhanced Analytics**
  - [ ] Issue resolution time tracking
  - [ ] User activity heatmaps
  - [ ] Export reports to PDF/Excel
  - [ ] Trend analysis and predictions
- [ ] **Advanced Features**
  - [ ] Mobile app (React Native)
  - [ ] Payment integration for hostel rent
  - [ ] Visitor management system
  - [ ] Room allocation and transfer system
  - [ ] Complaint escalation workflow
  - [ ] Multi-language support
- [ ] **Performance Optimization**
  - [ ] Redis caching layer
  - [ ] Database query optimization
  - [ ] CDN for static assets
  - [ ] Progressive Web App (PWA) features

---

## 📊 Screenshots

### Landing Page

Modern, responsive landing page with role selection.

### Dashboard

Role-specific dashboards with relevant features and analytics.

### Issue Management

Report, track, and resolve hostel issues efficiently.

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">

**Built with ❤️ for better hostel management**

[Documentation](./SUPABASE_SETUP.md) • [Quick Start](./QUICK_REFERENCE.md) • [Report Bug](https://github.com/your-repo/issues) • [Request Feature](https://github.com/your-repo/issues)

</div>
