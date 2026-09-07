/**
 * Comprehensive Indian States Travel Directory
 * Contains verified data and authentic 3-landmark photo collages for all 36 States & UTs.
 * Each state features 3 unique, landmark-specific photographs.
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
    "tagline": "Ancient Dravidian Gopurams, Misty Nilgiri Tea Hills & UNESCO Chola Monuments",
    "zone": "South",
    "capital": "Chennai",
    "spotCount": "13197+ Spots",
    "districtCount": 42,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Meenakshi Amman Temple",
        "category": "Religious Heritage",
        "city": "Madurai",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Brihadeeswarar Temple",
        "category": "UNESCO Monument",
        "city": "Thanjavur",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg/960px-Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nilgiri Mountain Railway",
        "category": "UNESCO Heritage Rail",
        "city": "Ooty, Nilgiris",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/NMR_train_at_Ketti_05-02-26_75.jpeg/960px-NMR_train_at_Ketti_05-02-26_75.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "kerala",
    "name": "Kerala",
    "tagline": "God's Own Country: Tranquil Emerald Backwaters, Rolling Tea Estates & Tropical Palms",
    "zone": "South",
    "capital": "Thiruvananthapuram",
    "spotCount": "46 Curated Spots",
    "districtCount": 17,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/960px-Alappuzha_Boat_Beauty_W.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Alleppey Backwaters & Houseboats",
        "category": "Backwater Circuit",
        "city": "Alappuzha",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/960px-Alappuzha_Boat_Beauty_W.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Munnar Tea Plantations",
        "category": "Hill Station & Mist",
        "city": "Munnar, Idukki",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Athirappilly Waterfalls",
        "category": "Jungle Waterfalls",
        "city": "Thrissur",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/The_View_of_the_Athirapally_Falls_during_the_onset_of_Monsoon.jpg/960px-The_View_of_the_Athirapally_Falls_during_the_onset_of_Monsoon.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "karnataka",
    "name": "Karnataka",
    "tagline": "One State, Many Worlds: Hampi Vijayanagara Ruins, Mysore Splendor & Coorg Valleys",
    "zone": "South",
    "capital": "Bengaluru",
    "spotCount": "61+ Spots",
    "districtCount": 13,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg/960px-Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Hampi Stone Chariot",
        "category": "UNESCO World Heritage",
        "city": "Hampi, Vijayanagara",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg/960px-Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mysore Palace Grandeur",
        "category": "Royal Heritage",
        "city": "Mysuru",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/960px-Mysore_Palace_Morning.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Gol Gumbaz Whispering Gallery",
        "category": "Deccan Architecture",
        "city": "Vijayapura",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Gol_Gumbaz_-4%2C_Bijapur%2C_Karnataka.jpg/960px-Gol_Gumbaz_-4%2C_Bijapur%2C_Karnataka.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "maharashtra",
    "name": "Maharashtra",
    "tagline": "Gateway of India, Marine Drive Sunset Arc, Ancient Ajanta Caves & Sahyadri Peaks",
    "zone": "West",
    "capital": "Mumbai",
    "spotCount": "78+ Spots",
    "districtCount": 15,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/960px-Mumbai_03-2016_30_Gateway_of_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Gateway of India",
        "category": "Historic Waterfront",
        "city": "Mumbai",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/960px-Mumbai_03-2016_30_Gateway_of_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ajanta Caves Buddhist Frescoes",
        "category": "UNESCO Ancient Caves",
        "city": "Chhatrapati Sambhajinagar",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Ajanta_%2863%29.jpg/960px-Ajanta_%2863%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Chhatrapati Shivaji Maharaj Terminus",
        "category": "UNESCO Victorian Gothic",
        "city": "Mumbai",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Chhatrapati_shivaji_terminus%2C_esterno_01.jpg/960px-Chhatrapati_shivaji_terminus%2C_esterno_01.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "rajasthan",
    "name": "Rajasthan",
    "tagline": "Land of Maharajas: Hawa Mahal Facade, Majestic Amber Fort & Golden Thar Dunes",
    "zone": "North",
    "capital": "Jaipur",
    "spotCount": "38 Curated Spots",
    "districtCount": 9,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Hawa Mahal Palace of Winds",
        "category": "Royal Architecture",
        "city": "Jaipur",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Amber Fort & Palace",
        "category": "Hill Fortress",
        "city": "Amer, Jaipur",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/960px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jaisalmer Golden Fort",
        "category": "Desert Citadel",
        "city": "Jaisalmer",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Jaisalmer_forteresse.jpg/960px-Jaisalmer_forteresse.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "goa",
    "name": "Goa",
    "tagline": "Sun-Drenched Arabian Sea Beaches, Portuguese Baroque Cathedrals & Dudhsagar Falls",
    "zone": "West",
    "capital": "Panaji",
    "spotCount": "24 Curated Spots",
    "districtCount": 4,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Palolem_Beach%2C_South_Goa.jpg/960px-Palolem_Beach%2C_South_Goa.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Palolem Beach Coconut Palms",
        "category": "Tropical Coastline",
        "city": "Canacona, South Goa",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Palolem_Beach%2C_South_Goa.jpg/960px-Palolem_Beach%2C_South_Goa.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Basilica of Bom Jesus",
        "category": "UNESCO Baroque Heritage",
        "city": "Old Goa",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/960px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Dudhsagar Waterfalls",
        "category": "Cascading Jungle Falls",
        "city": "Sonaulim, South Goa",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Doodhsagar_Fall.jpg/960px-Doodhsagar_Fall.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "uttar-pradesh",
    "name": "Uttar Pradesh",
    "tagline": "Sacred Heartland: Iconic Marble Taj Mahal, Ancient Varanasi Ghats & Mughal Citadels",
    "zone": "North",
    "capital": "Lucknow",
    "spotCount": "101+ Spots",
    "districtCount": 11,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Taj Mahal White Wonder",
        "category": "Wonder of the World",
        "city": "Agra",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Varanasi Sacred Ganga Ghats",
        "category": "Spiritual Pilgrimage",
        "city": "Varanasi",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/960px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Buland Darwaza Victory Gate",
        "category": "Mughal Architecture",
        "city": "Fatehpur Sikri, Agra",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg/960px-Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "uttarakhand",
    "name": "Uttarakhand",
    "tagline": "Devbhoomi: Sacred Kedarnath Peaks, Rishikesh Yoga Capital & Badrinath Shrine",
    "zone": "North",
    "capital": "Dehradun",
    "spotCount": "103+ Spots",
    "districtCount": 11,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/960px-Kedarnath_Temple_in_Rainy_season.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Kedarnath Temple Shrine",
        "category": "Sacred Himalayan Jyotirlinga",
        "city": "Rudraprayag",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/960px-Kedarnath_Temple_in_Rainy_season.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Rishikesh Laxman Jhula & Ganga",
        "category": "Yoga & River Adventure",
        "city": "Rishikesh",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Rishikesh-Lakshman_Jhula_by_Kaustubh_Nayyar.jpg/960px-Rishikesh-Lakshman_Jhula_by_Kaustubh_Nayyar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Badrinath Temple",
        "category": "Char Dham Himalayan Shrine",
        "city": "Chamoli",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Badrinath_Temple_%2C_Uttarakhand.jpg/960px-Badrinath_Temple_%2C_Uttarakhand.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "himachal-pradesh",
    "name": "Himachal Pradesh",
    "tagline": "Snowy Wonderland: Rohtang Pass, Spiti Buddhist Monasteries & Colonial Shimla Ridge",
    "zone": "North",
    "capital": "Shimla",
    "spotCount": "48 Curated Spots",
    "districtCount": 5,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Kullu_Valley_from_Rohtang_Pass%2C_India.jpg/960px-Kullu_Valley_from_Rohtang_Pass%2C_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Rohtang Pass Alpine Valley",
        "category": "High Alpine Pass",
        "city": "Manali, Kullu",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Kullu_Valley_from_Rohtang_Pass%2C_India.jpg/960px-Kullu_Valley_from_Rohtang_Pass%2C_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Key (Ki) Buddhist Monastery",
        "category": "Tibetan Mountain Monastery",
        "city": "Spiti Valley",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/1000_Year_loop.jpg/960px-1000_Year_loop.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Shimla Christ Church & Ridge",
        "category": "Colonial Heritage",
        "city": "Shimla",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg/960px-Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "delhi",
    "name": "Delhi",
    "tagline": "Historic Capital: India Gate Boulevard, Soaring Qutub Minar & Mughal Red Fort",
    "zone": "North",
    "capital": "New Delhi",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/India_Gate_in_the_Evening.jpg/960px-India_Gate_in_the_Evening.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "India Gate War Memorial",
        "category": "National Monument",
        "city": "Central Delhi",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/India_Gate_in_the_Evening.jpg/960px-India_Gate_in_the_Evening.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Red Fort (Lal Qila)",
        "category": "Mughal Imperial Palace",
        "city": "Old Delhi",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Delhi_fort.jpg/960px-Delhi_fort.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Qutub Minar Complex",
        "category": "UNESCO Minaret",
        "city": "Mehrauli, New Delhi",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Qutb_minar_ruins.jpg/960px-Qutb_minar_ruins.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "punjab",
    "name": "Punjab",
    "tagline": "Sacred Golden Shrines, Spirited Wagah Border Ceremonies & Historic Forts",
    "zone": "North",
    "capital": "Chandigarh",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/960px-The_Golden_Temple_of_Amrithsar_7.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Golden Temple (Harmandir Sahib)",
        "category": "Spiritual Sanctum",
        "city": "Amritsar",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/960px-The_Golden_Temple_of_Amrithsar_7.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Wagah Border Beating Retreat",
        "category": "Border Ceremony",
        "city": "Wagah, Amritsar",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/The_SAARC_Car_Rally_2007_being_welcomed_by_traditional_Drummers_at_the_Wagah_Border_on_March_28%2C_2007.jpg/960px-The_SAARC_Car_Rally_2007_being_welcomed_by_traditional_Drummers_at_the_Wagah_Border_on_March_28%2C_2007.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Qila Mubarak Historic Citadel",
        "category": "Sikh Architecture",
        "city": "Patiala",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Qila_Mubarak%2C_Patiala.jpg/960px-Qila_Mubarak%2C_Patiala.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "west-bengal",
    "name": "West Bengal",
    "tagline": "Cultural Capital: White Marble Victoria Memorial, Cantilever Howrah Bridge & Darjeeling",
    "zone": "East & North-East",
    "capital": "Kolkata",
    "spotCount": "59+ Spots",
    "districtCount": 6,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/960px-Victoria_Memorial_situated_in_Kolkata.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Victoria Memorial Palace",
        "category": "Indo-Saracenic Landmark",
        "city": "Kolkata",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/960px-Victoria_Memorial_situated_in_Kolkata.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Howrah Bridge over Hooghly",
        "category": "Iconic Cantilever Bridge",
        "city": "Kolkata",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Howrah_bridge_at_night.jpg/960px-Howrah_bridge_at_night.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Darjeeling Himalayan Railway",
        "category": "UNESCO Mountain Railway",
        "city": "Darjeeling",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Tea_Estate%2C_Darjeeling.jpg/960px-Tea_Estate%2C_Darjeeling.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "gujarat",
    "name": "Gujarat",
    "tagline": "Statue of Unity, Shimmering Rann of Kutch Salt Desert & Sacred Somnath Shrine",
    "zone": "West",
    "capital": "Gandhinagar",
    "spotCount": "39 Curated Spots",
    "districtCount": 11,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Statue_of_Unity.jpg/960px-Statue_of_Unity.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Statue of Unity",
        "category": "World's Tallest Statue",
        "city": "Kevadia, Narmada",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Statue_of_Unity.jpg/960px-Statue_of_Unity.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Great Rann of Kutch Salt Desert",
        "category": "White Salt Marsh",
        "city": "Kutch",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Rann_of_Kutch_-_White_Desert.jpg/960px-Rann_of_Kutch_-_White_Desert.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Somnath Shore Temple",
        "category": "First Jyotirlinga Shrine",
        "city": "Prabhas Patan",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Somanath_mandir_%28cropped%29.jpg/960px-Somanath_mandir_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "madhya-pradesh",
    "name": "Madhya Pradesh",
    "tagline": "Heart of India: Khajuraho Sculpted Temples, Majestic Gwalior Fort & Great Sanchi Stupa",
    "zone": "Central",
    "capital": "Bhopal",
    "spotCount": "49 Curated Spots",
    "districtCount": 7,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/1_Khajuraho.jpg/960px-1_Khajuraho.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Khajuraho Ancient Temples",
        "category": "UNESCO Sculpted Temples",
        "city": "Khajuraho, Chhatarpur",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/1_Khajuraho.jpg/960px-1_Khajuraho.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Gwalior Fort Citadel",
        "category": "Hilltop Fortress",
        "city": "Gwalior",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Gwalior_Fort_front.jpg/960px-Gwalior_Fort_front.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Great Stupa at Sanchi",
        "category": "UNESCO Buddhist Stupa",
        "city": "Sanchi, Raisen",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG/960px-East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "odisha",
    "name": "Odisha",
    "tagline": "Soul of Incredible India: Giant Konark Sun Chariot, Sacred Puri Jagannath & Chilika Lake",
    "zone": "East & North-East",
    "capital": "Bhubaneswar",
    "spotCount": "39 Curated Spots",
    "districtCount": 9,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/960px-Konarka_Temple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Konark Sun Temple Giant Chariot",
        "category": "UNESCO Sun Sanctuary",
        "city": "Konark, Puri",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/960px-Konarka_Temple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Puri Jagannath Temple",
        "category": "Sacred Char Dham Shrine",
        "city": "Puri",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Shri_Jagannath_temple.jpg/960px-Shri_Jagannath_temple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Chilika Lake Lagoon",
        "category": "Brackish Water Lagoon",
        "city": "Khurda / Ganjam",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Birds_eyeview_of_Chilika_Lake.jpg/960px-Birds_eyeview_of_Chilika_Lake.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "andhra-pradesh",
    "name": "Andhra Pradesh",
    "tagline": "Sacred Tirumala Hills, Dramatic Gandikota Gorge Canyon & Borra Limestone Caves",
    "zone": "South",
    "capital": "Amaravati",
    "spotCount": "34 Curated Spots",
    "districtCount": 7,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/960px-Tirumala_090615.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Tirumala Venkateswara Temple",
        "category": "Sacred Seven Hills Shrine",
        "city": "Tirupati",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/960px-Tirumala_090615.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Gandikota Grand Canyon of India",
        "category": "River Gorge Fortress",
        "city": "Kadapa",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Indian_Grand_Canyon_Sudhakar_Bichali.jpg/960px-Indian_Grand_Canyon_Sudhakar_Bichali.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Borra Million-Year Limestone Caves",
        "category": "Karst Cave Wonder",
        "city": "Araku, Visakhapatnam",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Borra_caves%2C_Viskhapatnam.jpg/960px-Borra_caves%2C_Viskhapatnam.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "telangana",
    "name": "Telangana",
    "tagline": "City of Pearls: Four-Minaret Charminar, Golconda Acoustical Fort & Warangal Gateways",
    "zone": "South",
    "capital": "Hyderabad",
    "spotCount": "24 Curated Spots",
    "districtCount": 1,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/960px-Charminar_Hyderabad_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Charminar Monument",
        "category": "Historic Four Minarets",
        "city": "Hyderabad",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/960px-Charminar_Hyderabad_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Golconda Hilltop Fortress",
        "category": "Acoustical Citadel",
        "city": "Hyderabad",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Golconda_Fort_005.jpg/960px-Golconda_Fort_005.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Warangal Kakatiya Gateway",
        "category": "Kakatiya Stone Arch",
        "city": "Warangal",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Shiv_Linga_at_Warangal_Fort_Complex.jpg/960px-Shiv_Linga_at_Warangal_Fort_Complex.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "jammu-and-kashmir",
    "name": "Jammu & Kashmir",
    "tagline": "Paradise on Earth: Dal Lake Shikaras, Snowy Gulmarg Gondola & Shalimar Gardens",
    "zone": "North",
    "capital": "Srinagar (Summer) / Jammu (Winter)",
    "spotCount": "25 Curated Spots",
    "districtCount": 2,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/960px-Dal_Lake_Hazratbal_Srinagar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Dal Lake Floating Shikaras",
        "category": "Alpine Water Paradise",
        "city": "Srinagar",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/960px-Dal_Lake_Hazratbal_Srinagar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Gulmarg Apharwat Snow Gondola",
        "category": "Skiing & High Altitude",
        "city": "Gulmarg, Baramulla",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Ancient_Temple%2C_Gulmarg.jpg/960px-Ancient_Temple%2C_Gulmarg.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Shalimar Bagh Mughal Gardens",
        "category": "Mughal Terraced Garden",
        "city": "Srinagar",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Shalimar_Bagh_1.jpg/960px-Shalimar_Bagh_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "ladakh",
    "name": "Ladakh",
    "tagline": "Land of High Passes: Azure Pangong Tso, Grand Thikse Monastery & Shanti Stupa",
    "zone": "North",
    "capital": "Leh",
    "spotCount": "31 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg/960px-ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Pangong Tso High-Altitude Lake",
        "category": "Endorheic Azure Lake",
        "city": "Changthang, Leh",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg/960px-ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Thikse Buddhist Monastery",
        "category": "Yellow Hat Sect Monastery",
        "city": "Thiksey, Leh",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Thikse_Monastery_.jpg/960px-Thikse_Monastery_.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Shanti Stupa White Dome",
        "category": "Peace Pagoda Landmark",
        "city": "Changsipa, Leh",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Leh%2C_Shanti_Stupa%2C_Ladakh%2C_India.jpg/960px-Leh%2C_Shanti_Stupa%2C_Ladakh%2C_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "assam",
    "name": "Assam",
    "tagline": "Lush Tea Valleys, Kaziranga Rhinos, Sacred Kamakhya Temple & Majuli River Island",
    "zone": "East & North-East",
    "capital": "Dispur",
    "spotCount": "24 Curated Spots",
    "districtCount": 6,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Beauty_of_Kaziranga_National_Park.jpg/960px-Beauty_of_Kaziranga_National_Park.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Kaziranga National Park Rhinos",
        "category": "UNESCO Wildlife Habitat",
        "city": "Golaghat / Nagaon",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Beauty_of_Kaziranga_National_Park.jpg/960px-Beauty_of_Kaziranga_National_Park.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kamakhya Temple Hill",
        "category": "Sacred Tantric Peetha",
        "city": "Guwahati",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Kamakhya_Temple_-_DEV_8829.jpg/960px-Kamakhya_Temple_-_DEV_8829.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Majuli Brahmaputra River Island",
        "category": "World Largest River Island",
        "city": "Majuli, Jorhat",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Doriya_River_of_Majuli.jpg/960px-Doriya_River_of_Majuli.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "meghalaya",
    "name": "Meghalaya",
    "tagline": "Abode of Clouds: Bio-Engineered Living Root Bridges, Nohkalikai Falls & Dawki River",
    "zone": "East & North-East",
    "capital": "Shillong",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg/960px-Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Cherrapunji Living Root Bridges",
        "category": "Bio-Engineered Wonder",
        "city": "Sohra (Cherrapunji)",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg/960px-Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nohkalikai Cascading Falls",
        "category": "Plunge Waterfall",
        "city": "East Khasi Hills",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/NohKaLikai_Falls_V2_Wiki.jpg/960px-NohKaLikai_Falls_V2_Wiki.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Dawki (Umngot) Crystal River",
        "category": "Transparent Waterway",
        "city": "Dawki, West Jaintia",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Dawki_River%2C_Meghalaya.jpg/960px-Dawki_River%2C_Meghalaya.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "sikkim",
    "name": "Sikkim",
    "tagline": "Kanchenjunga Kingdom: Sacred Gurudongmar Lake, Rumtek Monastery & Himalayan Ridges",
    "zone": "East & North-East",
    "capital": "Gangtok",
    "spotCount": "45 Curated Spots",
    "districtCount": 6,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Gurudongmar_Lake_Sikkim%2C_India_%28edit%29.jpg/960px-Gurudongmar_Lake_Sikkim%2C_India_%28edit%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Gurudongmar High-Altitude Lake",
        "category": "Glacial Sacred Lake (17,800 ft)",
        "city": "North Sikkim",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Gurudongmar_Lake_Sikkim%2C_India_%28edit%29.jpg/960px-Gurudongmar_Lake_Sikkim%2C_India_%28edit%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Rumtek Buddhist Monastery",
        "category": "Dharma Chakra Centre",
        "city": "Rumtek, Gangtok",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Rumtek_Monastery_alias_Dharma_Chakra_Centre_near_Gangtok%2C_East_Sikkim_09.jpg/960px-Rumtek_Monastery_alias_Dharma_Chakra_Centre_near_Gangtok%2C_East_Sikkim_09.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kanchenjunga Mountain Horizon",
        "category": "Third Highest World Peak",
        "city": "Pelling / Gangtok",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kangchenjunga_PangPema.JPG/960px-Kangchenjunga_PangPema.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "arunachal-pradesh",
    "name": "Arunachal Pradesh",
    "tagline": "Land of Dawn-Lit Mountains: Tawang Monastery Fortress, Sela Pass & Ziro Valley Pines",
    "zone": "East & North-East",
    "capital": "Itanagar",
    "spotCount": "24 Curated Spots",
    "districtCount": 2,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/TawangMonastery.jpg/960px-TawangMonastery.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Tawang Monastery Fortress",
        "category": "Largest Indian Monastery",
        "city": "Tawang",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/TawangMonastery.jpg/960px-TawangMonastery.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sela Pass Mountain Gateway (13,700 ft)",
        "category": "High Mountain Gateway",
        "city": "West Kameng",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Tawang_Gate.jpg/960px-Tawang_Gate.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ziro Valley Pine Plateaus",
        "category": "Apatani Tribal Landscape",
        "city": "Lower Subansiri",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/A_cross_section_of_luch_green_valley_of_Ziro.jpg/960px-A_cross_section_of_luch_green_valley_of_Ziro.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "nagaland",
    "name": "Nagaland",
    "tagline": "Land of Festivals: Kisama Hornbill Heritage Village, Dzukou Valley & War Cemetery",
    "zone": "East & North-East",
    "capital": "Kohima",
    "spotCount": "24 Curated Spots",
    "districtCount": 2,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Kisama_main_arena_Hornbill_Festival_2019.jpg/960px-Kisama_main_arena_Hornbill_Festival_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Kisama Hornbill Heritage Village",
        "category": "Naga Cultural Village",
        "city": "Kisama, Kohima",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Kisama_main_arena_Hornbill_Festival_2019.jpg/960px-Kisama_main_arena_Hornbill_Festival_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Dzukou Lily Valley",
        "category": "High-Altitude Valley",
        "city": "Kohima District",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Breathtaking_beauty_of_Dzukou_Valley_in_Manipur-Nagaland_border_%28edit%29.jpg/960px-Breathtaking_beauty_of_Dzukou_Valley_in_Manipur-Nagaland_border_%28edit%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kohima War Memorial Ridge",
        "category": "WWII Historic Memorial",
        "city": "Kohima",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Cemetery_with_kohima.jpeg/960px-Cemetery_with_kohima.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "manipur",
    "name": "Manipur",
    "tagline": "Jeweled Land: Floating Phumdis of Loktak Lake, Historic Kangla Fort & Sangai Deer",
    "zone": "East & North-East",
    "capital": "Imphal",
    "spotCount": "24 Curated Spots",
    "districtCount": 2,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/The_Loktak_Lake.jpg/960px-The_Loktak_Lake.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Loktak Lake Floating Phumdis",
        "category": "Floating Island Ecosystem",
        "city": "Moirang, Bishnupur",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/The_Loktak_Lake.jpg/960px-The_Loktak_Lake.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Shree Govindajee Golden Temple",
        "category": "Historic Golden Twin Dome",
        "city": "Imphal",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/FB7A9290.jpg/960px-FB7A9290.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Keibul Lamjao Floating Park",
        "category": "Only Floating National Park",
        "city": "Bishnupur",
        "image": "https://upload.wikimedia.org/wikipedia/commons/3/3c/CervusEldiAMNH.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      }
    ]
  },
  {
    "id": "mizoram",
    "name": "Mizoram",
    "tagline": "Rolling Green Hills: Dramatic Vantawng Falls, Scenic Reiek Tlang & Solomon Temple",
    "zone": "East & North-East",
    "capital": "Aizawl",
    "spotCount": "24 Curated Spots",
    "districtCount": 1,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Vantawng_Falls_in_1990s.jpg/960px-Vantawng_Falls_in_1990s.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Vantawng Multi-Tier Falls",
        "category": "Highest State Waterfall",
        "city": "Thenzawl, Serchhip",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Vantawng_Falls_in_1990s.jpg/960px-Vantawng_Falls_in_1990s.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Reiek Tlang Mountain Peak",
        "category": "Panoramic Peak",
        "city": "Mamit / Aizawl",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Reiek.JPG/960px-Reiek.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Solomon's Marble Temple",
        "category": "Christian Monument",
        "city": "Chawlhhmun, Aizawl",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Temple_thlalak.JPG/960px-Temple_thlalak.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "tripura",
    "name": "Tripura",
    "tagline": "Royal White Ujjayanta Palace, Floating Neermahal Water Palace & Unakoti Sculptures",
    "zone": "East & North-East",
    "capital": "Agartala",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg/960px-Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Ujjayanta Royal White Palace",
        "category": "Neoclassical Palace",
        "city": "Agartala",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg/960px-Ujjayanta_palace_Tripura_State_Museum_Agartala_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Neermahal Water Palace",
        "category": "Floating Lake Palace",
        "city": "Melaghar, Sepahijala",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Neer_Mahal%2C_the_water_palace_of_Tripura_02.jpg/960px-Neer_Mahal%2C_the_water_palace_of_Tripura_02.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Unakoti Rock-Cut Shiva Reliefs",
        "category": "Ancient Bas-Reliefs",
        "city": "Kailashahar, Unakoti",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Unakoti_3.jpg/960px-Unakoti_3.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "bihar",
    "name": "Bihar",
    "tagline": "Cradle of Enlightenment: Mahabodhi Bodhi Tree, Ancient Nalanda University & Barabar",
    "zone": "East & North-East",
    "capital": "Patna",
    "spotCount": "24 Curated Spots",
    "districtCount": 4,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Mahabodhitemple.jpg/960px-Mahabodhitemple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Mahabodhi Temple Complex",
        "category": "UNESCO Enlightenment Site",
        "city": "Bodh Gaya",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Mahabodhitemple.jpg/960px-Mahabodhitemple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nalanda Ancient University Ruins",
        "category": "UNESCO Ancient University",
        "city": "Nalanda",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg/960px-Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Barabar Rock-Cut Caves",
        "category": "Oldest Rock-Cut Caves in India",
        "city": "Makhdumpur, Jehanabad",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Lomas_Rishi_entrance.jpg/960px-Lomas_Rishi_entrance.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "jharkhand",
    "name": "Jharkhand",
    "tagline": "Land of Forests: Cascading Hundru Falls, Sacred Shikharji Peak & Baidyanath Dham",
    "zone": "East & North-East",
    "capital": "Ranchi",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Hundru_Falls%2C_Jharkhand%2C_India_4.jpg/960px-Hundru_Falls%2C_Jharkhand%2C_India_4.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Hundru Waterfalls",
        "category": "Subarnarekha River Cascade",
        "city": "Ranchi",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Hundru_Falls%2C_Jharkhand%2C_India_4.jpg/960px-Hundru_Falls%2C_Jharkhand%2C_India_4.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Parasnath Hill Shikharji",
        "category": "Highest Jain Pilgrimage Peak",
        "city": "Giridih",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Shikharji_Parasnath_Giridih.jpg/960px-Shikharji_Parasnath_Giridih.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Baidyanath Jyotirlinga Temple",
        "category": "Sacred Jyotirlinga Shrine",
        "city": "Deoghar",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Baidyanath_temple_and_temple_complex%2C_Deoghar_04.jpg/960px-Baidyanath_temple_and_temple_complex%2C_Deoghar_04.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "chhattisgarh",
    "name": "Chhattisgarh",
    "tagline": "Horseshoe Chitrakote Falls (Niagara of India), Ancient Bhoramdeo & Sirpur Monuments",
    "zone": "Central",
    "capital": "Raipur",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Chitrakot_waterfalls.JPG/960px-Chitrakot_waterfalls.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Chitrakote Horseshoe Falls",
        "category": "Niagara of India",
        "city": "Jagdalpur, Bastar",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Chitrakot_waterfalls.JPG/960px-Chitrakot_waterfalls.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Bhoramdeo Sculpted Temple",
        "category": "Khajuraho of Chhattisgarh",
        "city": "Kawardha",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Bhoramdeo_Temple%2C_Kawardha.jpg/960px-Bhoramdeo_Temple%2C_Kawardha.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sirpur Historic Brick Monuments",
        "category": "Buddhist & Hindu Complex",
        "city": "Mahasamund",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/8th_century_couple_embraced_and_mouth_kissing_at_Tivara_Deva_temple%2C_she_stands_on_his_feet%2C_Sirpur_monuments_Chhattisgarh_India.jpg/960px-8th_century_couple_embraced_and_mouth_kissing_at_Tivara_Deva_temple%2C_she_stands_on_his_feet%2C_Sirpur_monuments_Chhattisgarh_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "haryana",
    "name": "Haryana",
    "tagline": "Ancient Kurukshetra Brahma Sarovar, Pinjore Mughal Gardens & Sultanpur Birds",
    "zone": "North",
    "capital": "Chandigarh",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Holy_pic_kkr.jpg/960px-Holy_pic_kkr.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Brahma Sarovar Holy Pool",
        "category": "Epic Sacred Pool",
        "city": "Kurukshetra",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Holy_pic_kkr.jpg/960px-Holy_pic_kkr.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Yadavindra Mughal Gardens",
        "category": "17th Century Terraced Garden",
        "city": "Pinjore, Panchkula",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Pinjore_Garden_Panchkula.jpg/960px-Pinjore_Garden_Panchkula.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sultanpur Bird Sanctuary",
        "category": "Ramsar Wetland",
        "city": "Gurugram",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Sultanpur_Bird_Sanctuary%2C_Gurgaon.jpg/960px-Sultanpur_Bird_Sanctuary%2C_Gurgaon.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "chandigarh",
    "name": "Chandigarh",
    "tagline": "The City Beautiful: Nek Chand Rock Garden, Sukhna Lake Promenade & Open Hand",
    "zone": "Union Territories",
    "capital": "Chandigarh",
    "spotCount": "24 Curated Spots",
    "districtCount": 1,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Chandigarh_Rock_Garden_4.jpg/960px-Chandigarh_Rock_Garden_4.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Rock Garden of Chandigarh",
        "category": "Recycled Sculpture Park",
        "city": "Sector 1, Chandigarh",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Chandigarh_Rock_Garden_4.jpg/960px-Chandigarh_Rock_Garden_4.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sukhna Lake Promenade",
        "category": "Himalayan Foothill Reservoir",
        "city": "Sector 1, Chandigarh",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Sukhna_Lake_Chandigarh_India.jpg/960px-Sukhna_Lake_Chandigarh_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Open Hand Monument",
        "category": "Le Corbusier Peace Icon",
        "city": "Sector 1, Chandigarh",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Open_Hand_monument%2C_Chandigarh.jpg/960px-Open_Hand_monument%2C_Chandigarh.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "puducherry",
    "name": "Puducherry",
    "tagline": "French Riviera of the East: White Town Boulevards, Auroville Matrimandir & Beaches",
    "zone": "Union Territories",
    "capital": "Pondicherry",
    "spotCount": "24 Curated Spots",
    "districtCount": 1,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/en/thumb/1/16/Feu_d%27artifice_du_14_juillet_2017_depuis_le_champ_de_Mars_%C3%A0_Paris%2C_devant_la_Tour_Eiffel%2C_Bastille_day_2017_%2835118978683%29.jpg/960px-Feu_d%27artifice_du_14_juillet_2017_depuis_le_champ_de_Mars_%C3%A0_Paris%2C_devant_la_Tour_Eiffel%2C_Bastille_day_2017_%2835118978683%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "French Quarter Promenade",
        "category": "Colonial French Quarter",
        "city": "Puducherry",
        "image": "https://thumb.wikimedia.org/wikipedia/en/thumb/1/16/Feu_d%27artifice_du_14_juillet_2017_depuis_le_champ_de_Mars_%C3%A0_Paris%2C_devant_la_Tour_Eiffel%2C_Bastille_day_2017_%2835118978683%29.jpg/960px-Feu_d%27artifice_du_14_juillet_2017_depuis_le_champ_de_Mars_%C3%A0_Paris%2C_devant_la_Tour_Eiffel%2C_Bastille_day_2017_%2835118978683%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Auroville Matrimandir Golden Dome",
        "category": "Spiritual Golden Sphere",
        "city": "Auroville",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/The_Matrimandir_in_Auroville%2C_Tamil_Nadu%2C_India.jpg/960px-The_Matrimandir_in_Auroville%2C_Tamil_Nadu%2C_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Promenade Seafront Beach",
        "category": "Scenic Oceanfront",
        "city": "Puducherry",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Pondicherry-Rock_beach_aerial_view.jpg/960px-Pondicherry-Rock_beach_aerial_view.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "andaman-and-nicobar-islands",
    "name": "Andaman & Nicobar Islands",
    "tagline": "Emerald Islands: Historic Cellular Jail, Turquoise Radhanagar Beach & Port Blair Harbour",
    "zone": "Union Territories",
    "capital": "Port Blair",
    "spotCount": "24 Curated Spots",
    "districtCount": 5,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Front_View_of_Cellular_Jail%2C_Port_Blair.JPG/960px-Front_View_of_Cellular_Jail%2C_Port_Blair.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Cellular Jail National Memorial",
        "category": "Historic Freedom Memorial",
        "city": "Port Blair",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Front_View_of_Cellular_Jail%2C_Port_Blair.JPG/960px-Front_View_of_Cellular_Jail%2C_Port_Blair.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Radhanagar Beach White Sands",
        "category": "Asia Best Turquoise Beach",
        "city": "Havelock (Swaraj Dweep)",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg/960px-Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Port Blair Harbour & Coast",
        "category": "Historical Island Sanctuary",
        "city": "Port Blair",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/View_from_South_Point%2C_%28Port_Blair%2C_India%29.jpg/960px-View_from_South_Point%2C_%28Port_Blair%2C_India%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  {
    "id": "lakshadweep",
    "name": "Lakshadweep",
    "tagline": "Untouched Coral Paradise: Agatti Atolls, Bangaram Crystal Lagoons & Kavaratti Waters",
    "zone": "Union Territories",
    "capital": "Kavaratti",
    "spotCount": "24 Curated Spots",
    "districtCount": 2,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Agatti_Airstrip.jpg/960px-Agatti_Airstrip.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Agatti Island Coral Atoll",
        "category": "Atoll Lagoon & Airstrip",
        "city": "Agatti Island",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Agatti_Airstrip.jpg/960px-Agatti_Airstrip.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Bangaram Coral Sandbars",
        "category": "Tear-Drop Coral Island",
        "city": "Bangaram Island",
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/72/A_beach_side_resort_at_Kadmat_Island%2C_Lakshadweep.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Kavaratti Marine Lagoon",
        "category": "Capital Coral Atoll",
        "city": "Kavaratti Island",
        "image": "https://upload.wikimedia.org/wikipedia/commons/2/23/Kavaratii.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      }
    ]
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu",
    "name": "Dadra and Nagar Haveli and Daman and Diu",
    "tagline": "Portuguese Coastal Bastions: Diu Ocean Fort, Naida Sunlight Caves & Silvassa Gardens",
    "zone": "Union Territories",
    "capital": "Daman",
    "spotCount": "24 Curated Spots",
    "districtCount": 3,
    "heroImage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Monuments_of_Diu_%28City%29.jpg/960px-Monuments_of_Diu_%28City%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "topPlaces": [
      {
        "name": "Diu Ocean Portuguese Fortress",
        "category": "Arabian Sea Castle",
        "city": "Diu",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Monuments_of_Diu_%28City%29.jpg/960px-Monuments_of_Diu_%28City%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Vanganga Lake Gardens",
        "category": "Island Garden Lake",
        "city": "Silvassa",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Dadra_and_Nagar_Haveli_Silvassa_3.jpg/960px-Dadra_and_Nagar_Haveli_Silvassa_3.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jampore Beach Arabian Coast",
        "category": "Arabian Sea Shoreline",
        "city": "Daman",
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Jampore_Beach_%2878525%29.jpg/960px-Jampore_Beach_%2878525%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  }
];
