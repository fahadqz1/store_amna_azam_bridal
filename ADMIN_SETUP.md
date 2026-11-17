# Admin Setup Guide - AMNA AZAM

## Creating the Initial Admin User

### Step 1: Create Admin Account via Supabase Auth

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add user"
3. Enter admin email and password
4. Save the credentials securely

### Step 2: Assign Admin Role

After the user is created in auth.users, assign the admin role:

```sql
-- Get the user ID from Supabase Auth
-- Then run:
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin');
```

Or use the SQL Editor in Supabase:

1. Go to SQL Editor
2. Run this query:

```sql
-- First, create user via Supabase Auth UI
-- Then assign admin role (replace with actual user_id)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'admin@amnaazam.pk'
LIMIT 1;
```

### Step 3: Create User Profile

After creating the user and assigning the role, create their profile:

```sql
-- Insert profile for admin user
INSERT INTO public.profiles (id, email, full_name, phone)
SELECT id, email, 'Admin User', NULL
FROM auth.users
WHERE email = 'admin@amnaazam.pk'
AND NOT EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.users.id
)
LIMIT 1;
```

### Step 4: Verify Admin Role

```sql
-- Check admin role assignment
SELECT u.email, r.role
FROM auth.users u
LEFT JOIN public.user_roles r ON u.id = r.user_id
WHERE u.email = 'admin@amnaazam.pk';
```

## Admin Access

### Admin Panel Entry Point
- URL: `/admin/login`
- After login: `/admin/dashboard`

### Admin Permissions

Admin users can:
1. **Products**
   - Add, edit, delete products
   - Upload multiple product images
   - Set sizes and measurements
   - Manage inventory
   - Feature products

2. **Categories & Collections**
   - Create and manage categories
   - Create and manage collections
   - Assign products

3. **Orders**
   - View all orders
   - Update order status
   - Add tracking information
   - View customer details

4. **Customers**
   - View all registered customers
   - View order history
   - Manage customer accounts

5. **Coupons**
   - Create discount codes
   - Set discounts (percentage or fixed)
   - Set expiry dates
   - View coupon usage

6. **Content**
   - Manage hero slides
   - Update store settings
   - Manage promotional content

### Role-Based Access Control

The application uses role-based authorization:

```typescript
// Customer - can only access own data
role: 'customer'

// Admin - can access all administrative features
role: 'admin'

// Staff - limited admin privileges (future expansion)
role: 'staff'
```

## Server-Side Authorization

All admin endpoints check user role:

```typescript
// Example API endpoint
export async function POST(request: Request) {
  const user = await supabase.auth.getUser();
  
  // Check if user is admin
  const { data: roles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin');
  
  if (!roles?.length) {
    return Response.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  // Admin-only operation
}
```

## Security Considerations

### Never Expose Admin Credentials
- Don't commit credentials to git
- Use strong passwords (20+ characters)
- Use unique, complex passwords
- Store credentials in a password manager

### Rotate Admin Credentials
- Change admin password every 90 days
- Review access logs regularly
- Monitor for unusual activity

### Audit Admin Actions
- All admin actions are logged in email_logs
- Orders show admin_notes when modified
- Database has created_at and updated_at timestamps

### Restrict Admin Access
- Use VPN or private IP if possible
- Enable IP whitelisting (future feature)
- Implement rate limiting on admin endpoints
- Use HTTPS only

## Backup Admin Credentials

Create a secure backup process:

1. **Store Encrypted**
   - Keep in password manager (1Password, LastPass)
   - Or encrypted file with strong passphrase
   - Backup to secure location

2. **Document Recovery Process**
   - If admin account is lost/compromised
   - Create new admin via Supabase
   - Update role assignment
   - Disable compromised account

3. **Multiple Admins (Optional)**
   - Create additional admin accounts for team
   - Assign same admin role
   - Each has individual login credentials

## Troubleshooting

### Admin Login Not Working
1. Verify email is registered in auth.users
2. Check user_roles table has admin role
3. Confirm password is correct
4. Reset password if forgotten

### Admin Features Unavailable
1. Verify user_id is in user_roles table with 'admin' role
2. Check database connection
3. Clear browser cache and cookies
4. Try incognito/private browsing

### Lost Admin Access
1. Create new admin account via Supabase Auth
2. Assign admin role using SQL
3. Disable old account if compromised
4. Document password change

## Initial Setup Checklist

- [ ] Create Supabase project
- [ ] Run DATABASE_SCHEMA.sql
- [ ] Create admin user via Supabase Auth
- [ ] Assign admin role with SQL
- [ ] Create admin profile
- [ ] Verify admin can access /admin/dashboard
- [ ] Test product creation
- [ ] Test order management
- [ ] Document admin credentials securely
- [ ] Set up backup process

## Next Steps

1. Admin can now access `/admin/dashboard`
2. Create initial product categories
3. Create initial collections
4. Upload hero slides images
5. Configure store settings
6. Ready for product data entry

## Production Checklist

Before going live:

- [ ] Admin password meets security requirements
- [ ] Admin account credentials backed up securely
- [ ] Rate limiting enabled on admin endpoints
- [ ] Admin actions being logged
- [ ] Database backups configured
- [ ] Disaster recovery plan documented
- [ ] Multiple admins trained if needed
- [ ] Security audit completed
