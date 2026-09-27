# NOIRÉ Haute Couture API Backend

Production Node.js / Express REST API for NOIRÉ Luxury Indian Fashion, configured for one-click deployment on [Railway](https://railway.app/).

## Endpoints

- `GET /` — API overview and directory
- `GET /health` — Health check & uptime stats
- `GET /api/products` — Full product catalog with color variants & filters
- `GET /api/products/:id` — Single product details
- `POST /api/orders` — Create couture order & generate tracking ID
- `POST /api/inquiry` — VIP private atelier appointment booking
- `POST /api/newsletter` — Subscribe to haute couture salon journal

## Deploying to Railway

1. In Railway, select **"Deploy from GitHub"** and choose this repository.
2. In Service Settings, set **Root Directory** to `/backend`.
3. Under Networking, click **"Generate Domain"** to get your public API URL.
4. Add the URL to your Netlify frontend as `NEXT_PUBLIC_API_URL`.

## Local Development

```bash
npm install
npm start
# Server listens on port 8000
```
