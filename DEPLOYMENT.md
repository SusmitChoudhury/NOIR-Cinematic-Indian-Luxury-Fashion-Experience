# NOIRÉ — Complete Deployment Guide
### Backend on Railway & Frontend on Netlify

This repository contains:
1. **Frontend**: Next.js 16 (Turbopack, GSAP, Tailwind CSS, Lenis Smooth Scroll) located in the repository root.
2. **Backend**: Express REST API located in `/backend` (with `railway.json` and `Dockerfile` ready).

---

## 1. Push to GitHub

If you haven't created a GitHub repository yet:
1. Create a new repository on [GitHub](https://github.com/new) named `noire-indian-fashion` (do **not** check "Initialize with README").
2. Run the following commands in your terminal:

```bash
# Add your GitHub remote repository
git remote add origin https://github.com/YOUR_USERNAME/noire-indian-fashion.git

# Set default branch to main (or master)
git branch -M main

# Push all code
git push -u origin main
```

---

## 2. Deploy Backend on Railway

Railway will host the high-performance Express REST API for catalog queries, order processing, VIP atelier appointments, and newsletter subscriptions.

### Steps:
1. Go to [Railway.app](https://railway.app/) and sign in with your GitHub account.
2. Click **"+ New Project"** → select **"Deploy from GitHub repo"**.
3. Choose the `noire-indian-fashion` repository.
4. Click on the created service card to open its **Settings**:
   - In **General** → **Root Directory**, set it to: `/backend`
   - In **Build** → Builder should automatically be set to **NIXPACKS** or **Dockerfile** (both configurations are provided).
5. Go to the **Variables** tab and add:
   - `PORT`: `8000` (or leave default, Railway assigns automatically)
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: `*` (or your Netlify domain like `https://your-site.netlify.app`)
6. Go to the **Settings** tab → under **Networking**, click **"Generate Domain"**.
   - You will get a public URL like: `https://noire-backend-production.up.railway.app`
7. Test your backend:
   - Open `https://YOUR_RAILWAY_URL/health` in your browser. It should return:
   ```json
   { "status": "healthy", "service": "NOIRÉ Luxury Indian Fashion Backend" }
   ```

---

## 3. Deploy Frontend on Netlify

Netlify will host the Next.js haute couture web experience with edge CDN and global caching.

### Steps:
1. Go to [Netlify.com](https://app.netlify.com/) and sign in with your GitHub account.
2. Click **"Add new site"** → **"Import an existing project"** → select **GitHub**.
3. Pick `noire-indian-fashion`.
4. Netlify will auto-detect settings from `netlify.toml`:
   - **Base directory**: Leave blank (root `/`)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Click **"Environment variables"** (or add under **Site Configuration** → **Environment variables**):
   - `NEXT_PUBLIC_API_URL`: Paste your Railway backend URL (e.g. `https://noire-backend-production.up.railway.app`)
   - `NODE_VERSION`: `20`
6. Click **"Deploy site"**.
7. Netlify will build and deploy your site in ~1–2 minutes, providing a URL like `https://noire-couture.netlify.app`.

---

## 4. Local Development

To run both frontend and backend concurrently on your local machine:

### Backend:
```bash
cd backend
npm install
npm start
# Runs on http://localhost:8000
```

### Frontend:
```bash
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## 5. Architecture Summary

| Component | Technology | Platform | Config File |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js 16 + GSAP + Tailwind | Netlify | `netlify.toml` |
| **Backend** | Node.js + Express REST API | Railway | `backend/railway.json`, `backend/Dockerfile` |
| **Media Assets** | Authentic Indian Handlooms | Netlify / CDN | `public/media/` |
