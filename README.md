# The Strawberry Shop

Website for The Strawberry Shop, a strawberry dessert shop at 7100 Foundry Row, Liberty Township, OH.

Built with React, Vite and Tailwind CSS.

## Run it locally

```
npm install
npm run dev
```

Build for production with `npm run build`. The output goes to `dist/`.

## Pages

| Path | Page |
| --- | --- |
| `/` | Home |
| `/menu` | Menu, with pickup/delivery toggle, item customization and cart |
| `/checkout`, `/order-confirmation` | Checkout and receipt |
| `/catering` | Catering request form |
| `/gift-cards` | Gift cards |
| `/rewards` | Rewards (content to come) |
| `/about`, `/visit-us`, `/reviews` | About, location and hours, reviews |
| `/admin` | Order dashboard for staff (admin login) |

## Where things live

- `src/pages/` – one file per page; routes are in `src/App.jsx`.
- `src/components/` – shared pieces (navbar, footer, menu sections, cart, gift card, item options).
- `src/lib/` – cart state, login state, opening hours, item customization options.
- `src/index.css`, `tailwind.config.js` – brand colors, fonts and animations.
- `public/` – videos and photos served with the site, including the link-preview image.
- `content-backup/` – a saved copy of the menu, reviews and other content, plus every photo, in case the original hosting goes away.

## Data and backend

All data access goes through the client in `src/api/`. Data models (menu items, orders, catering requests, gift cards, reviews, feedback and so on) are defined in the `entities/` files of the backend folder. The server-side functions (order receipts, catering email, rewards codes, order history) are in its `functions/` folder.

Moving to a new platform means replacing that client and recreating those data models and functions. Some photos and the logo are still loaded from the previous platform's media storage; copies of all of them are in `content-backup/photos/`.

### Notes for whoever takes this over

- Online payments aren't connected yet. Orders are recorded for pickup without payment.
- Order numbers are random codes, and the receipt page only works with the order number plus order ID.
- The catering form has a hidden spam trap and length limits. Catering requests are saved and also emailed to the shop.
- The rewards page is a placeholder until the program details are final.
