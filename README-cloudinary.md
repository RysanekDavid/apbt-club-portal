# Cloudinary Integration Guide

This project uses Cloudinary for image storage and management. Follow these steps to set up Cloudinary for your project.

## Why Cloudinary?

Cloudinary offers a free tier that is suitable for small to medium-sized projects, making it a cost-effective alternative to Firebase Storage's Blaze plan. Cloudinary provides:

- 25GB of storage
- 25GB of monthly bandwidth
- Advanced image transformations
- CDN delivery
- Secure uploads

## Setup Instructions

### 1. Create a Cloudinary Account

1. Go to [Cloudinary's website](https://cloudinary.com/) and sign up for a free account
2. After signing up, you'll be taken to your dashboard

### 2. Get Your Cloudinary Credentials

From your Cloudinary dashboard, collect the following information:

- **Cloud Name**: Your unique cloud identifier (e.g., `dvm7rpskp`)
- **API Key**: Your API access key (e.g., `338424469597866`)

### 3. Create an Upload Preset

1. In your Cloudinary dashboard, go to **Settings** > **Upload**
2. Scroll down to **Upload presets** and click **Add upload preset**
3. Configure the preset:
   - Set a name for your preset (e.g., `klub_apbt_preset`)
   - Set **Signing Mode** to **Unsigned**
   - Configure any other settings as needed (folder structure, transformations, etc.)
4. Save the preset

### 4. Update Environment Variables

Update your `.env.local` file with your Cloudinary credentials:

```
VITE_CLOUDINARY_CLOUD_NAME="dvm7rpskp"
VITE_CLOUDINARY_API_KEY="338424469597866"
VITE_CLOUDINARY_UPLOAD_PRESET="klub_apbt_preset"
```

### 5. Test Your Configuration

After setting up the environment variables and creating the upload preset, restart your development server and test the image upload functionality in the admin panel.

## Usage Notes

- The project now uses the `CloudinaryUpload` component for all image uploads
- Images are stored in Cloudinary with folder organization matching the previous Firebase Storage structure
- Image transformations can be applied using the `getTransformedUrl` function in `src/services/cloudinary.ts`

## Security Considerations

- The current implementation uses client-side uploads with an unsigned upload preset
- For production, consider implementing a server-side upload solution that uses your API secret for signed uploads
- You can restrict upload capabilities by configuring your upload preset settings in Cloudinary

## Troubleshooting

If you encounter issues with Cloudinary uploads:

1. Verify your Cloudinary credentials in the `.env.local` file
2. Check that your upload preset is configured correctly and is set to "unsigned"
3. Check browser console for any error messages
4. Verify that your Cloudinary account has sufficient resources available

For more information, refer to the [Cloudinary documentation](https://cloudinary.com/documentation).
