# Elegant Steel Hardware - Fabrication Management System

A comprehensive web application built for Elegant Steel Hardware to manage their fabrication business operations.

## Features

### Admin Portal
- **Dashboard**: Real-time overview of active projects, pending quotes, inventory, and employee count
- **Projects Management**: Create, track, and manage fabrication projects with status updates and budgets
- **Inventory Management**: Track steel materials, supplies, and stock levels with low-stock alerts
- **Client Management**: Maintain client information, contact details, and project history
- **Quotes Management**: Create, send, and track client quotes with status tracking
- **Employee Management**: Manage workforce information and roles

### Employee Portal
- **My Tasks**: View assigned fabrication tasks and track progress
- **Time Tracking**: Log work hours and track time spent on projects
- **Project Status**: View overall project progress and deadlines
- **Performance Reports**: Track individual and team performance metrics

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

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

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
