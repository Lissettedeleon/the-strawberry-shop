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
| `/checkout` | Checkout (sends the order by email) |
| `/catering` | Catering request form (sends by email) |
| `/gift-cards` | Gift card request form (sends by email) |
| `/privacy` | Privacy page |
| `/rewards` | Rewards (content to come) |
| `/about`, `/visit-us`, `/reviews` | About, location and hours, reviews |

## Where things live

- `src/pages/` – one file per page; routes are in `src/App.jsx`.
- `src/components/` – shared pieces (navbar, footer, menu sections, cart, gift card, item options).
- `src/lib/` – cart state, opening hours, item customization options, the email helper.
- `src/data/` – the menu, reviews and announcement bar as JSON files. Edit these to change the content.
- `src/index.css`, `tailwind.config.js` – brand colors, fonts and animations.
- `public/` – videos and photos served with the site, including the link-preview image; `public/photos/` has the menu photos and logos.

## No backend

The site runs on any static web host (it builds to plain files in `dist/`). There is no database or server code:

- The menu, reviews and announcement bar are read from `src/data/`.
- Checkout, catering and gift card forms open the visitor's email app with the details filled in, addressed to the shop (`src/lib/emailShop.js`). Nothing is stored by the site.

Because it's a single-page app, the host should send unknown paths to `index.html` so links like `/menu` work when opened directly.

### Notes for whoever takes this over

- There are no online payments. Orders are paid at pickup; gift cards are paid after the shop replies to the email.
- The rewards page is a placeholder until the program details are final.
