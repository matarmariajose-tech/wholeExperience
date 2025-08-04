import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Calendar, Users, CreditCard } from 'lucide-react-native';

export default function BookingScreen() {
  const { propertyId } = useLocalSearchParams();
  const [checkInDate, setCheckInDate] = useState('Jan 15, 2025');
  const [checkOutDate, setCheckOutDate] = useState('Jan 18, 2025');
  const [guests, setGuests] = useState(2);

  const pricePerNight = 120;
  const nights = 3;
  const subtotal = pricePerNight * nights;
  const serviceFee = 36;
  const taxes = 24;
  const total = subtotal + serviceFee + taxes;

  const handleReserve = () => {
    Alert.alert(
      'Booking Confirmed',
      'Your reservation has been confirmed! Check-in instructions will be sent to your email 24 hours before arrival.',
      [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)/bookings'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm and pay</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trip Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your trip</Text>
          
          <View style={styles.tripDetail}>
            <View style={styles.tripDetailRow}>
              <View style={styles.tripDetailLeft}>
                <Calendar size={20} color="#666" />
                <View style={styles.tripDetailText}>
                  <Text style={styles.tripDetailLabel}>Dates</Text>
                  <Text style={styles.tripDetailValue}>{checkInDate} - {checkOutDate}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tripDetail}>
            <View style={styles.tripDetailRow}>
              <View style={styles.tripDetailLeft}>
                <Users size={20} color="#666" />
                <View style={styles.tripDetailText}>
                  <Text style={styles.tripDetailLabel}>Guests</Text>
                  <Text style={styles.tripDetailValue}>{guests} guests</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment method</Text>
          <TouchableOpacity style={styles.paymentMethod}>
            <View style={styles.paymentMethodLeft}>
              <CreditCard size={20} color="#666" />
              <View style={styles.paymentMethodText}>
                <Text style={styles.paymentMethodLabel}>Credit Card</Text>
                <Text style={styles.paymentMethodValue}>•••• •••• •••• 4242</Text>
              </View>
            </View>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price details</Text>
          
          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>${pricePerNight} x {nights} nights</Text>
              <Text style={styles.priceValue}>${subtotal}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Service fee</Text>
              <Text style={styles.priceValue}>${serviceFee}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Taxes</Text>
              <Text style={styles.priceValue}>${taxes}</Text>
            </View>
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total (USD)</Text>
              <Text style={styles.totalValue}>${total}</Text>
            </View>
          </View>
        </View>

        {/* Cancellation Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cancellation policy</Text>
          <Text style={styles.policyText}>
            Free cancellation before Jan 8. Cancel before check-in on Jan 15 for a partial refund.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
          <Text style={styles.reserveButtonText}>Confirm and pay</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
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
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
    marginBottom: 16,
  },
  tripDetail: {
    marginBottom: 16,
  },
  tripDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripDetailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tripDetailText: {
    marginLeft: 16,
    flex: 1,
  },
  tripDetailLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
    marginBottom: 2,
  },
  tripDetailValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  editText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF5A5F',
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodText: {
    marginLeft: 16,
    flex: 1,
  },
  paymentMethodLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
    marginBottom: 2,
  },
  paymentMethodValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  priceBreakdown: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  priceValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#222',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#222',
  },
  policyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 20,
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 34,
  },
  reserveButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FF5A5F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  reserveButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
});