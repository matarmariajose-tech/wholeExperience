import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { X, MapPin, Calendar, Users, DollarSign } from 'lucide-react-native';

interface SearchFiltersProps {
  visible: boolean;
  onClose: () => void;
  filters: {
    location?: string;
    priceRange?: [number, number];
    dates?: { checkIn: string; checkOut: string };
    guests?: number;
    amenities?: string[];
  };
  onApplyFilters: (filters: any) => void;
}

export default function SearchFilters({
  visible,
  onClose,
  filters,
  onApplyFilters,
}: SearchFiltersProps) {
  const amenitiesList = [
    'WiFi',
    'Kitchen',
    'Parking',
    'Pool',
    'Gym',
    'Balcony',
    'AC',
    'Heating',
    'Pet Friendly',
    'Smoking Allowed',
  ];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={() => onApplyFilters({})}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <TouchableOpacity style={styles.filterOption}>
              <MapPin size={20} color="#666" />
              <Text style={styles.filterOptionText}>
                {filters.location || 'Any location'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Dates */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dates</Text>
            <TouchableOpacity style={styles.filterOption}>
              <Calendar size={20} color="#666" />
              <Text style={styles.filterOptionText}>
                {filters.dates 
                  ? `${filters.dates.checkIn} - ${filters.dates.checkOut}`
                  : 'Any dates'
                }
              </Text>
            </TouchableOpacity>
          </View>

          {/* Guests */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Guests</Text>
            <TouchableOpacity style={styles.filterOption}>
              <Users size={20} color="#666" />
              <Text style={styles.filterOptionText}>
                {filters.guests ? `${filters.guests} guests` : 'Any number'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <TouchableOpacity style={styles.filterOption}>
              <DollarSign size={20} color="#666" />
              <Text style={styles.filterOptionText}>
                {filters.priceRange 
                  ? `$${filters.priceRange[0]} - $${filters.priceRange[1]}`
                  : 'Any price'
                }
              </Text>
            </TouchableOpacity>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {amenitiesList.map((amenity) => (
                <TouchableOpacity 
                  key={amenity} 
                  style={[
                    styles.amenityTag,
                    filters.amenities?.includes(amenity) && styles.amenityTagActive,
                  ]}
                >
                  <Text 
                    style={[
                      styles.amenityTagText,
                      filters.amenities?.includes(amenity) && styles.amenityTagTextActive,
                    ]}
                  >
                    {amenity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={() => {
              onApplyFilters(filters);
              onClose();
            }}
          >
            <Text style={styles.applyButtonText}>Show results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
  },
  clearText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FF5A5F',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 12,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  amenityTagActive: {
    backgroundColor: '#FF5A5F',
    borderColor: '#FF5A5F',
  },
  amenityTagText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  amenityTagTextActive: {
    color: '#fff',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  applyButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
});