# Authentication & Authorization System

## Overview
The Elegant Steel Hardware platform now includes a complete authentication system with login, session management, and role-based access control.

## Features

### 1. Login Page
- **URL**: `http://localhost:3001/login`
- **Email/Password Authentication**: Users sign in with email and password
- **Demo Credentials**:
  - Admin: `admin@elegantsteelhw.com` / `password123`
  - Employee: `employee@elegantsteelhw.com` / `password123`
- **Professional UI**: Dark theme matching app design with company branding

### 2. Session Management
- **Local Storage**: User data and tokens stored in browser localStorage
- **Automatic Redirect**: Users are automatically logged in and redirected to dashboard
- **Session Validation**: Middleware checks for valid session on protected routes

### 3. Role-Based Access Control
- **Admin Role**: Full access to all modules including user management
- **Employee Role**: Access to work-related modules (tasks, projects, orders)
- **Dashboard Display**: Shows different options based on user role

### 4. Protected Routes
All these routes require authentication:
- `/dashboard` - Main admin/employee dashboard
- `/admin/*` - Admin-only pages (user management)
- `/projects` - Project management
- `/orders` - Orders and sales
- `/customer-statements` - Customer accounts
- `/finances` - Financial tracking
- `/my-tasks` - Employee tasks
- `/inventory` - Inventory management
- `/performance` - Performance tracking (admin only)
- `/quotes` - Quote management
- `/employees` - Employee directory
- `/clients` - Client management

### 5. Mobile-Friendly Dashboard
- **Desktop View**: Full dashboard with stats, recent projects, and quick action cards
- **Mobile View**: Icon-based module access (looks like mobile app with tiles)
- **Responsive Design**: Automatically adjusts layout based on screen size
- **Quick Access**: 8-9 module icons for fast navigation on mobile

### 6. Logout Functionality
- **Logout Button**: Located in top-right corner of dashboard
- **Session Cleanup**: Clears localStorage and redirects to login page
- **Secure**: Requires re-login to access protected pages

## API Endpoints

### POST /api/auth/login
**Request**:
```json
{
  "email": "admin@elegantsteelhw.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "user": {
    "id": 1,
    "email": "admin@elegantsteelhw.com",
    "name": "Admin User",
    "role": "Admin",
    "status": "Active"
  },
  "token": "base64-encoded-token"
}
```

## How It Works

### 1. Login Flow
1. User visits `/login`
2. Enters email and password
3. Clicks "Sign In"
4. Request sent to `/api/auth/login`
5. Server validates credentials
6. Returns user data and token
7. Client stores in localStorage
8. Redirects to `/dashboard`

### 2. Protected Page Access
1. User tries to access protected route
2. Middleware checks for valid session
3. If no session, redirects to `/login`
4. If session valid, allows access
5. Page loads and checks user role
6. Shows role-appropriate content

### 3. Mobile Module Access
1. On mobile devices, dashboard shows icon grid
2. Each icon represents a module/app
3. Users tap icons to navigate
4. Only authorized modules are available (based on role)
5. Admin can manage all modules

## Utilities

### `src/lib/auth.ts`
Helper functions for authentication:
- `getUser()` - Get current logged-in user
- `getToken()` - Get session token
- `isAuthenticated()` - Check if user is logged in
- `isAdmin()` - Check if user is admin
- `logout()` - Clear session and redirect to login

## Security Considerations

### Current Implementation
- Demo users for testing and development
- Token stored in localStorage
- Basic session validation

### Production Recommendations
- Use real database for user credentials
- Implement password hashing (bcrypt)
- Use secure HTTP-only cookies for tokens
- Implement JWT with expiration
- Add two-factor authentication
- Use HTTPS only
- Implement rate limiting on login
- Add password reset functionality

## Future Enhancements

1. **Password Reset**: Email-based password reset flow
2. **Two-Factor Authentication**: TOTP or SMS-based 2FA
3. **User Invitations**: Admin invites new users via email
4. **Permission System**: Granular permissions per user
5. **Audit Logging**: Track all user actions
6. **Session Timeout**: Auto-logout after inactivity
7. **Remember Me**: Persistent sessions

## Testing

### Test Credentials
```
Admin Account:
  Email: admin@elegantsteelhw.com
  Password: password123
  Role: Admin

Employee Account:
  Email: employee@elegantsteelhw.com
  Password: password123
  Role: Employee
```

### Test Scenarios
1. **Login Success**: Use demo credentials to log in
2. **Login Failure**: Use incorrect password
3. **Protected Routes**: Try accessing dashboard without login
4. **Logout**: Click logout button and verify redirect to login
5. **Mobile View**: View dashboard on mobile device (shows icon grid)
6. **Role-Based Access**: Log in as employee and verify limited access

## File Structure

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx          # Login form page
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard with mobile icons
│   ├── api/
│   │   └── auth/
│   │       └── login/
│   │           └── route.ts   # Login API endpoint
│   └── ...other pages...
├── lib/
│   └── auth.ts               # Auth utilities
├── components/
│   └── ProtectedPage.tsx     # Protected page wrapper
└── middleware.ts             # Route protection middleware
```

## Next Steps

1. **Database Integration**: Replace demo users with real database
2. **Password Hashing**: Implement bcrypt or similar
3. **JWT Tokens**: Generate and validate JWT tokens
4. **Email Verification**: Send verification emails on signup
5. **Admin Invitations**: Email-based user invitations
6. **Audit Logs**: Track login attempts and user actions
