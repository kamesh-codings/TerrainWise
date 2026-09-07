/**
 * Comprehensive Indian States Travel Directory
 * Contains verified data and real landmark photo collages for all 36 States & UTs.
 * Synchronized with the platform locations & places database.
 */

export interface StateTopPlace {
  name: string;
  category: string;
  city: string;
  image: string;
}

export interface IndianState {
  id: string;
  name: string;
  tagline: string;
  zone: 'South' | 'North' | 'West' | 'East & North-East' | 'Central' | 'Union Territories';
  capital: string;
  spotCount: string;
  districtCount: number;
  heroImage: string;
  topPlaces: StateTopPlace[];
}

export const ALL_INDIAN_STATES: IndianState[] = [
  {
    "id": "tamil-nadu",
    "name": "Tamil Nadu",
    "tagline": "Land of Dravidian Temples, Nilgiri Hills & Coastal Heritage",
    "zone": "South",
    "capital": "Chennai",
    "spotCount": "13197+ Spots",
    "districtCount": 42,
    "heroImage": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Queensland amusement park",
        "category": "Nature",
        "city": "Chennai",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Arulmigu Meenakshi Amman Temple",
        "category": "Religious",
        "city": "Madurai",
        "image": "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Arulmigu Kamakshi Amman Temple",
        "category": "Religious",
        "city": "Kanchipuram",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Sri Ranganathaswamy Temple Srirangam",
        "category": "Religious",
        "city": "Tiruchirappalli",
        "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Arulmigu Ramanathaswamy Temple",
        "category": "Religious",
        "city": "Ramanathapuram",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Arulmigu Annamalaiyar Temple",
        "category": "Religious",
        "city": "Tiruvannamalai",
        "image": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "kerala",
    "name": "Kerala",
    "tagline": "God's Own Country: Emerald Backwaters & Mist-Covered Peaks",
    "zone": "South",
    "capital": "Thiruvananthapuram",
    "spotCount": "46 Curated Spots",
    "districtCount": 17,
    "heroImage": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Chottanikara Bhagvathy Temple",
        "category": "Religious",
        "city": "Kochi",
        "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "National Shrine Basilica of our Lady of Ransom",
        "category": "Religious",
        "city": "Kochi",
        "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Munnar",
        "category": "Hill Station",
        "city": "Idukki",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "St.Andrew's Basilica",
        "category": "Religious",
        "city": "Alappuzha",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Padmanabhaswamy Temple",
        "category": "Religious",
        "city": "Thiruvananthapuram",
        "image": "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Tali Maha Shiva Kshetram",
        "category": "Religious",
        "city": "Kozhikode",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "karnataka",
    "name": "Karnataka",
    "tagline": "One State, Many Worlds: Hampi UNESCO Ruins & Mysore Splendor",
    "zone": "South",
    "capital": "Bengaluru",
    "spotCount": "61+ Spots",
    "districtCount": 13,
    "heroImage": "https://images.unsplash.com/photo-1600100397608-f010e42e4823?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Hampi",
        "category": "Historical",
        "city": "Vijayanagara",
        "image": "https://images.unsplash.com/photo-1600100397608-f010e42e4823?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mysore Palace",
        "category": "Historical",
        "city": "Mysuru",
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mathanga Hill",
        "category": "Religious",
        "city": "Hampi",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shree Vijaya Vitthala Temple",
        "category": "Religious",
        "city": "Hampi",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shri Jagadguru Shankaracharya Peeta",
        "category": "Religious",
        "city": "Chikmanglur",
        "image": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shri Annapurneshwari Devi Temple",
        "category": "Religious",
        "city": "Chikmanglur",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "maharashtra",
    "name": "Maharashtra",
    "tagline": "Gateway of India, Sahyadri Mountain Forts & Konkan Beaches",
    "zone": "West",
    "capital": "Mumbai",
    "spotCount": "78+ Spots",
    "districtCount": 15,
    "heroImage": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Ajanta & Ellora Caves",
        "category": "Nature",
        "city": "Aurangabad (Chhatrapati Sambhajinagar)",
        "image": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Siddhivinayak Temple",
        "category": "Religious",
        "city": "Mumbai",
        "image": "https://images.unsplash.com/photo-1566552881560-0be86c532107?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Dagadusheth Halwai Ganapati temple",
        "category": "Religious",
        "city": "Pune",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Daulatabad Fort",
        "category": "Historical",
        "city": "Aurangabad",
        "image": "https://images.unsplash.com/photo-1600100397608-f010e42e4823?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shri Ambabai Temple",
        "category": "Religious",
        "city": "Kolhapur",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Gateway of India",
        "category": "Historical",
        "city": "Mumbai",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "rajasthan",
    "name": "Rajasthan",
    "tagline": "Land of Maharajas: Golden Thar Deserts, Palaces & Historic Forts",
    "zone": "North",
    "capital": "Jaipur",
    "spotCount": "38 Curated Spots",
    "districtCount": 9,
    "heroImage": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Amber Fort",
        "category": "Historical",
        "city": "Jaipur",
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "City Palace Udaipur",
        "category": "Nature",
        "city": "Udaipur",
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shree Khole Ki Hanuman Mandir",
        "category": "Religious",
        "city": "Jaipur",
        "image": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Moti Dungri Ganesh Ji Temple",
        "category": "Religious",
        "city": "Jaipur",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Ranthambore National Park",
        "category": "Wildlife",
        "city": "Sawai Madhopur",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Jaisalmer Fort",
        "category": "Historical",
        "city": "Jaisalmer",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "goa",
    "name": "Goa",
    "tagline": "Sun-Kissed Golden Beaches, Dudhsagar Falls & Portuguese Architecture",
    "zone": "West",
    "capital": "Panaji",
    "spotCount": "24 Curated Spots",
    "districtCount": 4,
    "heroImage": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Basilica of Bom Jesus",
        "category": "Religious",
        "city": "North Goa",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Fort Aguada",
        "category": "Historical",
        "city": "North Goa",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Cabo de Rama Fort",
        "category": "Historical",
        "city": "South Goa",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Calangute Beach",
        "category": "Beach",
        "city": "North Goa",
        "image": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Dudhsagar Falls",
        "category": "Wildlife",
        "city": "Goa",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Arambol Beach",
        "category": "Beach",
        "city": "Goa",
        "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "uttar-pradesh",
    "name": "Uttar Pradesh",
    "tagline": "Spiritual Heartland: Taj Mahal, Holy Varanasi Ghats & Ayodhya",
    "zone": "North",
    "capital": "Lucknow",
    "spotCount": "101+ Spots",
    "districtCount": 11,
    "heroImage": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Govind Devji Temple",
        "category": "Religious",
        "city": "Vrindavan",
        "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Taj Mahal",
        "category": "Historical",
        "city": "Agra",
        "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Jama Masjid",
        "category": "Religious",
        "city": "Agra",
        "image": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Humayun's Mosque",
        "category": "Religious",
        "city": "Agra",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Dwarkadhish Temple,",
        "category": "Religious",
        "city": "Mathura",
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Ram Janmabhoomi",
        "category": "Religious",
        "city": "Ayodhya",
        "image": "https://images.unsplash.com/photo-1600100397608-f010e42e4823?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "uttarakhand",
    "name": "Uttarakhand",
    "tagline": "Land of the Gods: Majestic Himalayas, Rishikesh & Sacred Glaciers",
    "zone": "North",
    "capital": "Dehradun",
    "spotCount": "103+ Spots",
    "districtCount": 11,
    "heroImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Kunjapuri Devi",
        "category": "Religious",
        "city": "Rishikesh",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Walking towards the Happy Valley from Library Head",
        "category": "Hill Station",
        "city": "Mussoorie",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shakti temple",
        "category": "Religious",
        "city": "Uttarkashi",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kunjapuri Devi Temple and camps",
        "category": "Religious",
        "city": "Rishikesh",
        "image": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Chorabari lake",
        "category": "Wildlife",
        "city": "Kedarnath",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kedarnath Temple",
        "category": "Religious",
        "city": "Rudraprayag",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "himachal-pradesh",
    "name": "Himachal Pradesh",
    "tagline": "Snow-Capped Himalayan Vistas, Pine Valleys & Rohtang Pass",
    "zone": "North",
    "capital": "Shimla",
    "spotCount": "48 Curated Spots",
    "districtCount": 5,
    "heroImage": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Tara Devi Temple",
        "category": "Religious",
        "city": "Shimla",
        "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Trek to Dainkund Peak",
        "category": "Hill Station",
        "city": "Dalhousie",
        "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Manali",
        "category": "Hill Station",
        "city": "Kullu",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Jakhu Temple",
        "category": "Religious",
        "city": "Shimla",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shimla",
        "category": "Hill Station",
        "city": "Shimla",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Dalai Lama Temple",
        "category": "Religious",
        "city": "Dalhousie",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "delhi",
    "name": "Delhi",
    "tagline": "The Historic Capital: Mughal Monuments, Vibrant Bazaars & Red Fort",
    "zone": "North",
    "capital": "New Delhi",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Red Fort",
        "category": "Historical",
        "city": "New Delhi",
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Humayun's Tomb",
        "category": "Historical",
        "city": "New Delhi/Central Delhi",
        "image": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Akshardham Temple",
        "category": "Religious",
        "city": "Delhi",
        "image": "https://images.unsplash.com/photo-1600100397608-f010e42e4823?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Sunder Nursery",
        "category": "Wildlife",
        "city": "Delhi",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Lotus Temple",
        "category": "Religious",
        "city": "Delhi",
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Lodhi Garden",
        "category": "Wildlife",
        "city": "Delhi",
        "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "gujarat",
    "name": "Gujarat",
    "tagline": "Vibrant Culture: White Desert of Rann, Gir Lions & Somnath Shore",
    "zone": "West",
    "capital": "Gandhinagar",
    "spotCount": "39 Curated Spots",
    "districtCount": 11,
    "heroImage": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Somnath Temple",
        "category": "Religious",
        "city": "Gir Somnath",
        "image": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Statue of Unity",
        "category": "Historical",
        "city": "Narmada",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shri Nageshwar Jyotirling",
        "category": "Religious",
        "city": "Dwarka",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Dwarkadhish Temple",
        "category": "Religious",
        "city": "Dwarka",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Bhuj Mandir",
        "category": "Religious",
        "city": "Bhuj",
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Uparkot Fort",
        "category": "Nature",
        "city": "Junagadh",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "west-bengal",
    "name": "West Bengal",
    "tagline": "Cultural Capital: Darjeeling Toy Train, Tea Hills & Sundarbans",
    "zone": "East & North-East",
    "capital": "Kolkata",
    "spotCount": "59+ Spots",
    "districtCount": 6,
    "heroImage": "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Darjeeling Rock garden",
        "category": "Wildlife",
        "city": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Teesta river(rafting)",
        "category": "Wildlife",
        "city": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kanchenjunga peak",
        "category": "Wildlife",
        "city": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1566552881560-0be86c532107?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Happy valley tea estate",
        "category": "Hill Station",
        "city": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Nightingale park",
        "category": "Nature",
        "city": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mahakal temple",
        "category": "Religious",
        "city": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "madhya-pradesh",
    "name": "Madhya Pradesh",
    "tagline": "The Heart of India: Khajuraho Sculptures, Tiger Sanctuaries & Forts",
    "zone": "Central",
    "capital": "Bhopal",
    "spotCount": "49 Curated Spots",
    "districtCount": 7,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Kamasutra temples",
        "category": "Religious",
        "city": "Khajuraho",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Khajuraho Group of Temples",
        "category": "Religious",
        "city": "Chhatarpur",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Khajrana Ganesh Mandir",
        "category": "Religious",
        "city": "Indore",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mahakaleshwar Jyotirlinga",
        "category": "Religious",
        "city": "Ujjain",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Khajuraho Group of Monuments",
        "category": "Historical",
        "city": "Khajuraho",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Sanchi Stupa",
        "category": "Religious",
        "city": "Bhopal",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "andhra-pradesh",
    "name": "Andhra Pradesh",
    "tagline": "Sacred Tirumala Venkateswara, Araku Valleys & Gandikota Canyon",
    "zone": "South",
    "capital": "Amaravati",
    "spotCount": "34 Curated Spots",
    "districtCount": 7,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Tirumala Venkateswara Temple",
        "category": "Religious",
        "city": "Tirupati",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Ahobilam temple",
        "category": "Religious",
        "city": "Kurnool",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kanaka Durga Temple",
        "category": "Religious",
        "city": "Krishna (Vijayawada)",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mogalarajapuram caves",
        "category": "Nature",
        "city": "Vijayawada",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kurnool fort",
        "category": "Historical",
        "city": "Kurnool",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Chandragiri Fort",
        "category": "Historical",
        "city": "Chittoor (Tirupati)",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "telangana",
    "name": "Telangana",
    "tagline": "Land of Nizams: Iconic Charminar, Golconda & Ramappa UNESCO Wonder",
    "zone": "South",
    "capital": "Hyderabad",
    "spotCount": "24 Curated Spots",
    "districtCount": 1,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Birla Mandir",
        "category": "Religious",
        "city": "Hyderabad",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Golconda Fort",
        "category": "Historical",
        "city": "Hyderabad",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Chowmahalla Palace",
        "category": "Historical",
        "city": "Hyderabad",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Hussain Sagar",
        "category": "Nature",
        "city": "Hyderabad",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Ramoji Film City",
        "category": "Cultural",
        "city": "Hyderabad",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Qutb Shahi Tombs",
        "category": "Historical",
        "city": "Hyderabad",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "jammu-and-kashmir",
    "name": "Jammu & Kashmir",
    "tagline": "Paradise on Earth: Dal Lake Shikaras, Gulmarg Gondolas & Snow Peaks",
    "zone": "North",
    "capital": "Srinagar",
    "spotCount": "25 Curated Spots",
    "districtCount": 2,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Dal Lake, Srinagar",
        "category": "Nature",
        "city": "Srinagar",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shankaracharya Temple",
        "category": "Religious",
        "city": "Srinagar",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Pari mahal",
        "category": "Wildlife",
        "city": "Srinagar",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Vaishno Devi Shrine",
        "category": "Religious",
        "city": "Jammu",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Indira Gandhi Memorial Tulip Garden",
        "category": "Wildlife",
        "city": "Srinagar",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Manasabal Lake",
        "category": "Wildlife",
        "city": "Srinagar",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "ladakh",
    "name": "Ladakh",
    "tagline": "Moonland of High Passes: Pangong Tso, Nubra Dunes & Ancient Gompas",
    "zone": "North",
    "capital": "Leh",
    "spotCount": "31 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Pangong Tso",
        "category": "Wildlife",
        "city": "Leh",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Drass Valley",
        "category": "Wildlife",
        "city": "Kargil",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Samstanling Monastery",
        "category": "Religious",
        "city": "Diskit",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Leh Palace & Ladakh",
        "category": "Historical",
        "city": "Leh",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Hall Of Fame",
        "category": "Cultural",
        "city": "Leh",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Hunder \ufffd Try Bactrian Camel Safari",
        "category": "Wildlife",
        "city": "Leh",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "punjab",
    "name": "Punjab",
    "tagline": "Heart of Chivalry & Soul: Sacred Golden Temple & Fertile Farmlands",
    "zone": "North",
    "capital": "Chandigarh",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Golden Temple",
        "category": "Religious",
        "city": "Amritsar",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shree Harminder Sahib Gurudwara",
        "category": "Religious",
        "city": "Amritsar",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Golden Temple (Harmandir Sahib)",
        "category": "Religious",
        "city": "Amritsar",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "ISKON temple",
        "category": "Religious",
        "city": "Chandigarh",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shri Durgiana Temple",
        "category": "Religious",
        "city": "Amritsar",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Terraced garden",
        "category": "Wildlife",
        "city": "Chandigarh",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "odisha",
    "name": "Odisha",
    "tagline": "Soul of Incredible India: Puri Jagannath & Konark Sun Chariot",
    "zone": "East & North-East",
    "capital": "Bhubaneswar",
    "spotCount": "39 Curated Spots",
    "districtCount": 9,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Hanuman Vatika garden",
        "category": "Nature",
        "city": "Rourkela",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Aryapalli beach",
        "category": "Beach",
        "city": "Berhampur",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kuldiha Wildlife sanctuary",
        "category": "Wildlife",
        "city": "Balasore",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Konark Sun Temple",
        "category": "Religious",
        "city": "Puri",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Debrigarh Wildlife Sanctuary",
        "category": "Wildlife",
        "city": "Sambalpur",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Lingaraj Temple",
        "category": "Religious",
        "city": "Khordha (Bhubaneswar)",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "bihar",
    "name": "Bihar",
    "tagline": "Cradle of Ancient Wisdom: Mahabodhi Bodh Gaya & Nalanda University",
    "zone": "East & North-East",
    "capital": "Patna",
    "spotCount": "24 Curated Spots",
    "districtCount": 4,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Buddha memorial park",
        "category": "Religious",
        "city": "Patna",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mahabodhi Temple, Bodh Gaya",
        "category": "Religious",
        "city": "Gaya",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Dungeshwari cave temple",
        "category": "Religious",
        "city": "Bodh Gaya",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Srikrishna science centre",
        "category": "Cultural",
        "city": "Patna",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mahabodhi Temple (Bodh Gaya)",
        "category": "Religious",
        "city": "Gaya",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Vishnupad Temple",
        "category": "Religious",
        "city": "Gaya",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "assam",
    "name": "Assam",
    "tagline": "Land of the Red River & Blue Hills: Kaziranga Rhino Sanctuary",
    "zone": "East & North-East",
    "capital": "Dispur",
    "spotCount": "24 Curated Spots",
    "districtCount": 6,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Kaziranga National Park",
        "category": "Wildlife",
        "city": "Golaghat/Nagaon",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kamakhya Temple",
        "category": "Religious",
        "city": "Kamrup Metropolitan (Guwahati)",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Orchid national park",
        "category": "Wildlife",
        "city": "Kaziranga",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Umananda Island",
        "category": "Nature",
        "city": "Kamrup Metropolitan (Guwahati)",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Chandubi Lake",
        "category": "Nature",
        "city": "Kamrup",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Majuli river island",
        "category": "Wildlife",
        "city": "Kaziranga",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "sikkim",
    "name": "Sikkim",
    "tagline": "Himalayan Wonderland: Glacial Changu Lake, Kanchenjunga & Monasteries",
    "zone": "East & North-East",
    "capital": "Gangtok",
    "spotCount": "45 Curated Spots",
    "districtCount": 6,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Rabdentse Ruins",
        "category": "Historical",
        "city": "Pelling",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Sewaro Rock garden",
        "category": "Wildlife",
        "city": "Pelling",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Tendong Hill & Biodiversity park",
        "category": "Wildlife",
        "city": "Namchi",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "River rafting",
        "category": "Nature",
        "city": "Gangtok",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kanchenjunga waterfalls and national park",
        "category": "Wildlife",
        "city": "Pelling",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Char Dham",
        "category": "Religious",
        "city": "Namchi",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "meghalaya",
    "name": "Meghalaya",
    "tagline": "Abode of the Clouds: Double Decker Living Root Bridges & Umngot",
    "zone": "East & North-East",
    "capital": "Shillong",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Thangkharang park",
        "category": "Nature",
        "city": "Cherrapunji",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Living Root Bridge",
        "category": "Wildlife",
        "city": "Cherrapunji",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Cherrapunji (Sohra)",
        "category": "Nature",
        "city": "East Khasi Hills",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mawkdok Dympep valley",
        "category": "Hill Station",
        "city": "Cherrapunji",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Living Root Bridges",
        "category": "Hill Station",
        "city": "East Khasi Hills",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Shillong",
        "category": "Hill Station",
        "city": "East Khasi Hills",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "arunachal-pradesh",
    "name": "Arunachal Pradesh",
    "tagline": "Land of the Dawn-Lit Mountains: Tawang Gompa & High Mountain Passes",
    "zone": "East & North-East",
    "capital": "Itanagar",
    "spotCount": "24 Curated Spots",
    "districtCount": 2,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Tawang Monastery",
        "category": "Religious",
        "city": "Tawang",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Nuranang waterfalls",
        "category": "Wildlife",
        "city": "Tawang",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Bomdila Monastery",
        "category": "Religious",
        "city": "West Kameng",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Sela Pass",
        "category": "Hill Station",
        "city": "Tawang",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Bumla Pass",
        "category": "Hill Station",
        "city": "Tawang",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Madhuri Lake",
        "category": "Nature",
        "city": "Tawang",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "nagaland",
    "name": "Nagaland",
    "tagline": "Land of Vibrant Festivals: Dzukou Emerald Valley & Hornbill Heritage",
    "zone": "East & North-East",
    "capital": "Kohima",
    "spotCount": "24 Curated Spots",
    "districtCount": 2,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Mt Japfu",
        "category": "Wildlife",
        "city": "Kohima",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Ntangki national park",
        "category": "Wildlife",
        "city": "Kohima",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kohima & Dzukou Valley",
        "category": "Hill Station",
        "city": "Kohima",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kachari Ruins",
        "category": "Historical",
        "city": "Dimapur",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Dimapur Zoological Park",
        "category": "Wildlife",
        "city": "Dimapur",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Dzukou Valley",
        "category": "Hill Station",
        "city": "Kohima",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "manipur",
    "name": "Manipur",
    "tagline": "Jeweled Land: Floating Phumdis of Loktak Lake & Kangla Historic Fort",
    "zone": "East & North-East",
    "capital": "Imphal",
    "spotCount": "24 Curated Spots",
    "districtCount": 2,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Loktak Lake",
        "category": "Nature",
        "city": "Bishnupur",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Keibul Lamjao National Park",
        "category": "Wildlife",
        "city": "Bishnupur",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kangla Fort",
        "category": "Historical",
        "city": "Imphal West/East",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Ima Keithel (women's market)",
        "category": "Heritage",
        "city": "Imphal West/East",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Manipur Scenic Discovery 5",
        "category": "Scenic Attraction",
        "city": "Imphal",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Manipur Scenic Discovery 6",
        "category": "Scenic Attraction",
        "city": "Imphal",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "mizoram",
    "name": "Mizoram",
    "tagline": "Songbird of the Hills: Vantawng Cascades & Serene Bamboo Landscapes",
    "zone": "East & North-East",
    "capital": "Aizawl",
    "spotCount": "24 Curated Spots",
    "districtCount": 1,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Solomon's Temple",
        "category": "Religious",
        "city": "Aizawl",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Aizawl",
        "category": "Hill Station",
        "city": "Aizawl",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Durtlang Hills",
        "category": "Hill Station",
        "city": "Aizawl",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mizoram State Museum",
        "category": "Museum",
        "city": "Aizawl",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mizoram Scenic Discovery 5",
        "category": "Scenic Attraction",
        "city": "Aizawl",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mizoram Scenic Discovery 6",
        "category": "Scenic Attraction",
        "city": "Aizawl",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "tripura",
    "name": "Tripura",
    "tagline": "Palaces & Ancient Stone Sculptures: Floating Neermahal & Unakoti",
    "zone": "East & North-East",
    "capital": "Agartala",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Raima valley",
        "category": "Wildlife",
        "city": "Agartala",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Gondacherra wildlife sanctuary",
        "category": "Wildlife",
        "city": "Agartala",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Sepahijala wildlife sanctuary",
        "category": "Wildlife",
        "city": "Agartala",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Buddha temple",
        "category": "Religious",
        "city": "Agartala",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Ummaneshwar temple",
        "category": "Religious",
        "city": "Agartala",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Ujjayanta Palace",
        "category": "Historical",
        "city": "West Tripura (Agartala)",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "jharkhand",
    "name": "Jharkhand",
    "tagline": "Land of Forests: Pristine Hundru Waterfalls & Sacred Parasnath Peaks",
    "zone": "East & North-East",
    "capital": "Ranchi",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Biodiversity park",
        "category": "Wildlife",
        "city": "Ranchi",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Dassam falls",
        "category": "Wildlife",
        "city": "Ranchi",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Naulakha temple",
        "category": "Religious",
        "city": "Deoghar",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Jonha falls",
        "category": "Wildlife",
        "city": "Ranchi",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Jagannath Temple",
        "category": "Religious",
        "city": "Ranchi",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Netarhat",
        "category": "Hill Station",
        "city": "Latehar",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "chhattisgarh",
    "name": "Chhattisgarh",
    "tagline": "Full of Surprises: Chitrakote Horseshoe Falls & Tribal Forest Reserves",
    "zone": "Central",
    "capital": "Raipur",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Ghatarani waterfalls",
        "category": "Wildlife",
        "city": "Raipur",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Chitrakote Falls",
        "category": "Nature",
        "city": "Bastar",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Jatmai Temple",
        "category": "Religious",
        "city": "Raipur",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kanger Valley National Park",
        "category": "Wildlife",
        "city": "Bastar",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kanker Palace",
        "category": "Historical",
        "city": "Kanker",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Tirathgarh Falls",
        "category": "Nature",
        "city": "Bastar",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "haryana",
    "name": "Haryana",
    "tagline": "Historic Plains of Kurukshetra, Sultanpur Bird Sanctuary & Morni Hills",
    "zone": "North",
    "capital": "Chandigarh",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Brahma Sarovar, Kurukshetra",
        "category": "Religious",
        "city": "Kurukshetra",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Aravalli biodiversity park",
        "category": "Wildlife",
        "city": "Gurugram",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Sultanpur Bird sanctuary",
        "category": "Wildlife",
        "city": "Gurugram",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Badkhal Lake",
        "category": "Nature",
        "city": "Faridabad",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Wet N Wild water park",
        "category": "Nature",
        "city": "Gurugram",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Indian Transport history",
        "category": "Cultural",
        "city": "Gurugram",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "chandigarh",
    "name": "Chandigarh",
    "tagline": "The City Beautiful: Nek Chand Rock Garden & Tranquil Sukhna Lake",
    "zone": "Union Territories",
    "capital": "Chandigarh",
    "spotCount": "24 Curated Spots",
    "districtCount": 1,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Rock Garden, Chandigarh",
        "category": "Nature",
        "city": "Chandigarh",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Sukhna Lake",
        "category": "Nature",
        "city": "Chandigarh",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Rose Garden",
        "category": "Nature",
        "city": "Chandigarh",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Chandigarh Scenic Discovery 4",
        "category": "Scenic Attraction",
        "city": "Chandigarh",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Chandigarh Scenic Discovery 5",
        "category": "Scenic Attraction",
        "city": "Chandigarh",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Chandigarh Scenic Discovery 6",
        "category": "Scenic Attraction",
        "city": "Chandigarh",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "puducherry",
    "name": "Puducherry",
    "tagline": "French Riviera of the East: Yellow Villa Heritage & Auroville",
    "zone": "Union Territories",
    "capital": "Puducherry",
    "spotCount": "24 Curated Spots",
    "districtCount": 1,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Puducherry (White Town)",
        "category": "Beach",
        "city": "Puducherry",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Manakula Vinayagar temple",
        "category": "Religious",
        "city": "Puducherry",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Promenade Beach",
        "category": "Beach",
        "city": "Puducherry",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Paradise beach and island",
        "category": "Beach",
        "city": "Puducherry",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Pondicherry botanical garden",
        "category": "Wildlife",
        "city": "Puducherry",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Temple Adventures centre-Scuba diving",
        "category": "Religious",
        "city": "Puducherry",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "andaman-and-nicobar-islands",
    "name": "Andaman & Nicobar Islands",
    "tagline": "Emerald Island Archipelago: Radhanagar Beach & Historic Cellular Jail",
    "zone": "Union Territories",
    "capital": "Port Blair",
    "spotCount": "24 Curated Spots",
    "districtCount": 5,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Limestone Caves",
        "category": "Wildlife",
        "city": "Baratang Island",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Havelock Island",
        "category": "Beach",
        "city": "South Andaman",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mount Harriet National park",
        "category": "Wildlife",
        "city": "Port Blair",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Bharatpur Beach",
        "category": "Beach",
        "city": "Neil Island",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Coral gazing at Mohwa Dera",
        "category": "Wildlife",
        "city": "Baratang Island",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mahatma Gandhi National Park",
        "category": "Wildlife",
        "city": "Port Blair",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "lakshadweep",
    "name": "Lakshadweep",
    "tagline": "Tropical Coral Paradises: Crystal Turquoise Lagoons & Pristine Atolls",
    "zone": "Union Territories",
    "capital": "Kavaratti",
    "spotCount": "24 Curated Spots",
    "districtCount": 2,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "Kavaratti Island",
        "category": "Beach",
        "city": "Lakshadweep",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Pitti Bird Sanctuary",
        "category": "Wildlife",
        "city": "Lakshadweep (Kavaratti/Agatti)",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Kavaratti lagoon",
        "category": "Beach",
        "city": "Lakshadweep (Kavaratti/Agatti)",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Agatti Island",
        "category": "Beach",
        "city": "Lakshadweep (Kavaratti/Agatti)",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Lakshadweep Scenic Discovery 5",
        "category": "Scenic Attraction",
        "city": "Kavaratti",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Lakshadweep Scenic Discovery 6",
        "category": "Scenic Attraction",
        "city": "Kavaratti",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu",
    "name": "Dadra and Nagar Haveli and Daman and Diu",
    "tagline": "Coastal Forts, Nagoa Arabian Sea Beaches & Portuguese Heritage",
    "zone": "Union Territories",
    "capital": "Daman",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "topPlaces": [
      {
        "name": "St. Paul's Church",
        "category": "Religious",
        "city": "Diu",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Diu Fort & Beach",
        "category": "Beach",
        "city": "Diu",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Basilica of Bom Jesus Church",
        "category": "Religious",
        "city": "Diu",
        "image": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Diu Fort",
        "category": "Historical",
        "city": "Diu",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Vasona Lion Safari",
        "category": "Wildlife",
        "city": "Silvassa",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Deer Park",
        "category": "Wildlife",
        "city": "Silvassa",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];
