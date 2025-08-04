import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, QrCode, MessageSquare } from 'lucide-react-native';

const mockBookings = [
  {
    id: '1',
    propertyTitle: 'Modern Downtown Loft',
    location: 'Mexico City, CDMX',
    checkIn: '2025-01-15',
    checkOut: '2025-01-18',
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    total: 360,
  },
  {
    id: '2',
    propertyTitle: 'Beachfront Paradise',
    location: 'Cancun, Quintana Roo',
    checkIn: '2024-12-20',
    checkOut: '2024-12-25',
    status: 'completed',
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
    total: 1000,
  },
];

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredBookings = mockBookings.filter(booking => {
    if (activeTab === 'upcoming') {
      return booking.status === 'upcoming';
    }
    return booking.status === 'completed';
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Trips</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <Image source={{ uri: booking.image }} style={styles.bookingImage} />
              <View style={styles.bookingContent}>
                <Text style={styles.bookingTitle}>{booking.propertyTitle}</Text>
                <Text style={styles.bookingLocation}>{booking.location}</Text>
                
                <View style={styles.dateContainer}>
                  <Calendar size={16} color="#666" />
                  <Text style={styles.dateText}>
                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </Text>
                </View>

                <Text style={styles.totalText}>Total: ${booking.total}</Text>

                {booking.status === 'upcoming' && (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}>
                      <QrCode size={16} color="#FF5A5F" />
                      <Text style={styles.actionButtonText}>Check-in Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <MessageSquare size={16} color="#FF5A5F" />
                      <Text style={styles.actionButtonText}>Contact Host</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {booking.status === 'completed' && (
                  <TouchableOpacity style={styles.reviewButton}>
                    <Text style={styles.reviewButtonText}>Write Review</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Calendar size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>
              {activeTab === 'upcoming' ? 'No upcoming trips' : 'No past trips'}
            </Text>
            <Text style={styles.emptyDescription}>
              {activeTab === 'upcoming' 
                ? 'Book your next adventure and it will show up here'
                : 'Your travel history will appear here after your trips'
              }
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FF5A5F',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bookingImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  bookingContent: {
    padding: 16,
  },
  bookingTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
    marginBottom: 4,
  },
  bookingLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
    marginLeft: 6,
  },
  totalText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF5A5F',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF5A5F',
    marginLeft: 6,
  },
  reviewButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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
    paddingHorizontal: 40,
  },
});