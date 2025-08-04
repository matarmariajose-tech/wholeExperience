export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateRange = (startDate: Date | string, endDate: Date | string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startFormatted = start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  const endFormatted = end.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  return `${startFormatted} - ${endFormatted}`;
};

export const calculateNights = (checkIn: Date | string, checkOut: Date | string): number => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const timeDiff = end.getTime() - start.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

export const isDateInPast = (date: Date | string): boolean => {
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
};

export const isDateAvailable = (date: Date | string, bookedDates: string[]): boolean => {
  const dateString = new Date(date).toISOString().split('T')[0];
  return !bookedDates.includes(dateString);
};

export const getAvailableDatesInRange = (
  startDate: Date | string, 
  endDate: Date | string, 
  bookedDates: string[]
): string[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const availableDates: string[] = [];
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (isDateAvailable(d, bookedDates)) {
      availableDates.push(d.toISOString().split('T')[0]);
    }
  }
  
  return availableDates;
};