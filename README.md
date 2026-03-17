# Savy Sav's Dream Creations

A custom e-commerce shop built with Next.js, featuring Interac e-Transfer as the payment method.

## Features

- **Product Catalog** - Browse handmade crafts and custom items
- **Shopping Cart** - Persistent cart with localStorage
- **Interac e-Transfer Checkout** - Customers pay via e-Transfer
- **Admin Dashboard** - Manage products and view orders
- **Responsive Design** - Works on mobile and desktop

## Tech Stack

- Next.js 16 (App Router)
- SQLite + Drizzle ORM
- Custom Authentication
- Tailwind CSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Admin Access

- **URL**: `/admin/login`
- **Email**: `admin@savysav.com`
- **Password**: `admin123`

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin dashboard & routes
│   ├── api/            # API endpoints
│   ├── cart/           # Shopping cart
│   ├── checkout/       # Checkout flow
│   └── order-success/  # Order confirmation
├── components/        # React components
├── db/               # Database schema
└── lib/              # Utilities
```

## Database

The project uses SQLite with Drizzle ORM. The database file is `savysav.db`.

## Payment Flow

1. Customer adds items to cart
2. Customer fills contact info at checkout
3. Order is saved to database
4. Customer redirected to success page with:
   - Unique Order ID
   - Interac e-Transfer instructions
   - Email: savysav@gmail.com
