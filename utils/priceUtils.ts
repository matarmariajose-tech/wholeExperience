export const calculateTotalPrice = (
  pricePerNight: number,
  nights: number,
  serviceFeePercentage: number = 0.10,
  taxPercentage: number = 0.08
): {
  subtotal: number;
  serviceFee: number;
  taxes: number;
  total: number;
} => {
  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * serviceFeePercentage);
  const taxes = Math.round(subtotal * taxPercentage);
  const total = subtotal + serviceFee + taxes;

  return {
    subtotal,
    serviceFee,
    taxes,
    total,
  };
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceWithCents = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculatePricePerGuest = (totalPrice: number, guests: number): number => {
  return totalPrice / guests;
};

export const applyDiscount = (originalPrice: number, discountPercentage: number): number => {
  return originalPrice * (1 - discountPercentage / 100);
};

export const calculateWeeklyDiscount = (pricePerNight: number, nights: number): number => {
  // Apply 10% discount for weekly stays (7+ nights)
  if (nights >= 7) {
    return pricePerNight * nights * 0.10;
  }
  return 0;
};

export const calculateMonthlyDiscount = (pricePerNight: number, nights: number): number => {
  // Apply 20% discount for monthly stays (28+ nights)
  if (nights >= 28) {
    return pricePerNight * nights * 0.20;
  }
  return 0;
};