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
      images: JSON.stringify(['https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Hotel_Uzbekistan.jpg/1200px-Hotel_Uzbekistan.jpg']),
      latitude: 41.3111,
      longitude: 69.2797
    },
    {
      name: 'Bibi-Khanym Hotel',
      city: 'Samarkand',
      type: 'hotel',
      price_per_night: 80.0,
      address: '12 Tashkent Road, Samarkand',
      description: 'Traditional style hotel near the Registan.',
      rating: 4.8,
      amenities: JSON.stringify(['Wi-Fi', 'Breakfast', 'Garden']),
      images: JSON.stringify(['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/6b/7c/0e/bibi-khanym-hotel.jpg?w=1200&h=-1&s=1']),
      latitude: 39.6542,
      longitude: 66.9750
    },
    {
      name: 'Old Bukhara Guesthouse',
      city: 'Bukhara',
      type: 'guesthouse',
      price_per_night: 40.0,
      address: 'Old City, Bukhara',
      description: 'Cozy guesthouse in the heart of the old city.',
      rating: 4.7,
      amenities: JSON.stringify(['Wi-Fi', 'Breakfast']),
      images: JSON.stringify(['https://cf.bstatic.com/xdata/images/hotel/max1024x768/163456789.jpg?k=1234567890abcdef']),
      latitude: 39.7747,
      longitude: 64.4286
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
      images: JSON.stringify(['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Registan_Square_Samarkand.jpg/1200px-Registan_Square_Samarkand.jpg']),
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
      images: JSON.stringify(['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Chorsu_Bazaar_Tashkent.jpg/1200px-Chorsu_Bazaar_Tashkent.jpg']),
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
      images: JSON.stringify(['https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Ichan_Kala_Khiva.jpg/1200px-Ichan_Kala_Khiva.jpg']),
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
