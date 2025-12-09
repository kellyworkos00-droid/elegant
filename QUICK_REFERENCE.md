# 🎯 Authentication System - Quick Reference Guide

## Login Access
**URL**: `http://localhost:3001/login`

## Demo Accounts
| Account | Email | Password | Role | Access |
|---------|-------|----------|------|--------|
| Owner/Admin | zachnduane057@gmail.com | zach | Admin | Full System Access |
| Admin | admin@elegantsteelhw.com | password123 | Admin | Full System Access |
| Employee | employee@elegantsteelhw.com | password123 | Employee | Limited Features |

## User Flow Diagram

```
┌─────────────────┐
│   User visits   │
│  /login page    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  Enter email & password     │
│  Click "Sign In" button     │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  /api/auth/login validates  │
│  Returns user + token       │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  localStorage stores token  │
│  & user data                │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Auto-redirect to           │
│  /dashboard                 │
└────────┬────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  DESKTOP: Full dashboard     │
│  MOBILE: Icon grid (8-9)     │
└──────────────────────────────┘
```

## Protected Routes Structure

```
/login                          (PUBLIC - No auth needed)
/                              (PUBLIC - Role selection)

/dashboard                     (PROTECTED - Auth required)
├── /admin/users              (ADMIN ONLY)
├── /projects                 (AUTH REQUIRED)
├── /orders                   (AUTH REQUIRED)
├── /customer-statements      (AUTH REQUIRED)
├── /finances                 (AUTH REQUIRED)
├── /my-tasks                 (AUTH REQUIRED)
├── /inventory                (AUTH REQUIRED)
├── /performance              (AUTH REQUIRED)
├── /quotes                   (AUTH REQUIRED)
├── /employees                (AUTH REQUIRED)
└── /clients                  (AUTH REQUIRED)

/api/auth/login               (PUBLIC - API endpoint)
/api/users/*                  (PROTECTED - API)
/api/projects/*               (PROTECTED - API)
/api/tasks/*                  (PROTECTED - API)
/api/orders/*                 (PROTECTED - API)
```

## Mobile Dashboard - Icon Grid

```
On Mobile (< 1024px width):

┌─────────────────────────────────┐
│  Elegant Steel Hardware         │
│  User: John Employee            │
│  john@email.com         [Logout]│
└─────────────────────────────────┘

    [📦]  [👥]  [💰]
   Orders Customers Finances

    [📊]  [📦]  [📝]
  Projects Inventory Quotes

    [🏆]  [⚙️]  [📈]
 Performance Users Analytics

Each icon is a touchable button
to navigate to that module
```

## Authentication Flow

### 1. Initial Login
```
User Input
  ↓
POST /api/auth/login
  ↓
Validate Credentials
  ↓
Check Demo Users Database
  ↓
Return: { user, token }
  ↓
Client: localStorage.setItem('user', data.user)
       localStorage.setItem('token', data.token)
  ↓
Router.push('/dashboard')
```

### 2. Protected Route Access
```
User navigates to /orders
  ↓
Middleware intercepts request
  ↓
Check localStorage for token
  ↓
Token exists?
  ├─ YES → Allow access
  └─ NO → Redirect /login
  ↓
Page loads and renders
  ↓
Page checks user role
  ↓
Show role-appropriate content
```

### 3. Logout
```
User clicks Logout
  ↓
localStorage.removeItem('user')
localStorage.removeItem('token')
  ↓
window.location.href = '/login'
  ↓
User redirected to login page
  ↓
All protected routes blocked
```

## Key Files & Their Purpose

| File | Purpose | Key Function |
|------|---------|--------------|
| `src/app/login/page.tsx` | Login form UI | Email/password form with validation |
| `src/app/api/auth/login/route.ts` | API endpoint | Validate creds, return user + token |
| `src/middleware.ts` | Route protection | Redirect to login if not authenticated |
| `src/lib/auth.ts` | Helper utilities | getUser(), getToken(), logout() |
| `src/app/dashboard/page.tsx` | Main dashboard | Shows user info, mobile icons, modules |
| `src/components/ProtectedPage.tsx` | Page wrapper | Component-level protection |

## Features by Role

### Admin Capabilities
✅ Full dashboard with stats
✅ Manage users (create, delete, assign roles)
✅ Access all modules without restriction
✅ View employee performance metrics
✅ Create orders and manage customers
✅ View finances and reports
✅ Manage inventory
✅ Track projects
✅ Create and manage quotes
✅ Access admin settings

### Employee Capabilities
✅ View dashboard with modules
✅ View assigned tasks
✅ View order status
✅ View personal performance metrics
✅ Cannot access user management
✅ Cannot access admin settings
✅ Limited to assigned projects
✅ Can view but not modify key settings

## Mobile vs Desktop Experience

### Desktop (≥ 1024px)
```
Traditional layout with:
- Sidebar or top navigation
- Full cards and descriptions
- Multiple columns
- Hover effects
- Detailed information display
```

### Mobile (< 1024px)
```
Icon-based layout with:
- Grid of colored icon tiles
- No text descriptions
- Single column (3 icons wide)
- Tap-to-activate
- Quick module access
- App-like experience
```

## Validation Rules

| Field | Validation | Error Message |
|-------|-----------|-----------------|
| Email | Required, must be valid email | "Email is required" |
| Password | Required, minimum 1 char | "Password is required" |
| Login | Email + password must match | "Invalid email or password" |

## Response Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Login successful | Store token, redirect to dashboard |
| 400 | Missing credentials | Show error: "Email and password required" |
| 401 | Wrong credentials | Show error: "Invalid email or password" |
| 500 | Server error | Show error: "Internal server error" |

## Security Notes

### Current (Development)
- Demo users stored in code
- Token is base64 encoded (not secure)
- localStorage used for storage
- No password hashing
- No HTTPS enforcement

### Recommended (Production)
- Use real database with bcrypt hashing
- Implement JWT with expiration
- Use HTTP-only secure cookies
- Enable HTTPS only
- Add rate limiting
- Add session timeout
- Implement 2FA
- Add password reset flow
- Add email verification
- Audit all user actions

## Troubleshooting

### User redirected to login even when logged in
- Check browser DevTools → Application → LocalStorage
- Verify 'user' and 'token' are present
- Check middleware.ts is configured correctly

### Login button doesn't work
- Check browser console for errors
- Verify `/api/auth/login` endpoint is working
- Check email/password format

### Mobile icon grid not showing
- Check browser width (should be < 1024px)
- Open DevTools and use mobile device emulation
- Verify `lg:hidden` class is in dashboard

### Logout not working
- Clear localStorage manually if needed
- Check browser console for errors
- Verify logout() function is called

## Testing Checklist

- [ ] Login with admin credentials
- [ ] Login with employee credentials  
- [ ] Login with wrong password (shows error)
- [ ] Access protected route without login (redirects to login)
- [ ] Verify user info shows on dashboard
- [ ] Click logout button
- [ ] Verify redirect to login
- [ ] Try accessing protected route after logout (redirects to login)
- [ ] Test mobile view on small screen
- [ ] Verify icon grid appears on mobile
- [ ] Test on different browsers

## Success Indicators

✅ Login page loads at `/login`
✅ Can log in with demo credentials
✅ Dashboard displays after login
✅ User name and email shown in navbar
✅ Logout button visible and functional
✅ Protected routes redirect to login when not authenticated
✅ Mobile dashboard shows icon grid on small screens
✅ No console errors
✅ All pages compile without TypeScript errors
✅ Code synced to GitHub repository

---

**System Status**: 🟢 **FULLY FUNCTIONAL**
**Last Updated**: December 2024
**Version**: 1.0.0
