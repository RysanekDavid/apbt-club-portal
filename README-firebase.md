# Firebase Setup Instructions

This document provides instructions on how to set up Firebase for the KLUB APBT application.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click on "Add project" and follow the steps to create a new project
3. Give your project a name (e.g., "klub-apbt")
4. Choose whether to enable Google Analytics (recommended)
5. Accept the terms and click "Create project"

## Step 2: Register Your Web App

1. From the Firebase project dashboard, click on the web icon (</>) to add a web app
2. Give your app a nickname (e.g., "klub-apbt-web")
3. Check the box for "Also set up Firebase Hosting" if you plan to deploy the app using Firebase Hosting
4. Click "Register app"
5. Firebase will generate configuration code. Keep this page open as you'll need these values

## Step 3: Update Firebase Configuration

1. Open the file `src/firebase/config.ts` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual API key
  authDomain: "YOUR_AUTH_DOMAIN", // Replace with your actual auth domain
  projectId: "YOUR_PROJECT_ID", // Replace with your actual project ID
  storageBucket: "YOUR_STORAGE_BUCKET", // Replace with your actual storage bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your actual messaging sender ID
  appId: "YOUR_APP_ID", // Replace with your actual app ID
  measurementId: "YOUR_MEASUREMENT_ID", // Replace with your actual measurement ID
};
```

## Step 4: Set Up Authentication

1. In the Firebase Console, go to "Authentication" from the left sidebar
2. Click on the "Get started" button
3. Enable the "Email/Password" sign-in method
4. Optionally, enable the "Google" sign-in method if you want to allow Google login
5. Save your changes

## Step 5: Create Admin Users

1. Go to the "Authentication" section in Firebase Console
2. Click on "Add user"
3. Enter the email and password for your admin users (the two female users)
4. Click "Add user"

## Step 6: Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database" from the left sidebar
2. Click on "Create database"
3. Choose "Start in production mode" and click "Next"
4. Select a location for your database that's closest to your users (e.g., "eur3" for Europe)
5. Click "Enable"

## Step 7: Set Up Security Rules

1. In the Firestore Database section, go to the "Rules" tab
2. Update the rules to secure your database. Here's a basic example:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all users for public collections
    match /news/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /events/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /sponsors/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /documents/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Deny access to all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Step 8: Set Up Storage

1. In the Firebase Console, go to "Storage" from the left sidebar
2. Click on "Get started"
3. Choose "Start in production mode" and click "Next"
4. Select the same location as your Firestore Database
5. Click "Done"

## Step 9: Update Storage Rules

1. In the Storage section, go to the "Rules" tab
2. Update the rules to secure your storage. Here's a basic example:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 10: Test Your Configuration

1. Run your application locally
2. Try to log in with one of the admin users you created
3. Verify that you can access the admin section
4. Test creating, reading, updating, and deleting data

## Additional Notes

- Keep your Firebase configuration secure and never commit it to public repositories
- Consider using environment variables for sensitive information in production
- Regularly review and update your security rules as your application evolves
- Monitor your Firebase usage to avoid unexpected costs
- Set up Firebase backups for your Firestore data

For more detailed information, refer to the [Firebase documentation](https://firebase.google.com/docs).
