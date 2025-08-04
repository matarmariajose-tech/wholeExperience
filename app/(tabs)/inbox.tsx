import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Clock } from 'lucide-react-native';
import { router } from 'expo-router';

const mockChats = [
  {
    id: '1',
    propertyTitle: 'Modern Downtown Loft',
    hostName: 'Carlos Rodriguez',
    lastMessage: 'Check-in instructions have been sent to your email',
    timestamp: '2 hours ago',
    unread: true,
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
  },
  {
    id: '2',
    propertyTitle: 'Beachfront Paradise',
    hostName: 'Maria Gonzalez',
    lastMessage: 'Thank you for staying with us! How was your experience?',
    timestamp: '1 day ago',
    unread: false,
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
  },
  {
    id: '3',
    propertyTitle: 'Cozy Studio Apartment',
    hostName: 'Ana Martinez',
    lastMessage: 'The WiFi password is in the welcome packet',
    timestamp: '3 days ago',
    unread: false,
    avatar: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg',
  },
];

export default function InboxScreen() {
  const handleChatPress = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockChats.length > 0 ? (
          mockChats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => handleChatPress(chat.id)}
            >
              <Image source={{ uri: chat.avatar }} style={styles.avatar} />
              
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.hostName}>{chat.hostName}</Text>
                  <View style={styles.timeContainer}>
                    <Clock size={12} color="#999" />
                    <Text style={styles.timestamp}>{chat.timestamp}</Text>
                  </View>
                </View>
                
                <Text style={styles.propertyTitle} numberOfLines={1}>
                  {chat.propertyTitle}
                </Text>
                
                <Text 
                  style={[styles.lastMessage, chat.unread && styles.unreadMessage]} 
                  numberOfLines={2}
                >
                  {chat.lastMessage}
                </Text>
              </View>

              {chat.unread && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MessageCircle size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptyDescription}>
              Messages from hosts will appear here when you book a property
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#222',
  },
  content: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  hostName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginLeft: 4,
  },
  propertyTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 20,
  },
  unreadMessage: {
    fontFamily: 'Inter-Medium',
    color: '#222',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5A5F',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});