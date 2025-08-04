import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  UtensilsCrossed,
  Waves,
  Wind
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const mockProperty = {
  id: '1',
  title: 'Modern Downtown Loft with Stunning City Views',
  location: 'Mexico City, CDMX',
  price: 120,
  rating: 4.8,
  reviews: 64,
  host: {
    name: 'Carlos Rodriguez',
    image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
    verified: true,
  },
  images: [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
  ],
  amenities: [
    { icon: Wifi, name: 'WiFi' },
    { icon: UtensilsCrossed, name: 'Kitchen' },
    { icon: Car, name: 'Parking' },
    { icon: Wind, name: 'AC' },
    { icon: Waves, name: 'Pool' },
  ],
  description: 'Beautiful modern loft in the heart of Mexico City. Perfect for business travelers and couples looking for a stylish stay. The space features floor-to-ceiling windows with stunning city views, a fully equipped kitchen, and premium amenities.',
  rules: [
    'Check-in: 3:00 PM - 11:00 PM',
    'Check-out: 11:00 AM',
    'No smoking',
    'No parties or events',
    'Pets allowed',
  ],
};

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBookPress = () => {
    router.push(`/booking/${id}`);
  };

  return (
    <View style={styles.container}>
      {/* Image Gallery */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentImageIndex(index);
        }}
        style={styles.imageGallery}
      >
        {mockProperty.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.propertyImage} />
        ))}
      </ScrollView>

      {/* Image Indicators */}
      <View style={styles.imageIndicators}>
        {mockProperty.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentImageIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      {/* Header Overlay */}
      <View style={styles.headerOverlay}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Share size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart 
              size={20} 
              color={isFavorite ? "#FF5A5F" : "#fff"} 
              fill={isFavorite ? "#FF5A5F" : "transparent"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.propertyInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.propertyTitle}>{mockProperty.title}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFB400" fill="#FFB400" />
              <Text style={styles.rating}>{mockProperty.rating}</Text>
              <Text style={styles.reviews}>({mockProperty.reviews} reviews)</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <MapPin size={16} color="#666" />
            <Text style={styles.location}>{mockProperty.location}</Text>
          </View>

          {/* Host Info */}
          <View style={styles.hostContainer}>
            <Image source={{ uri: mockProperty.host.image }} style={styles.hostImage} />
            <View style={styles.hostInfo}>
              <Text style={styles.hostName}>Hosted by {mockProperty.host.name}</Text>
              <Text style={styles.hostStatus}>Superhost • Joined 2019</Text>
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {mockProperty.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <amenity.icon size={20} color="#666" />
                  <Text style={styles.amenityText}>{amenity.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this place</Text>
            <Text style={styles.description}>{mockProperty.description}</Text>
          </View>

          {/* House Rules */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>House Rules</Text>
            {mockProperty.rules.map((rule, index) => (
              <Text key={index} style={styles.ruleText}>• {rule}</Text>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            <Text style={styles.price}>${mockProperty.price}</Text>
            <Text style={styles.priceUnit}> /night</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookPress}>
          <Text style={styles.bookButtonText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageGallery: {
    height: 300,
  },
  propertyImage: {
    width,
    height: 300,
    resizeMode: 'cover',
  },
  imageIndicators: {
    position: 'absolute',
    top: 260,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  propertyInfo: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  propertyTitle: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#222',
    lineHeight: 28,
    marginRight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 6,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 24,
  },
  hostImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
    marginBottom: 2,
  },
  hostStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#222',
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginBottom: 12,
  },
  amenityText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 24,
  },
  ruleText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
    lineHeight: 24,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 34,
  },
  priceContainer: {
    flex: 1,
  },
  priceText: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#222',
  },
  priceUnit: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#FF5A5F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
});