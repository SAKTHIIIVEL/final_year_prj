# Cloudinary Setup Guide — DiPharma

## Step 1: Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click **Sign Up Free**
3. Create your account (email or Google login)

## Step 2: Get Your Credentials

1. After logging in, go to the **Dashboard**
2. You'll see three values at the top:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `AbCdEfGh_12345-xyzWq`)

## Step 3: Add to `.env` File

Open `DiPharma_backend/.env` and add these three lines:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace the placeholder values with your actual credentials from Step 2.

## Step 4: Restart the Backend

```bash
cd DiPharma_backend
npm run dev
```

## Step 5: Test It

1. Login to the admin panel
2. Go to **Products** or **Services**
3. Click **Edit** on any item
4. Click the **📁 Import** button next to the Image URL field
5. Select an image from your computer
6. The image will upload to Cloudinary and auto-fill the URL

## Without Cloudinary (Multer Fallback)

If you **don't** add Cloudinary credentials, the system automatically saves images locally to the `uploads/` folder. The Import button works the same way — no code changes needed.

> **Note**: Local storage is fine for development. For production, set up Cloudinary to avoid losing images on server restart/redeployment.
