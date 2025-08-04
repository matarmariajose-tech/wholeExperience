import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, Phone, Video } from 'lucide-react-native';

const mockMessages = [
  {
    id: '1',
    text: 'Hi! Welcome to Barcelona. I\'m excited to host you at my downtown loft.',
    sender: 'host',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    text: 'Thank you! I\'m looking forward to staying there. What time is check-in?',
    sender: 'guest',
    timestamp: '10:35 AM',
  },
  {
    id: '3',
    text: 'Check-in is available from 3:00 PM. I\'ll send you the access code 2 hours before your arrival.',
    sender: 'host',
    timestamp: '10:37 AM',
  },
  {
    id: '4',
    text: 'Perfect! Is there parking available?',
    sender: 'guest',
    timestamp: '10:40 AM',
  },
  {
    id: '5',
    text: 'Yes, there\'s a parking garage right next to the building. I\'ll include the details in the check-in instructions.',
    sender: 'host',
    timestamp: '10:42 AM',
  },
];

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      setNewMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#222" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.hostName}>Carlos Rodriguez</Text>
          <Text style={styles.propertyName}>Modern Downtown Loft</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerAction}>
            <Phone size={20} color="#FF5A5F" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerAction}>
            <Video size={20} color="#FF5A5F" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Messages */}
        <ScrollView 
          style={styles.messagesContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {mockMessages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.sender === 'guest' && styles.guestMessageContainer,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.sender === 'guest' && styles.guestMessageBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.sender === 'guest' && styles.guestMessageText,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
              <Text
                style={[
                  styles.messageTimestamp,
                  message.sender === 'guest' && styles.guestMessageTimestamp,
                ]}
              >
                {message.timestamp}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={20} color={newMessage.trim() ? '#fff' : '#ccc'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
  },
  propertyName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerAction: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  guestMessageContainer: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  guestMessageBubble: {
    backgroundColor: '#FF5A5F',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#222',
    lineHeight: 22,
  },
  guestMessageText: {
    color: '#fff',
  },
  messageTimestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginTop: 4,
    marginLeft: 16,
  },
  guestMessageTimestamp: {
    marginLeft: 0,
    marginRight: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 34,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#222',
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5A5F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});
