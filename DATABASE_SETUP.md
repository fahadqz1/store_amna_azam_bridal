# Database Setup Guide - AMNA AZAM E-Commerce Platform

## Overview

This guide walks through setting up the PostgreSQL database for the AMNA AZAM e-commerce platform using Supabase.

## Prerequisites

- Supabase account (create at https://supabase.com)
- PostgreSQL 12+ (provided by Supabase)
- Database client (pgAdmin, DBeaver, or psql)

## Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Enter project details:
   - **Name:** amna-azam
   - **Database Password:** Generate a strong password
   - **Region:** Choose closest to your users (e.g., ap-south-1 for India/Pakistan)
4. Wait for database creation (5-10 minutes)
5. Copy the connection details from the dashboard

## Step 2: Configure Environment Variables

1. Copy the Supabase URL and anon key from your project settings
2. Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 3: Connect to Database and Run Schema

### Option A: Using Supabase SQL Editor (Recommended)

1. Go to Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Copy the entire contents of `DATABASE_SCHEMA.sql`
4. Paste into the SQL editor
5. Click "Run"
6. Wait for all queries to complete

### Option B: Using psql Command Line

```bash
# Get the connection string from Supabase Project Settings
psql "postgresql://[user]:[password]@[host]/[database]"

# Then paste the contents of DATABASE_SCHEMA.sql
```

### Option C: Using DBeaver or pgAdmin

1. Create a connection to your Supabase database
2. Open DATABASE_SCHEMA.sql in the SQL editor
3. Execute all queries

## Step 4: Create Initial Admin User

The admin setup is handled programmatically through the application. See ADMIN_SETUP.md for detailed instructions.

## Step 5: Verify Schema

Run these queries to verify tables exist:

```sql
-- Check all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check indexes
SELECT indexname FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY indexname;

-- Check RLS policies are enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = TRUE;
```

## Database Tables Overview

### Authentication & Profiles
- `profiles` - User profiles
- `user_roles` - User role assignments

### Products & Catalog
- `categories` - Product categories
- `collections` - Product collections
- `products` - Product details
- `product_images` - Product images
- `product_measurements` - Size measurements
- `product_inventory` - Stock by size

### Shopping
- `carts` - Shopping carts
- `cart_items` - Cart items

### Customer Data
- `addresses` - Delivery addresses
- `profiles` - Customer profiles

### Orders & Transactions
- `orders` - Order records
- `order_items` - Order line items
- `payments` - Payment records
- `shipments` - Shipment tracking
- `shipment_tracking_logs` - Tracking history

### Promotions
- `coupons` - Discount codes
- `coupon_redemptions` - Coupon usage

### Content Management
- `hero_slides` - Homepage hero carousel
- `store_settings` - Store configuration

### Communication
- `newsletter_subscribers` - Newsletter signups
- `email_logs` - Email delivery logs

## Database Relationships

```
users (auth.users)
├── profiles (1-to-1)
├── user_roles (1-to-many)
├── carts (1-to-many)
│   └── cart_items (many)
│       └── products
├── addresses (1-to-many)
├── orders (1-to-many)
│   ├── order_items (many)
│   │   └── products
│   ├── payments (1-to-many)
│   └── shipments (1-to-1)
│       └── shipment_tracking_logs (many)
└── coupon_redemptions (many)

products (1-to-many)
├── product_images
├── product_measurements
├── product_inventory
├── categories
├── collections
└── order_items
```

## Row-Level Security (RLS)

The database uses RLS to ensure users can only access:
- Their own profile
- Their own cart
- Their own addresses
- Their own orders and shipments
- Their own account data

Administrators (determined by `user_roles` table) can access all data through the admin panel.

## Important Notes

### Security
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code or git
- Always use row-level security policies
- Validate all user input on the backend
- Use prepared statements (Supabase handles this automatically)

### Backup & Recovery
- Supabase provides automatic daily backups (included in paid plans)
- Access backups from Project Settings → Backups
- Test restore procedures regularly

### Performance
- Database includes appropriate indexes
- Queries use connection pooling
- For high traffic, consider Supabase professional tier

## Troubleshooting

### "Connection refused"
- Check Supabase project is running
- Verify .env variables are correct
- Check firewall/network restrictions

### "Permission denied for schema public"
- Ensure you're using correct role key
- Check RLS policies are configured
- Verify user has correct role assignment

### "Too many connections"
- Increase connection limit in Supabase settings
- Implement connection pooling
- Review for connection leaks in code

## Backups and Recovery

### Create Manual Backup
1. Go to Project Settings → Backups
2. Click "Create backup"
3. Name the backup with date (e.g., "2024-01-15-pre-launch")

### Restore from Backup
1. Go to Project Settings → Backups
2. Select backup to restore
3. Click "Restore"
4. Confirm the action

## Next Steps

1. Verify all tables and indexes are created
2. Set up initial categories and collections
3. Create initial admin user (see ADMIN_SETUP.md)
4. Run initial migrations if any
5. Proceed to Phase 3: Frontend Development
