import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Heart } from 'lucide-react-native';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    reviews: number;
    images: string[];
  };
  isFavorite?: boolean;
  onPress: () => void;
  onToggleFavorite?: () => void;
}

export default function PropertyCard({ 
  property, 
  isFavorite = false, 
  onPress, 
  onToggleFavorite 
}: PropertyCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.images[0] }} style={styles.image} />
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={onToggleFavorite}
        >
          <Heart 
            size={20} 
            color={isFavorite ? "#FF5A5F" : "#fff"} 
            fill={isFavorite ? "#FF5A5F" : "transparent"}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {property.title}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {property.rating}</Text>
            <Text style={styles.reviews}>({property.reviews})</Text>
          </View>
        </View>
        
        <Text style={styles.location}>{property.location}</Text>
        
        <Text style={styles.priceText}>
          <Text style={styles.price}>${property.price}</Text>
          <Text style={styles.priceUnit}> /night</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
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
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
  },
  priceText: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#222',
  },
  priceUnit: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
});