const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password_hash: hashedPassword,
      country: 'USA'
    },
  });

  // Clear existing data
  await prisma.bookingStay.deleteMany({});
  await prisma.bookingAttraction.deleteMany({});
  await prisma.photo.deleteMany({});
  await prisma.favorite.deleteMany({});
  await prisma.stay.deleteMany({});
  await prisma.attraction.deleteMany({});

  // Create Stays
  const stays = [
    {
      name: 'Hotel Uzbekistan',
      city: 'Tashkent',
      type: 'hotel',
      price_per_night: 120.0,
      address: '45 Amir Temur Avenue, Tashkent',
      description: 'Iconic hotel in the center of Tashkent.',
      rating: 4.5,
      amenities: JSON.stringify(['Wi-Fi', 'Breakfast', 'Pool', 'Gym']),
      images: JSON.stringify(['/images/hotelImages/UzbHotel.jpeg']),
      latitude: 41.3111,
      longitude: 69.2797
    },
    {
      name: 'Khiva Place',
      city: 'Khiva',
      type: 'hotel',
      price_per_night: 90.0,
      address: 'Old City, Khiva',
      description: 'Beautiful hotel with traditional architecture in Khiva.',
      rating: 4.7,
      amenities: JSON.stringify(['Wi-Fi', 'Breakfast', 'Terrace']),
      images: JSON.stringify(['/images/hotelImages/KhivaPlaseHotel.jpg']),
      latitude: 41.3783,
      longitude: 60.3639
    },
    {
      name: 'Shaxrizoda Hotel',
      city: 'Samarkand',
      type: 'hotel',
      price_per_night: 75.0,
      address: 'Near Registan, Samarkand',
      description: 'Comfortable stay with easy access to historical sites.',
      rating: 4.6,
      amenities: JSON.stringify(['Wi-Fi', 'Breakfast', 'Garden']),
      images: JSON.stringify(['/images/hotelImages/HotelSh.png']),
      latitude: 39.6542,
      longitude: 66.9750
    },
    {
      name: 'Ideal Hotel',
      city: 'Tashkent',
      type: 'hotel',
      price_per_night: 60.0,
      address: 'Tashkent City Center',
      description: 'Modern amenities and excellent service.',
      rating: 4.4,
      amenities: JSON.stringify(['Wi-Fi', 'Parking', 'Bar']),
      images: JSON.stringify(['/images/hotelImages/IdealHotel.png']),
      latitude: 41.2995,
      longitude: 69.2401
    }
  ];

  for (const stay of stays) {
    await prisma.stay.create({ data: stay });
  }

  // Create Attractions
  const attractions = [
    {
      name: 'Registan Square',
      city: 'Samarkand',
      category: 'Historical',
      description: 'The heart of the ancient city of Samarkand of the Timurid dynasty.',
      recommended_time: '2 hours',
      best_time: 'Sunset',
      rating: 5.0,
      images: JSON.stringify(['/images/attractions/Registan-Uzbekistan.jpg']),
      latitude: 39.6548,
      longitude: 66.9757
    },
    {
      name: 'Chorsu Bazaar',
      city: 'Tashkent',
      category: 'Cultural',
      description: 'Traditional bazaar located in the center of the old town of Tashkent.',
      recommended_time: '1.5 hours',
      best_time: 'Morning',
      rating: 4.6,
      images: JSON.stringify(['/images/attractions/ChorsuBazar.jpg']),
      latitude: 41.3265,
      longitude: 69.2365
    },
    {
      name: 'Ichan Kala',
      city: 'Khiva',
      category: 'Historical',
      description: 'Walled inner town of the city of Khiva.',
      recommended_time: 'Half day',
      best_time: 'All day',
      rating: 4.9,
      images: JSON.stringify(['/images/attractions/ichan-kala.jpg']),
      latitude: 41.3783,
      longitude: 60.3639
    }
  ];

  for (const attraction of attractions) {
    await prisma.attraction.create({ data: attraction });
  }

  console.log('Seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
