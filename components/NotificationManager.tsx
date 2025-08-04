import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationManager() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    
    // Listen for notifications when app is in foreground
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification received in foreground:', notification);
      }
    );

    // Listen for notification interactions
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Notification response:', response);
        // Handle navigation based on notification data
      }
    );

    return () => {
      foregroundSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return null;
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'web') {
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  console.log('Push token:', token.data);

  return token.data;
}

// Utility functions for sending notifications
export const sendCheckInReminder = async (guestName: string, propertyTitle: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Check-in Tomorrow!',
      body: `Hi ${guestName}, your stay at ${propertyTitle} begins tomorrow. We'll send check-in instructions soon.`,
      data: { type: 'check_in_reminder' },
    },
    trigger: { seconds: 2 }, // In real app, this would be 24 hours before
  });
};

export const sendAccessCode = async (accessCode: string, propertyTitle: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Your Access Code is Ready',
      body: `Access code for ${propertyTitle}: ${accessCode}. Valid for your entire stay.`,
      data: { type: 'access_code', code: accessCode },
    },
    trigger: { seconds: 2 }, // In real app, this would be 2 hours before check-in
  });
};

export const sendCleaningNotification = async (propertyTitle: string, checkOutTime: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Cleaning Required',
      body: `Guest has checked out of ${propertyTitle} at ${checkOutTime}. Please prepare for cleaning.`,
      data: { type: 'cleaning_required' },
    },
    trigger: { seconds: 1 },
  });
};