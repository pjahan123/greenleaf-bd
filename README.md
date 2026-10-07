# GreenLeaf BD — Final UI/UX Build

## Included
- 3 main shop categories: Plants, Seeds, Pots & Planters
- Plants: 20 products across Indoor, Succulents, Flowering, and Air-Purifying categories
- Seeds: 10 products
- Pots: 10 products
- Planters: 10 products
- Home page without category grid: hero, featured plants, AI CTA, plant-journal blogs
- Top menu with product categories
- Bottom navigation: Home, Shop, Plant Care, My Account
- Plant Care page with every plant, image/name on the left and care tips on the right, DOs/DON'Ts
- Product details with back button, wishlist, quantity controls, care information, and Add to Cart
- Wishlist
- Cart quantity +/− controls
- Checkout delivery information validation
- Order placement and My Orders / Order Details
- Signup/Login UI
- Account and Logout
- Floating Gemini AI assistant
- MongoDB/Express backend routes for auth, products, orders, wishlist and Gemini AI

## Run frontend
```bash
cd frontend
npm install
npx expo start -c
```

## Run backend
```bash
cd backend
npm install
copy .env.example .env
npm start
```

Put your MongoDB Atlas URI and Gemini key in `backend/.env`.

For a physical phone, set `EXPO_PUBLIC_API_URL` to the computer's LAN URL, for example:
`EXPO_PUBLIC_API_URL=http://192.168.1.10:5000`

## Images
Product and blog images use real-photo Flickr image URLs with product-specific search terms and stable locks, so the image is matched to the product rather than using random placeholder art.
