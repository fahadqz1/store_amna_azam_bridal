# AMNA AZAM - Testing & QA Guide

## PHASE 8: Quality Assurance & Testing

### Manual Testing Checklist

#### Customer Journey Testing

**Registration & Authentication:**
- [ ] User can register with valid email
- [ ] Password validation works (min 8 chars, mixed case, numbers)
- [ ] Email verification link works
- [ ] User receives confirmation email
- [ ] User can login with correct credentials
- [ ] User cannot login with wrong credentials
- [ ] Password reset email sent and link works
- [ ] Password change in account settings works

**Shopping Experience:**
- [ ] Homepage loads without errors
- [ ] All hero carousel slides display correctly
- [ ] Featured products section displays products
- [ ] Collections section displays all categories
- [ ] Product listing page filters work:
  - [ ] Category filter
  - [ ] Size filter
  - [ ] Price range filter
- [ ] Product sorting works:
  - [ ] By price (low to high)
  - [ ] By price (high to low)
  - [ ] By newest
- [ ] Product detail page shows:
  - [ ] Product images
  - [ ] Product description
  - [ ] Price and discount
  - [ ] Size selection
  - [ ] Related products
- [ ] Add to cart works
- [ ] Cart displays correct quantities
- [ ] Remove from cart works
- [ ] Update quantities in cart works

**Checkout Process:**
- [ ] Checkout requires login
- [ ] Address form validates all fields
- [ ] Address saved correctly
- [ ] Payment method selection works
- [ ] Coupon code applies (try: SAVE10)
- [ ] Coupon correctly reduces total
- [ ] Order summary displays correctly
- [ ] Tax calculated correctly (17%)
- [ ] Shipping charges applied correctly
- [ ] Order placed successfully
- [ ] Order confirmation page displays
- [ ] Order confirmation email sent
- [ ] Order appears in account dashboard

**Account Management:**
- [ ] Dashboard displays user info
- [ ] Profile can be updated
- [ ] Addresses can be added/edited/deleted
- [ ] Order history displays all orders
- [ ] Order details page shows complete order info
- [ ] Security settings allow password change
- [ ] Account navigation works

#### Admin Interface Testing

**Admin Authentication:**
- [ ] Admin login page accessible
- [ ] Admin cannot login with customer account
- [ ] Admin dashboard loads
- [ ] Dashboard displays 6 KPI metrics
- [ ] Metrics update correctly

**Product Management:**
- [ ] Products page loads
- [ ] Product list displays all products
- [ ] Add product form works
- [ ] Product saves to database
- [ ] Edit product form works
- [ ] Delete product works
- [ ] Product images upload
- [ ] Pricing updates correctly

**Order Management:**
- [ ] Orders page loads
- [ ] All orders display
- [ ] Order status can be updated
- [ ] Order details show complete info
- [ ] Customer info displays correctly

**Customer Management:**
- [ ] Customers page loads
- [ ] All customers display
- [ ] Customer details show contact info
- [ ] Customer order history visible

**Coupon Management:**
- [ ] Coupons page loads
- [ ] Create coupon form works
- [ ] Coupon percentage discount works
- [ ] Coupon fixed amount works
- [ ] Coupon displays in list
- [ ] Coupon can be edited
- [ ] Coupon status toggles

---

### Mobile Responsiveness Testing

**Breakpoints to Test:**
- Mobile: 320px, 480px
- Tablet: 768px
- Desktop: 1024px, 1280px

**Elements to Verify:**
- [ ] Header stacks correctly on mobile
- [ ] Navigation menu is accessible on mobile
- [ ] Product cards display properly
- [ ] Forms are touch-friendly
- [ ] Images scale appropriately
- [ ] Text is readable (min 16px on mobile)
- [ ] Buttons are large enough to tap (min 44x44px)
- [ ] No horizontal scroll on mobile

---

### Performance Testing

#### Web Vitals Targets
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- First Contentful Paint (FCP): < 1.8s

#### Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g @lhci/cli@~0.9.0 lighthouse

# Run audit
lighthouse https://localhost:3000 --view

# Check metrics:
# Performance: > 90
# Accessibility: > 90
# Best Practices: > 90
# SEO: > 90
```

#### Load Testing

```bash
# Install Apache Bench
# macOS: brew install ab
# Ubuntu: sudo apt-get install apache2-utils

# Test homepage
ab -n 1000 -c 10 http://localhost:3000/

# Test product listing
ab -n 500 -c 5 http://localhost:3000/shop

# Check metrics:
# Requests per second
# Average response time
# Failed requests
```

---

### Security Testing

#### Input Validation
- [ ] SQL injection prevention
  - Test: `'; DROP TABLE users; --`
  - Should show form error, not SQL error
- [ ] XSS prevention
  - Test: `<script>alert('xss')</script>`
  - Should display as text, not execute
- [ ] CSRF protection
  - Forms should include CSRF tokens

#### Authentication Security
- [ ] Passwords never logged
- [ ] Sessions expire properly
- [ ] JWT tokens validate
- [ ] Service role key never exposed in client
- [ ] Admin checks work (cannot access as customer)

#### API Security
- [ ] Rate limiting works
- [ ] Invalid requests rejected
- [ ] Unauthorized requests denied
- [ ] User can only access own data

#### Database Security
- [ ] RLS policies enforce row-level access
- [ ] Delete operations safe
- [ ] Update operations validate
- [ ] Admin endpoints protected

#### HTTPS
- [ ] All pages served over HTTPS (production)
- [ ] No mixed content
- [ ] SSL certificate valid

---

### Database Testing

#### Data Integrity
```sql
-- Check for orphaned records
SELECT * FROM order_items 
WHERE order_id NOT IN (SELECT id FROM orders);

-- Check inventory accuracy
SELECT product_id, SUM(stock) as total 
FROM product_inventory 
GROUP BY product_id;

-- Check for null required fields
SELECT * FROM products WHERE name IS NULL;
```

#### Backup & Recovery
- [ ] Database backups run daily
- [ ] Backup size reasonable
- [ ] Restore procedure tested
- [ ] Data integrity verified after restore

---

### Browser Compatibility

Test across browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

Test specific features:
- [ ] CSS Grid layouts
- [ ] CSS Variables
- [ ] Form validation
- [ ] File uploads
- [ ] Local storage

---

### Error Handling Testing

#### Expected Errors
- [ ] 404 page displays correctly
- [ ] 500 error handled gracefully
- [ ] Network error messages clear
- [ ] Form validation errors display
- [ ] Loading states show
- [ ] Spinner displays on slow loads

#### Edge Cases
- [ ] Empty product list displays message
- [ ] No results in search shows "No products"
- [ ] Very long product names handled
- [ ] Large images load properly
- [ ] Special characters in names work

---

### Email Testing

#### Email Functionality
- [ ] Registration confirmation sent
- [ ] Password reset email sent
- [ ] Order confirmation sent
- [ ] Shipping notification sent
- [ ] Email content correct
- [ ] Links in emails work

```bash
# Test email locally using Ethereal Email
# Update RESEND_API_KEY in .env.local with test key
npm run dev
# Check emails at ethereal.email
```

---

### API Testing with cURL

```bash
# Test checkout endpoint
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id",
    "items": [{"productId": "prod-id", "quantity": 1, "size": "M", "price": 3500}],
    "shipping": {
      "fullName": "Test User",
      "phone": "03001234567",
      "streetAddress": "123 Main St",
      "city": "Karachi",
      "province": "Sindh",
      "postalCode": "75500"
    },
    "paymentMethod": "cod"
  }'

# Test orders endpoint
curl -X GET "http://localhost:3000/api/orders?userId=user-id"

# Test shipping endpoint
curl -X GET "http://localhost:3000/api/shipping?orderId=order-id"
```

---

### Accessibility Testing (WCAG 2.1 AA)

#### Keyboard Navigation
- [ ] All buttons accessible via Tab
- [ ] Tab order logical
- [ ] Focus visible on all elements
- [ ] Forms completable with keyboard
- [ ] No keyboard traps

#### Screen Reader Testing
```bash
# Install screen reader
# macOS: VoiceOver (built-in)
# Windows: NVDA (free)
# Chrome: ChromeVox extension

# Test:
# - Product descriptions read correctly
# - Form labels associated
# - Alt text on images
# - Semantic HTML structure
```

#### Color Contrast
- [ ] Text contrast ratio > 4.5:1
- [ ] Large text contrast ratio > 3:1
- [ ] Do not use color alone to convey info

---

### Automated Testing Setup (Optional)

#### Install Testing Libraries
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev cypress
```

#### Example Jest Test
```javascript
// __tests__/auth.test.ts
import { registerUser } from '@/lib/auth';

describe('Authentication', () => {
  it('should validate password strength', () => {
    // Test weak password
    expect(() => registerUser({
      email: 'test@example.com',
      password: '123'
    })).toThrow('Password too weak');
  });
});
```

#### Example E2E Test (Cypress)
```javascript
// cypress/e2e/checkout.cy.js
describe('Checkout Flow', () => {
  it('should complete order', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="add-to-cart"]').click();
    cy.visit('/checkout');
    cy.get('input[name="full_name"]').type('Test User');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/order-confirmation');
  });
});
```

---

### Performance Optimization Checklist

- [ ] Images optimized with next/image
- [ ] Code splitting configured
- [ ] Lazy loading enabled
- [ ] API routes cached where appropriate
- [ ] Database queries optimized
- [ ] Unused CSS removed
- [ ] JavaScript minified
- [ ] No console errors

---

### Launch Readiness

Before going live, verify:
- [ ] All manual tests passed
- [ ] Mobile responsiveness verified
- [ ] Performance metrics met
- [ ] Security audit passed
- [ ] Backups working
- [ ] Monitoring configured
- [ ] Error tracking enabled
- [ ] Team access configured

---

## Regression Testing Script

After each update, run this checklist:

1. **Login Flow** (5 min)
   - Register new account
   - Login with credentials
   - Logout

2. **Shopping Flow** (10 min)
   - Browse products
   - Add to cart
   - Apply coupon
   - Checkout

3. **Admin Flow** (5 min)
   - Login as admin
   - Create new product
   - View orders
   - Update order status

4. **Mobile Test** (3 min)
   - Open on phone
   - Test navigation
   - Complete mini-purchase flow

**Total: ~23 minutes**

---

Generated: November 17, 2026  
Version: 1.0  
Status: Ready for Quality Assurance
