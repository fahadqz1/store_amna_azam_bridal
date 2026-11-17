# AMNA AZAM - Pakistani Eastern Wear & Bridal E-Commerce Platform

A complete, production-ready e-commerce platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Overview

AMNA AZAM is an elegant, premium e-commerce platform specializing in:
- Pakistani Eastern Wear
- Luxury Pret Collections
- Formal Wear
- Bridal Couture

The platform provides a beautiful customer-facing storefront and a comprehensive admin dashboard for business operations.

## Technology Stack

### Frontend
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom React components
- **Package Manager:** npm

### Backend
- **API:** Next.js API routes
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase Auth
- **File Storage:** Supabase Storage
- **Email:** Resend

### External Services
- **Payments:** COD + Payment Gateway Ready
- **Shipping:** PostEx Integration
- **Hosting:** Vercel (recommended)

## Project Structure

```
amna/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── (customer)/          # Customer-facing routes
│   │   ├── shop/            # Product listing
│   │   ├── product/[id]/    # Product details
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout flow
│   │   ├── auth/            # Login/Register
│   │   └── account/         # Customer dashboard
│   ├── (admin)/             # Admin routes
│   │   ├── admin/login/     # Admin login
│   │   ├── admin/dashboard/ # Admin dashboard
│   │   ├── admin/products/  # Product management
│   │   ├── admin/orders/    # Order management
│   │   └── admin/...        # Other admin pages
│   └── api/                 # API routes
│       ├── products/        # Product API
│       ├── orders/          # Order API
│       ├── auth/            # Auth API
│       ├── payments/        # Payment API
│       └── ...              # Other APIs
│
├── components/              # Reusable React components
│   ├── layout/             # Layout components
│   ├── product/            # Product components
│   ├── cart/               # Cart components
│   ├── checkout/           # Checkout components
│   └── ...                 # Other components
│
├── lib/                     # Utilities and helpers
│   ├── supabase.ts         # Supabase client
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
│
├── public/                  # Static assets
│   ├── images/             # Product images
│   └── ...
│
├── styles/                  # Additional stylesheets (if needed)
│
├── DATABASE_SCHEMA.sql      # PostgreSQL schema
├── DATABASE_SETUP.md        # Database setup guide
├── ADMIN_SETUP.md          # Admin user setup guide
├── API_DOCUMENTATION.md    # API documentation
├── DEPLOYMENT.md           # Deployment guide
├── POSTEX_INTEGRATION.md   # PostEx setup guide
├── PAYMENT_INTEGRATION.md  # Payment gateway setup
│
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.js       # PostCSS configuration
├── .env.example            # Environment variables template
└── package.json            # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- PostgreSQL basics

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd amna-azam
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. **Set up database**
```bash
# See DATABASE_SETUP.md for detailed instructions
# - Create Supabase project
# - Run DATABASE_SCHEMA.sql in Supabase SQL Editor
```

5. **Create admin account**
```bash
# See ADMIN_SETUP.md for detailed instructions
```

6. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Code Style

- TypeScript for all code
- Tailwind CSS for styling
- ESLint for linting
- 2-space indentation
- Clear, descriptive variable names

### Database Migrations

This project uses Supabase migrations. For schema changes:

1. Make changes in Supabase SQL Editor
2. Test thoroughly
3. Create backup before major changes
4. Document changes in migration files

## Features

### Customer-Facing
- **Homepage** with hero carousel
- **Product Catalog** with filtering and search
- **Product Details** with gallery and measurements
- **Shopping Cart** with persistent storage
- **User Authentication** with email verification
- **Checkout** with address management
- **Order Tracking** with shipment details
- **Account Dashboard** with order history

### Admin Panel
- **Dashboard** with key metrics
- **Product Management** with image uploads
- **Inventory Management** by size
- **Order Management** with status tracking
- **Customer Management**
- **Coupon Management**
- **Content Management** (hero slides, settings)

### Business Operations
- **Payment Processing** (COD + Online)
- **Shipping Integration** (PostEx)
- **Email Notifications** (Resend)
- **Order Management**
- **Inventory Tracking**
- **Customer Communication**

## Security

- **Authentication:** Supabase Auth with email verification
- **Authorization:** Row-level security (RLS) policies
- **Data Protection:** HTTPS only, encrypted at rest
- **Input Validation:** Server-side validation on all endpoints
- **API Security:** Rate limiting, CSRF protection
- **Environment Variables:** Sensitive data never committed

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

### Recommended Setup
- **Frontend:** Vercel
- **Database:** Supabase production tier
- **Storage:** Supabase Storage
- **Email:** Resend
- **Domain:** Custom domain configuration

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API endpoint documentation.

## Integrations

### Payment Gateway
See [PAYMENT_INTEGRATION.md](./PAYMENT_INTEGRATION.md)

### Shipping (PostEx)
See [POSTEX_INTEGRATION.md](./POSTEX_INTEGRATION.md)

## Database

### Schema Overview
See [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql) for complete schema.

Key tables:
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items
- `shipments` - Shipping information
- `payments` - Payment records
- `coupons` - Discount codes
- And many more...

### Row-Level Security
Database implements RLS to ensure users can only access their own data.

## Troubleshooting

### Database Connection Issues
1. Verify .env variables are correct
2. Check Supabase project is running
3. Confirm network connectivity
4. Review Supabase logs

### Authentication Issues
1. Clear browser cache and cookies
2. Verify email in Supabase auth.users
3. Check user_roles if accessing admin
4. Reset password if forgotten

### Image Upload Issues
1. Check image size (should be < 10MB)
2. Verify image format (jpg, png, webp)
3. Check Supabase Storage permissions
4. Review bucket configuration

## Testing

### Manual Testing Checklist
See [TESTING.md](./TESTING.md) for comprehensive testing guide.

## Contributing

For team development:
1. Create feature branches from main
2. Follow code style conventions
3. Test thoroughly before pushing
4. Write clear commit messages
5. Create pull requests for review

## Support & Documentation

- Database Setup: [DATABASE_SETUP.md](./DATABASE_SETUP.md)
- Admin Setup: [ADMIN_SETUP.md](./ADMIN_SETUP.md)
- API Docs: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)
- PostEx: [POSTEX_INTEGRATION.md](./POSTEX_INTEGRATION.md)
- Payments: [PAYMENT_INTEGRATION.md](./PAYMENT_INTEGRATION.md)

## Performance

- Next.js image optimization
- Lazy loading for images
- Server-side rendering where appropriate
- Database indexes for fast queries
- Caching strategies for static content

## Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Responsive design for all devices

## SEO

- Meta tags optimization
- Structured data
- Sitemap generation
- Mobile-friendly responsive design
- Fast page load times

## Production Checklist

Before launching:
- [ ] Database backups configured
- [ ] Admin account created and secured
- [ ] Email service (Resend) configured
- [ ] Payment gateway credentials set up
- [ ] PostEx API credentials added
- [ ] SSL certificate configured
- [ ] Security audit completed
- [ ] Performance optimization reviewed
- [ ] Error logging configured
- [ ] Monitoring set up

## License

Proprietary - AMNA AZAM

## Contact

For support or inquiries, contact the development team.

---

**Version:** 1.0.0  
**Last Updated:** January 2026
