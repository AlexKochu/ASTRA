# Deploying ASTRA

The ASTRA project has been refactored into two separate components for optimal deployment:
1. **Frontend (Vercel)**: A static HTML/CSS/JS site.
2. **Backend API (Render)**: A headless Flask REST API serving the ML models.

---

## 1. Deploy the Backend to Render

The backend needs to be deployed first so you can get the API URL to provide to the frontend.

1. **Commit and Push**: Ensure all your code (including `requirements.txt` and the updated `app.py`) is pushed to your GitHub repository.
2. **Log into Render**: Go to [Render Dashboard](https://dashboard.render.com).
3. **New Web Service**: Click **New** -> **Web Service**.
4. **Connect Repository**: Select your GitHub repository.
5. **Configuration**:
   - **Name**: `astra-backend` (or similar)
   - **Environment**: `Python 3`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
6. **Deploy**: Click **Create Web Service**.
7. **Get URL**: Once deployed, copy the Render URL (e.g., `https://astra-backend-xyz.onrender.com`).

---

## 2. Update the Frontend with Backend URL

Before deploying the frontend, update it to point to your live Render backend.

1. Open `static/js/script.js`.
2. Find line 173 (approx):
   ```javascript
   const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
       ? '/predict' 
       : 'https://astra-backend-render-placeholder.onrender.com/predict';
   ```
3. Replace the placeholder URL with your actual Render URL:
   ```javascript
             const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                 ? '/predict' 
                 : 'https://YOUR_NEW_RENDER_URL.onrender.com/predict';
   ```
4. Commit and push this change to GitHub.

---

## 3. Deploy the Frontend to Vercel

1. **Log into Vercel**: Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. **Add New Project**: Click **Add New...** -> **Project**.
3. **Import Repository**: Select your GitHub repository.
4. **Configuration**:
   - **Framework Preset**: `Other`
   - **Root Directory**: `frontend`
   - **Build Command**: Leave empty (overridden by `vercel.json`).
   - **Output Directory**: Leave empty.
5. **Deploy**: Click **Deploy**. Vercel will automatically serve `index.html` and the `static/` directory.

Once Vercel completes, your application is fully live and decoupled!
