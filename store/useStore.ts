import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'guest' | 'host' | 'cleaner';
}

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  description: string;
  hostId: string;
}

interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  accessCode?: string;
}

interface Chat {
  id: string;
  participants: string[];
  propertyId: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // Properties
  properties: Property[];
  searchResults: Property[];
  favorites: string[];
  
  // Bookings
  bookings: Booking[];
  
  // Chat
  chats: Chat[];
  
  // UI State
  isLoading: boolean;
  searchQuery: string;
  selectedFilters: {
    location?: string;
    priceRange?: [number, number];
    dates?: { checkIn: string; checkOut: string };
    guests?: number;
    amenities?: string[];
  };
}

interface AppActions {
  // Auth Actions
  signIn: (user: User) => void;
  signOut: () => void;
  
  // Property Actions
  setProperties: (properties: Property[]) => void;
  searchProperties: (query: string) => void;
  toggleFavorite: (propertyId: string) => void;
  
  // Booking Actions
  addBooking: (booking: Booking) => void;
  updateBooking: (bookingId: string, updates: Partial<Booking>) => void;
  
  // Chat Actions
  addChat: (chat: Chat) => void;
  updateChatUnreadCount: (chatId: string, count: number) => void;
  
  // UI Actions
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<AppState['selectedFilters']>) => void;
}

export const useStore = create<AppState & AppActions>((set, get) => ({
  // Initial State
  user: null,
  isAuthenticated: false,
  properties: [],
  searchResults: [],
  favorites: [],
  bookings: [],
  chats: [],
  isLoading: false,
  searchQuery: '',
  selectedFilters: {},

  // Auth Actions
  signIn: (user) => set({ user, isAuthenticated: true }),
  signOut: () => set({ user: null, isAuthenticated: false }),

  // Property Actions
  setProperties: (properties) => set({ properties, searchResults: properties }),
  
  searchProperties: (query) => {
    const { properties } = get();
    const filtered = properties.filter(property =>
      property.title.toLowerCase().includes(query.toLowerCase()) ||
      property.location.toLowerCase().includes(query.toLowerCase())
    );
    set({ searchResults: filtered, searchQuery: query });
  },
  
  toggleFavorite: (propertyId) => {
    const { favorites } = get();
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    set({ favorites: newFavorites });
  },

  // Booking Actions
  addBooking: (booking) => {
    const { bookings } = get();
    set({ bookings: [...bookings, booking] });
  },
  
  updateBooking: (bookingId, updates) => {
    const { bookings } = get();
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, ...updates } : booking
    );
    set({ bookings: updatedBookings });
  },

  // Chat Actions
  addChat: (chat) => {
    const { chats } = get();
    set({ chats: [...chats, chat] });
  },
  
  updateChatUnreadCount: (chatId, count) => {
    const { chats } = get();
    const updatedChats = chats.map(chat =>
      chat.id === chatId ? { ...chat, unreadCount: count } : chat
    );
    set({ chats: updatedChats });
  },

  // UI Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => {
    const { selectedFilters } = get();
    set({ selectedFilters: { ...selectedFilters, ...filters } });
  },
}));