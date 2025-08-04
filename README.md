# WholeExperience

WholeExperience is a mobile application built with React Native and Expo, designed as a vacation rental platform similar to Airbnb. It connects guests, property owners, and cleaning staff, offering a seamless experience for booking, managing, and reviewing vacation apartments.

## Features

### Core Functionalities
- **Search & Filter**: Find apartments by location, dates, price, and amenities.
- **User Profiles**: Distinct roles for guests, property owners, and cleaning staff.
- **Booking System**: Calendar-based availability and reservation management.
- **Automated Check-in/Out**: QR code or PIN-based access for guests.
- **Push Notifications**: Real-time updates for bookings, check-ins, and more.
- **Integrated Chat**: Direct messaging between guests and owners.
- **Ratings & Reviews**: Bidirectional feedback system for guests and owners.
- **Secure Payments**: Integrated with Stripe for safe transactions.

### Check-in/Check-out Flow
1. Guests receive check-in instructions via push notification 24 hours prior.
2. Temporary access code (QR or PIN) generated for check-in.
3. Cleaning staff notified upon check-out confirmation.
4. Post-checkout apartment condition verification.

## Tech Stack
- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore (real-time)
- **Storage**: Firebase Storage for images
- **Maps**: react-native-maps for interactive maps
- **Notifications**: Expo Notifications for push alerts
- **Payments**: Stripe SDK

## Screen Structure
1. **Splash/Onboarding**: Welcome screens for new users.
2. **Authentication**: Login and registration flows.
3. **Home**: Search bar with filters for apartments.
4. **Apartment List**: Results based on search criteria.
5. **Apartment Detail**: Gallery, description, and booking options.
6. **Booking & Payment**: Reservation and payment processing.
7. **User Profile**: Role-specific dashboard (guest/owner/cleaning).
8. **My Bookings/Properties**: Manage reservations or listings.
9. **Chat**: In-app messaging for user communication.
10. **Settings**: User preferences and account management.

## Installation
1. **Prerequisites**:
   - Node.js (v16+)
   - Expo CLI (`npm install -g expo-cli`)
   - Firebase account
   - Stripe account

2. **Setup**:
   bash
   git clone https://github.com/your-repo/WholeExperience.git
   cd WholeExperience
   npm install

3. Configuration:
## Create a .env file with the following:
  FIREBASE_API_KEY=your_firebase_api_key
  FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
  FIREBASE_PROJECT_ID=your_firebase_project_id
  FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
  FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
  FIREBASE_APP_ID=your_firebase_app_id
  STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

- Configure Firebase in firebaseConfig.js.
- Set up Expo Notifications and Stripe in app.config.js.


 4. Run the App:
 - Scan the QR code with the Expo Go app on iOS/Android or use an emulator.


- Network Errors: Handled with try-catch blocks and user-friendly alerts.
- Authentication: Validates user input and displays specific error messages (e.g., invalid email).
- Payments: Stripe error codes mapped to clear user feedback.
- Firestore: Offline support with Firebase's built-in caching.
- Logs: Centralized logging for debugging (console and Firebase Crashlytics).

## Design

- Responsive: Optimized for iOS and Android with dynamic layouts.
- UI/UX: Modern, intuitive design inspired by Airbnb, using Tailwind CSS for React Native.
- Accessibility: High-contrast colors, screen reader support, and touch-friendly components.

## Contributing

- Fork the repository.
- Create a feature branch (git checkout -b feature/your-feature).
- Commit changes (git commit -m "Add your feature").
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.

## License
- MIT License. See LICENSE for details.

### Let me know if you need further adjustments or additional details!
