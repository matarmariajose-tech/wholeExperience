import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data for properties
const mockProperties = [
  {
    id: '1',
    title: 'Modern Downtown Loft',
    location: 'Mexico City, CDMX',
    price: 120,
    rating: 4.8,
    reviews: 64,
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    amenities: ['WiFi', 'Kitchen', 'Parking'],
  },
  {
    id: '2',
    title: 'Beachfront Paradise',
    location: 'Cancun, Quintana Roo',
    price: 200,
    rating: 4.9,
    reviews: 128,
    images: ['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'],
    amenities: ['Pool', 'Beach Access', 'WiFi'],
  },
  {
    id: '3',
    title: 'Cozy Studio Apartment',
    location: 'Guadalajara, Jalisco',
    price: 85,
    rating: 4.7,
    reviews: 32,
    images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'],
    amenities: ['WiFi', 'Kitchen', 'AC'],
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Apartments', 'Houses', 'Studios', 'Lofts'];

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>WholeExperience</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={24} color="#FF5A5F" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Where are you going?"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Quick Filters */}
        <View style={styles.quickFilters}>
          <TouchableOpacity style={styles.quickFilterItem}>
            <MapPin size={18} color="#FF5A5F" />
            <Text style={styles.quickFilterText}>Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickFilterItem}>
            <Calendar size={18} color="#FF5A5F" />
            <Text style={styles.quickFilterText}>Dates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickFilterItem}>
            <Users size={18} color="#FF5A5F" />
            <Text style={styles.quickFilterText}>Guests</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.categoryItemActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Properties Grid */}
        <View style={styles.propertiesContainer}>
          {mockProperties.map((property) => (
            <TouchableOpacity
              key={property.id}
              style={styles.propertyCard}
              onPress={() => handlePropertyPress(property.id)}
            >
              <Image source={{ uri: property.images[0] }} style={styles.propertyImage} />
              <View style={styles.propertyContent}>
                <View style={styles.propertyHeader}>
                  <Text style={styles.propertyTitle} numberOfLines={1}>
                    {property.title}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>★ {property.rating}</Text>
                    <Text style={styles.reviews}>({property.reviews})</Text>
                  </View>
                </View>
                <Text style={styles.propertyLocation}>{property.location}</Text>
                <View style={styles.amenitiesContainer}>
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <View key={amenity} style={styles.amenityTag}>
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.priceText}>
                  <Text style={styles.price}>${property.price}</Text>
                  <Text style={styles.priceUnit}> /night</Text>
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#222',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#222',
  },
  quickFilters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  quickFilterItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickFilterText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  categoriesContainer: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryItemActive: {
    backgroundColor: '#FF5A5F',
    borderColor: '#FF5A5F',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  propertiesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  propertyContent: {
    padding: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  propertyTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF5A5F',
  },
  reviews: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginLeft: 2,
  },
  propertyLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 12,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 6,
  },
  amenityTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  amenityText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  priceText: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#222',
  },
  priceUnit: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
});