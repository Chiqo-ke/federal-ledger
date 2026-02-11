# Frontend Configuration Guide

## ✅ Fixed Issues

Your frontend is now properly configured to communicate with your backend!

### Changes Made:

1. **Fixed API Port**: Changed from `8000` to `8001` (correct backend port)
2. **Added Environment Variables**: Created `.env` files for flexible configuration
3. **Production Ready**: Configured for both local development and Vercel deployment

---

## 🌐 Environment Configuration

### Local Development (`.env`)
```env
VITE_API_URL=http://localhost:8001
VITE_WS_URL=ws://localhost:8001
```

### Production (`.env.production`)
```env
VITE_API_URL=https://Chiqoke254.pythonanywhere.com
VITE_WS_URL=wss://Chiqoke254.pythonanywhere.com
```

---

## 🚀 How to Use

### Local Development
```bash
cd federal-ledger
npm install          # Install dependencies
npm run dev          # Start dev server (uses .env)
```
The frontend will automatically connect to `http://localhost:8001`

### Production Build
```bash
npm run build        # Uses .env.production
```

### Deploy to Vercel
When you deploy to Vercel, it will automatically use `.env.production` values, OR you can set them in Vercel dashboard:

1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `VITE_API_URL` = `https://Chiqoke254.pythonanywhere.com`
   - `VITE_WS_URL` = `wss://Chiqoke254.pythonanywhere.com`
3. Redeploy

---

## 📝 Testing the Connection

### Test Local Backend Connection
1. Start backend:
   ```bash
   cd ../Nasa/gok_backend
   python -m uvicorn main:app --reload --port 8001
   ```

2. Start frontend:
   ```bash
   cd federal-ledger
   npm run dev
   ```

3. Open browser: `http://localhost:5173`
4. Check browser console for "API Base URL: http://localhost:8001"

### Test Production Connection
1. Deploy backend to PythonAnywhere (follow `PYTHONANYWHERE_DEPLOYMENT.md`)
2. Deploy frontend to Vercel:
   ```bash
   vercel --prod
   ```
3. Visit your Vercel URL: `https://federal-ledger.vercel.app`

---

## ⚠️ Important Notes

### CORS Configuration
Your backend already has CORS configured for:
- ✅ Local: `http://localhost:5173`
- ✅ Production: `https://federal-ledger.vercel.app`
- ✅ Production: `https://federal-ledger-jlz3nalp7-chiqo-kes-projects.vercel.app`

### WebSocket Limitations
- ✅ Works locally on port 8001
- ❌ Does NOT work on PythonAnywhere free tier
- ✅ Works on PythonAnywhere paid tier

If using free tier, you may need to disable WebSocket features or implement polling instead.

---

## 🔍 Verify Configuration

Check if API URL is correctly loaded:
1. Open browser console (F12)
2. Look for: `API Base URL: http://localhost:8001` (local) or `API Base URL: https://Chiqoke254.pythonanywhere.com` (production)
3. Try logging in with `FinanceOffice` / `admin123`

---

**Status**: ✅ Frontend is now configured to communicate with your backend on port 8001!
