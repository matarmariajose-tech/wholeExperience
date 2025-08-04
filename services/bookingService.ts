import { sendCheckInReminder, sendAccessCode, sendCleaningNotification } from '@/components/NotificationManager';

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  hostId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  accessCode?: string;
  specialRequests?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

class BookingService {
  private bookings: Booking[] = [];

  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'paymentStatus'>): Promise<Booking> {
    const booking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.bookings.push(booking);
    
    // Send confirmation notification
    await this.scheduleBookingNotifications(booking);
    
    return booking;
  }

  async confirmBooking(bookingId: string): Promise<Booking> {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.status = 'confirmed';
    booking.paymentStatus = 'paid';
    booking.accessCode = this.generateAccessCode();

    // Schedule check-in reminder
    await sendCheckInReminder('Guest', 'Property Title');
    
    return booking;
  }

  async startCheckIn(bookingId: string): Promise<{ accessCode: string }> {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    if (!booking.accessCode) {
      booking.accessCode = this.generateAccessCode();
    }

    booking.status = 'active';
    
    // Send access code to guest
    await sendAccessCode(booking.accessCode, 'Property Title');
    
    return { accessCode: booking.accessCode };
  }

  async completeCheckOut(bookingId: string): Promise<void> {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.status = 'completed';
    
    // Notify cleaning team
    await sendCleaningNotification('Property Title', new Date().toLocaleTimeString());
  }

  async cancelBooking(bookingId: string, reason: string): Promise<Booking> {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.status = 'cancelled';
    
    // Handle refund logic here
    const refundAmount = this.calculateRefund(booking);
    if (refundAmount > 0) {
      booking.paymentStatus = 'refunded';
    }
    
    return booking;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return this.bookings.filter(b => b.guestId === userId);
  }

  async getBookingsByProperty(propertyId: string): Promise<Booking[]> {
    return this.bookings.filter(b => b.propertyId === propertyId);
  }

  private generateAccessCode(): string {
    // Generate a 6-digit access code
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private calculateRefund(booking: Booking): number {
    const now = new Date();
    const checkInDate = new Date(booking.checkIn);
    const hoursUntilCheckIn = (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    // Free cancellation 48 hours before check-in
    if (hoursUntilCheckIn > 48) {
      return booking.total;
    }
    
    // 50% refund 24 hours before check-in
    if (hoursUntilCheckIn > 24) {
      return booking.total * 0.5;
    }
    
    // No refund after 24 hours
    return 0;
  }

  private async scheduleBookingNotifications(booking: Booking): Promise<void> {
    // In a real app, you would schedule notifications based on check-in date
    // For demo purposes, we'll just log the booking
    console.log('Booking notifications scheduled for:', booking.id);
  }
}

export const bookingService = new BookingService();