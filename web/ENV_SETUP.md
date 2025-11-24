# Environment Variables Setup

## For Netlify Deployment

After deploying your app to Netlify, you need to configure the following environment variables in your Netlify dashboard:

### Steps:

1. Go to your Netlify dashboard
2. Select your site (Easy_MEAL)
3. Navigate to: **Site settings** > **Environment variables**
4. Add the following variables:

### Required Environment Variables:

```
VITE_SPOONACULAR_API_KEY=94359157b21645a08e4ab6eacdf021fc
VITE_SITE_URL=https://your-app-name.netlify.app
```

**Important:** Replace `https://your-app-name.netlify.app` with your actual Netlify site URL.

### Why is VITE_SITE_URL needed?

This ensures that when users click the confirmation link in their email after signing up, they are redirected to your production site instead of localhost:3000.

### Supabase Configuration

You also need to add your Netlify URL to Supabase's allowed redirect URLs:

1. Go to your Supabase dashboard
2. Navigate to: **Authentication** > **URL Configuration**
3. Add your Netlify URL to the **Redirect URLs** list:
   - `https://your-app-name.netlify.app`
   - `https://your-app-name.netlify.app/`

This allows Supabase to redirect users back to your app after email confirmation.

## For Local Development

The app will automatically use `http://localhost:5173` when running locally, so no additional configuration is needed for development.
