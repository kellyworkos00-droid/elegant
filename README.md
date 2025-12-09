# Elegant Steel Hardware - Fabrication Management System

A comprehensive web application built for Elegant Steel Hardware to manage their fabrication business operations.

## Features

### Authentication & Authorization
- **Login System**: Secure email/password authentication with demo accounts
- **Session Management**: localStorage-based session persistence
- **Role-Based Access**: Different features for Admin and Employee roles
- **Mobile Dashboard**: Icon-based module access on mobile devices (looks like native apps)
- **Protected Routes**: All business operations require authentication via middleware
- **Logout**: Clean session cleanup with secure redirect

### Admin Portal
- **Dashboard**: Real-time overview of active projects, pending quotes, inventory, and employee count with mobile icon grid
- **User Management**: Manage team members, assign roles, and control access permissions
- **Projects Management**: Create, track, and manage fabrication projects with status updates and budgets
- **Orders & Sales**: Create orders, select customers, view/edit/print invoices
- **Customer Statements**: Track customer balances and transaction history
- **Inventory Management**: Track steel materials, supplies, and stock levels with low-stock alerts
- **Client Management**: Maintain client information, contact details, and project history
- **Quotes Management**: Create, send, and track client quotes with status tracking
- **Performance Tracking**: Monitor employee performance metrics, completion rates, quality scores
- **Employee Management**: Manage workforce information and roles
- **Finances**: Track income, expenses, and profit calculations

### Employee Portal
- **My Tasks**: View assigned fabrication tasks and track progress
- **Orders View**: See order status and deadlines
- **Performance Data**: View personal performance metrics
- **Project Status**: View overall project progress and deadlines

### Automated Features
- **Email Notifications**: Automatic emails for user invitations and order confirmations
- **Order Confirmation Emails**: Professional HTML emails sent when orders are created
- **User Invitations**: System sends invitation emails when admin creates new users

## Tech Stack

- **Frontend**: React 18 with Next.js 14 App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **HTTP Client**: Axios

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home/landing page
│   ├── globals.css          # Global styles
│   ├── dashboard/           # Admin dashboard
│   ├── projects/            # Project management
│   ├── inventory/           # Inventory tracking
│   ├── clients/             # Client management
│   ├── quotes/              # Quote management
│   ├── employees/           # Employee management
│   └── my-tasks/            # Employee tasks
├── components/              # Reusable React components
├── lib/                     # Utility functions and helpers
└── types/                   # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3001](http://localhost:3001) in your browser

### Login with Demo Credentials

The system includes demo accounts for testing:

**Admin Account:**
- Email: `admin@elegantsteelhw.com`
- Password: `password123`
- Access: Full system including user management

**Employee Account:**
- Email: `employee@elegantsteelhw.com`
- Password: `password123`
- Access: Limited to work-related modules

### Build for Production

```bash
npm run build
npm run start
```

## How to Use

1. **Login**: Visit the login page with demo credentials
2. **View Dashboard**: After login, you'll see the admin dashboard
3. **Mobile Users**: On mobile devices, modules appear as icon tiles (like mobile apps)
4. **Create Orders**: Use the Orders module to create and manage customer orders
5. **Track Performance**: View employee performance metrics in the Performance module
6. **Manage Users**: Admins can invite new team members via the User Management page
7. **Logout**: Click the logout button in the top-right corner

## Module Overview

- **Orders**: Create orders, select customers, view/print invoices
- **Customer Statements**: Track customer account balances
- **Finances**: Monitor business income and expenses
- **Projects**: Manage fabrication projects
- **Inventory**: Track material stock levels
- **Performance**: Monitor employee performance metrics
- **Tasks**: Assign and track work tasks
- **Users** (Admin): Manage team members and permissions

## Features by Module

### Projects Module
- Create new fabrication projects
- Track project status (Pending, In Progress, Completed)
- Manage project budgets and deadlines
- Assign projects to team members

### Inventory Module
- Track steel materials (plates, angles, tubing, bar stock)
- Monitor stock levels
- Low-stock alerts for materials below minimum threshold
- Warehouse location tracking

### Client Management
- Store client contact information
- Track client activity status (Active/Inactive)
- View project history per client
- Manage client relationships

### Quotes Module
- Generate professional quotes
- Track quote status (Pending, Sent, Accepted)
- Convert quotes to projects
- Archive historical quotes

### Employee Management
- Maintain employee records with roles
- Assign tasks to team members
- Track employee performance
- Manage team schedules

## Default Demo Data

The application comes pre-loaded with sample data for demonstration:
- 12 active projects
- 4 inventory items with stock tracking
- 4 client accounts
- 3 pending quotes
- 4 employees with various roles

## Future Enhancements

- Database integration (PostgreSQL)
- User authentication & authorization
- Advanced reporting and analytics
- PDF quote generation
- Email notifications
- Mobile app
- Real-time collaboration features
- Integration with accounting software

## License

All rights reserved - Elegant Steel Hardware

## Support

For support or feature requests, contact the development team.
