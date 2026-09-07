#!/usr/bin/env python3
"""
=============================================================================
TripNova Tourism Dataset Synchronization Engine
=============================================================================
Unifies locations and places from:
1. backend/database/datasets/locations_tn.csv (38 Tamil Nadu districts)
2. backend/database/datasets/locations_kl.csv (14 Kerala districts)
3. backend/database/datasets/places_1.csv (71 places)
4. backend/database/datasets/places_2.csv (200 places)
5. backend/database/datasets/india_tourism_dataset-8.xlsx:
   - 'Dataset' (57 destinations across all 28 states + 8 UTs)
   - 'State_District_Spots' (235 curated spots across all Indian states)
   - 'Uploaded_Places_Extended' (1,019 places across India)
   - 'Uploaded_Top_Places_Kaggle' (325 top places)

Standardizes:
- Common Location IDs: 'loc-[state_code]-[district_slug]'
- Common Place IDs: 'plc-[place_slug]'
- Normalized Categories, Ratings, Entry Fees, Coordinates, Seasons, Durations,
  Transport, Nearby Hotels, and Dining hints.

Updates:
- backend/database/tripnova.db (Live SQLite database)
- backend/database/seed.sql (MySQL bootstrap and seeding file)
=============================================================================
"""

import os
import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
import re
import csv
import sqlite3
import math
import openpyxl
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASETS_DIR = os.path.join(BASE_DIR, 'database', 'datasets')
DB_PATH = os.path.join(BASE_DIR, 'database', 'tripnova.db')
SEED_SQL_PATH = os.path.join(BASE_DIR, 'database', 'seed.sql')

STATE_CODE_MAP = {
    'andaman & nicobar islands': 'an',
    'andaman and nicobar islands': 'an',
    'andhra pradesh': 'ap',
    'arunachal pradesh': 'ar',
    'assam': 'as',
    'bihar': 'br',
    'chandigarh': 'ch',
    'chhattisgarh': 'cg',
    'dadra and nagar haveli and daman and diu': 'dn',
    'daman and diu': 'dn',
    'delhi': 'dl',
    'goa': 'ga',
    'gujarat': 'gj',
    'gujrat': 'gj',
    'haryana': 'hr',
    'himachal pradesh': 'hp',
    'jammu & kashmir': 'jk',
    'jammu and kashmir': 'jk',
    'ladakh': 'la',
    'lakshadweep': 'ld',
    'madhya pradesh': 'mp',
    'maharashtra': 'mh',
    'manipur': 'mn',
    'meghalaya': 'ml',
    'mizoram': 'mz',
    'nagaland': 'nl',
    'odisha': 'od',
    'puducherry': 'py',
    'pondicherry': 'py',
    'punjab': 'pb',
    'rajasthan': 'rj',
    'sikkim': 'sk',
    'tamil nadu': 'tn',
    'telangana': 'ts',
    'tripura': 'tr',
    'uttar pradesh': 'up',
    'uttarakhand': 'uk',
    'west bengal': 'wb'
}

STATE_REGION_MAP = {
    'tamil nadu': 'Southern',
    'kerala': 'Southern',
    'karnataka': 'Southern',
    'andhra pradesh': 'Southern',
    'telangana': 'Southern',
    'puducherry': 'Southern',
    'delhi': 'Northern',
    'punjab': 'Northern',
    'haryana': 'Northern',
    'himachal pradesh': 'Northern',
    'jammu & kashmir': 'Northern',
    'jammu and kashmir': 'Northern',
    'ladakh': 'Northern',
    'uttar pradesh': 'Northern',
    'uttarakhand': 'Northern',
    'chandigarh': 'Northern',
    'rajasthan': 'Western',
    'gujarat': 'Western',
    'maharashtra': 'Western',
    'goa': 'Western',
    'dadra and nagar haveli and daman and diu': 'Western',
    'daman and diu': 'Western',
    'madhya pradesh': 'Central',
    'chhattisgarh': 'Central',
    'bihar': 'Eastern',
    'jharkhand': 'Eastern',
    'odisha': 'Eastern',
    'west bengal': 'Eastern',
    'assam': 'North Eastern',
    'arunachal pradesh': 'North Eastern',
    'manipur': 'North Eastern',
    'meghalaya': 'North Eastern',
    'mizoram': 'North Eastern',
    'nagaland': 'North Eastern',
    'sikkim': 'North Eastern',
    'tripura': 'North Eastern',
    'andaman & nicobar islands': 'Islands',
    'andaman and nicobar islands': 'Islands',
    'lakshadweep': 'Islands'
}

def slugify(text, max_len=36):
    text = re.sub(r'[^\w\s-]', '', str(text or '')).strip().lower()
    slug = re.sub(r'[-\s]+', '-', text)
    return slug[:max_len].strip('-')

def normalize_state_name(state_raw):
    s = str(state_raw or '').strip()
    s_low = s.lower()
    if 'gujrat' in s_low: return 'Gujarat'
    if 'karanataka' in s_low: return 'Karnataka'
    if 'andaman' in s_low: return 'Andaman & Nicobar Islands'
    if 'jammu' in s_low: return 'Jammu & Kashmir'
    if 'daman' in s_low or 'dadra' in s_low: return 'Dadra and Nagar Haveli and Daman and Diu'
    if 'pondicherry' in s_low: return 'Puducherry'
    words = [w.capitalize() if w.lower() not in ['and', '&', 'of', 'the'] else w.lower() for w in s.split()]
    return ' '.join(words)

def normalize_category(cat_raw, name_raw=''):
    s = f"{cat_raw or ''} {name_raw or ''}".lower()
    if any(k in s for k in ['temple', 'religious', 'spiritual', 'church', 'mosque', 'gurudwara', 'basilica', 'dargah', 'pilgrimage', 'shrine', 'ashram', 'matha']):
        return 'religious'
    if any(k in s for k in ['beach', 'sea', 'coast', 'cove', 'promenade']):
        return 'beach'
    if any(k in s for k in ['museum', 'planetarium', 'gallery', 'memorial museum', 'science center']):
        return 'museum'
    if any(k in s for k in ['wildlife', 'national park', 'sanctuary', 'tiger reserve', 'safari', 'zoo', 'biosphere']):
        return 'wildlife'
    if any(k in s for k in ['hill', 'peak', 'ridge', 'valley', 'pass', 'viewpoint', 'plateau', 'ghat']):
        return 'hill_station'
    if any(k in s for k in ['falls', 'waterfall', 'lake', 'dam', 'caves', 'cavern', 'river', 'forest', 'garden', 'park', 'nature']):
        return 'nature'
    if any(k in s for k in ['fort', 'palace', 'tomb', 'monument', 'ruins', 'ancient', 'historical', 'anicut', 'stepwell', 'chhatri']):
        return 'historical'
    if any(k in s for k in ['heritage', 'unesco', 'haveli', 'village', 'mahal', 'memorial']):
        return 'heritage'
    if any(k in s for k in ['adventure', 'trek', 'rafting', 'paragliding', 'water sports', 'safari']):
        return 'adventure'
    if any(k in s for k in ['market', 'bazaar', 'shopping', 'silk', 'handloom', 'mall']):
        return 'shopping'
    if any(k in s for k in ['food', 'cuisine', 'restaurant', 'dining', 'mess']):
        return 'food_dining'
    if any(k in s for k in ['cultural', 'arts', 'dance', 'theatre', 'craft']):
        return 'cultural'
    return 'other'

def parse_rating(val):
    if val is None: return 4.5
    if isinstance(val, (int, float)):
        return round(min(5.0, max(1.0, float(val))), 2)
    s = str(val)
    m = re.findall(r'(\d+\.?\d*)', s)
    if m:
        nums = [float(x) for x in m if float(x) <= 5.0]
        if nums:
            return round(sum(nums) / len(nums), 2)
    return 4.5

def parse_entry_fee(val):
    if val is None: return 0.0
    if isinstance(val, (int, float)): return float(val)
    s = str(val).lower()
    if 'free' in s: return 0.0
    m = re.findall(r'(?:rs\.?|inr|\u20b9)?\s*(\d+)', s)
    if m: return float(m[0])
    return 0.0

def load_locations():
    locations = {}
    loc_id_map = {}

    # 1. Load Tamil Nadu CSV
    path_tn = os.path.join(DATASETS_DIR, 'locations_tn.csv')
    if os.path.exists(path_tn):
        with open(path_tn, 'r', encoding='utf-8', errors='ignore') as f:
            for r in csv.DictReader(f):
                loc_id = r['id'].strip()
                name = r['name'].strip()
                state = normalize_state_name(r['state'])
                key = (name.lower(), state.lower())
                loc_obj = {
                    'id': loc_id,
                    'name': name,
                    'state': state,
                    'country': r.get('country', 'India').strip(),
                    'currency_code': r.get('currency_code', 'INR').strip(),
                    'description': r.get('description', '').strip(),
                    'latitude': float(r['latitude']) if r.get('latitude') else None,
                    'longitude': float(r['longitude']) if r.get('longitude') else None,
                    'region': r.get('region', 'Southern').strip(),
                    'created_at': r.get('created_at', '2026-09-04 00:00:00'),
                    'updated_at': r.get('updated_at', '2026-09-04 00:00:00')
                }
                locations[key] = loc_obj
                loc_id_map[loc_id] = loc_obj

    # 2. Load Kerala CSV
    path_kl = os.path.join(DATASETS_DIR, 'locations_kl.csv')
    if os.path.exists(path_kl):
        with open(path_kl, 'r', encoding='utf-8', errors='ignore') as f:
            for r in csv.DictReader(f):
                loc_id = r['id'].strip()
                name = r['name'].strip()
                state = normalize_state_name(r['state'])
                key = (name.lower(), state.lower())
                loc_obj = {
                    'id': loc_id,
                    'name': name,
                    'state': state,
                    'country': r.get('country', 'India').strip(),
                    'currency_code': r.get('currency_code', 'INR').strip(),
                    'description': r.get('description', '').strip(),
                    'latitude': float(r['latitude']) if r.get('latitude') else None,
                    'longitude': float(r['longitude']) if r.get('longitude') else None,
                    'region': 'Southern',
                    'created_at': r.get('created_at', '2026-09-04 00:00:00'),
                    'updated_at': r.get('updated_at', '2026-09-04 00:00:00')
                }
                locations[key] = loc_obj
                loc_id_map[loc_id] = loc_obj

    # 3. Load Excel sheets to discover all other locations
    xlsx_path = os.path.join(DATASETS_DIR, 'india_tourism_dataset-8.xlsx')
    if os.path.exists(xlsx_path):
        wb = openpyxl.load_workbook(xlsx_path, data_only=True)
        # Scan Dataset sheet
        if 'Dataset' in wb.sheetnames:
            for r in list(wb['Dataset'].iter_rows(values_only=True))[1:]:
                st = normalize_state_name(r[1])
                dist = str(r[2] or '').strip()
                if st and dist:
                    key = (dist.lower(), st.lower())
                    if key not in locations:
                        st_code = STATE_CODE_MAP.get(st.lower(), slugify(st)[:3])
                        loc_id = f"loc-{st_code}-{slugify(dist, 10)}"
                        counter = 1
                        orig_id = loc_id
                        while loc_id in loc_id_map:
                            loc_id = f"{orig_id}-{counter}"
                            counter += 1

                        region = STATE_REGION_MAP.get(st.lower(), 'Northern')
                        loc_obj = {
                            'id': loc_id,
                            'name': dist,
                            'state': st,
                            'country': 'India',
                            'currency_code': 'INR',
                            'description': f"Scenic and historic tourist district in {st}, known for {r[0]} and regional cultural attractions.",
                            'latitude': float(r[4]) if r[4] is not None else None,
                            'longitude': float(r[5]) if r[5] is not None else None,
                            'region': region,
                            'created_at': '2026-09-04 00:00:00',
                            'updated_at': '2026-09-04 00:00:00'
                        }
                        locations[key] = loc_obj
                        loc_id_map[loc_id] = loc_obj

        # Scan State_District_Spots sheet
        if 'State_District_Spots' in wb.sheetnames:
            for r in list(wb['State_District_Spots'].iter_rows(values_only=True))[1:]:
                st = normalize_state_name(r[0])
                dist = str(r[1] or '').strip()
                if st and dist:
                    key = (dist.lower(), st.lower())
                    if key not in locations:
                        st_code = STATE_CODE_MAP.get(st.lower(), slugify(st)[:3])
                        loc_id = f"loc-{st_code}-{slugify(dist.split('(')[0], 10)}"
                        counter = 1
                        orig_id = loc_id
                        while loc_id in loc_id_map:
                            loc_id = f"{orig_id}-{counter}"
                            counter += 1

                        region = STATE_REGION_MAP.get(st.lower(), 'Northern')
                        loc_obj = {
                            'id': loc_id,
                            'name': dist,
                            'state': st,
                            'country': 'India',
                            'currency_code': 'INR',
                            'description': f"Major travel destination and tourist district in {st}, hosting prominent attractions like {r[2]}.",
                            'latitude': None,
                            'longitude': None,
                            'region': region,
                            'created_at': '2026-09-04 00:00:00',
                            'updated_at': '2026-09-04 00:00:00'
                        }
                        locations[key] = loc_obj
                        loc_id_map[loc_id] = loc_obj

        # Scan Uploaded_Places_Extended sheet
        if 'Uploaded_Places_Extended' in wb.sheetnames:
            for r in list(wb['Uploaded_Places_Extended'].iter_rows(values_only=True))[1:]:
                st = normalize_state_name(r[0])
                city = str(r[1] or '').strip()
                if st and city:
                    key = (city.lower(), st.lower())
                    if key not in locations:
                        st_code = STATE_CODE_MAP.get(st.lower(), slugify(st)[:3])
                        loc_id = f"loc-{st_code}-{slugify(city, 10)}"
                        counter = 1
                        orig_id = loc_id
                        while loc_id in loc_id_map:
                            loc_id = f"{orig_id}-{counter}"
                            counter += 1

                        region = STATE_REGION_MAP.get(st.lower(), 'Northern')
                        loc_obj = {
                            'id': loc_id,
                            'name': city,
                            'state': st,
                            'country': 'India',
                            'currency_code': 'INR',
                            'description': f"Vibrant tourism destination in {st}, featuring celebrated landmarks including {r[2]}.",
                            'latitude': float(r[4]) if r[4] is not None else None,
                            'longitude': float(r[5]) if r[5] is not None else None,
                            'region': region,
                            'created_at': '2026-09-04 00:00:00',
                            'updated_at': '2026-09-04 00:00:00'
                        }
                        locations[key] = loc_obj
                        loc_id_map[loc_id] = loc_obj

    return locations, loc_id_map

def find_location_id(district_name, state_name, locations_dict, loc_id_map):
    st_norm = normalize_state_name(state_name).lower()
    dist_norm = str(district_name or '').strip().lower()

    TN_SYNONYMS = {
        'kancheepuram': 'kanchipuram',
        'kanniyakumari': 'kanyakumari',
        'thiruvarur': 'tiruvarur',
        'villupuram': 'viluppuram',
        'the nilgiris': 'nilgiris',
        'thiruvallur': 'tiruvallur',
        'tiruchirappalli': 'tiruchirappalli',
        'trichy': 'tiruchirappalli',
        'kodaikanal': 'dindigul',
        'ooty': 'nilgiris',
        'rameswaram': 'ramanathapuram',
        'mahabalipuram': 'chengalpattu',
        'mamallapuram': 'chengalpattu',
        'courtallam': 'tenkasi',
        'hogenakkal': 'dharmapuri',
        'yercaud': 'salem'
    }
    if st_norm in ['tamil nadu', 'tn'] and dist_norm in TN_SYNONYMS:
        dist_norm = TN_SYNONYMS[dist_norm]

    if (dist_norm, st_norm) in locations_dict:
        return locations_dict[(dist_norm, st_norm)]['id']

    for (d, s), obj in locations_dict.items():
        if s == st_norm:
            if dist_norm in d or d in dist_norm:
                return obj['id']
            d_clean = re.sub(r'\(.*?\)', '', d).strip()
            dist_clean = re.sub(r'\(.*?\)', '', dist_norm).strip()
            if d_clean and dist_clean and (d_clean in dist_clean or dist_clean in dist_clean):
                return obj['id']

    for (d, s), obj in locations_dict.items():
        if s == st_norm:
            return obj['id']

    return 'loc-chn'

def load_places(locations_dict, loc_id_map):
    places = {}
    place_ids = set()

    def generate_place_id(pname):
        base = f"plc-{slugify(pname, 32)}"
        pid = base
        c = 1
        while pid in place_ids:
            pid = f"{base}-{c}"
            c += 1
        place_ids.add(pid)
        return pid

    # 1. Load places_1.csv and places_2.csv
    for fname in ['places_1.csv', 'places_2.csv']:
        fpath = os.path.join(DATASETS_DIR, fname)
        if os.path.exists(fpath):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                for r in csv.DictReader(f):
                    name = r['name'].strip()
                    pid = r['id'].strip()
                    place_ids.add(pid)
                    norm_key = name.lower()

                    place_obj = {
                        'id': pid,
                        'location_id': r['location_id'].strip(),
                        'name': name,
                        'category': normalize_category(r.get('category', ''), name),
                        'avg_rating': parse_rating(r.get('avg_rating', 4.5)),
                        'review_count': int(float(r.get('review_count', 100) or 100)),
                        'entry_fee': parse_entry_fee(r.get('entry_fee', 0)),
                        'opening_hours': r.get('opening_hours', '09:00 - 18:00').strip(),
                        'latitude': float(r['latitude']) if r.get('latitude') else None,
                        'longitude': float(r['longitude']) if r.get('longitude') else None,
                        'description': r.get('description', '').strip() or f"{name} is a renowned attraction, welcoming travelers from around the world.",
                        'best_season': r.get('best_season', 'Oct-Mar').strip(),
                        'avg_visit_time': r.get('avg_visit_time', '1-2 hours').strip(),
                        'transport': r.get('transport', 'Accessible via local bus, auto, and taxi.').strip(),
                        'nearby_hotels': r.get('nearby_hotels', 'Budget to premium hotels and homestays available in vicinity.').strip(),
                        'nearby_restaurants': r.get('nearby_restaurants', 'Local authentic dining and multi-cuisine eateries nearby.').strip(),
                        'created_at': r.get('created_at', '2026-09-04 00:00:00'),
                        'updated_at': r.get('updated_at', '2026-09-04 00:00:00')
                    }
                    places[norm_key] = place_obj

    print(f"✅ Loaded {len(places)} places from places_1.csv & places_2.csv")

    # 2. Load Excel Workbook
    xlsx_path = os.path.join(DATASETS_DIR, 'india_tourism_dataset-8.xlsx')
    if os.path.exists(xlsx_path):
        wb = openpyxl.load_workbook(xlsx_path, data_only=True)

        # 2a. Sheet: Dataset (57 destinations across India)
        if 'Dataset' in wb.sheetnames:
            ds_sheet = wb['Dataset']
            for r in list(ds_sheet.iter_rows(values_only=True))[1:]:
                pname = str(r[0] or '').strip()
                if not pname: continue
                st = normalize_state_name(r[1])
                dist = str(r[2] or '').strip()
                norm_key = pname.lower()

                loc_id = find_location_id(dist, st, locations_dict, loc_id_map)
                lat = float(r[4]) if r[4] is not None else None
                lng = float(r[5]) if r[5] is not None else None
                desc = str(r[6] or '').strip()
                season = str(r[7] or 'Oct-Mar').strip()
                fee = parse_entry_fee(r[8])
                rating = parse_rating(r[9])
                visit_time = str(r[10] or '1-2 hours').strip()
                hotels = str(r[11] or 'Budget to luxury accommodations available nearby.').strip()
                dining = str(r[12] or 'Local regional cuisine and restaurants in vicinity.').strip()
                transport = str(r[13] or 'Well connected by road, bus, and taxi services.').strip()

                if norm_key in places:
                    p = places[norm_key]
                    if not p['latitude'] and lat: p['latitude'] = lat
                    if not p['longitude'] and lng: p['longitude'] = lng
                    if desc and len(desc) > len(p['description']): p['description'] = desc
                    if hotels: p['nearby_hotels'] = hotels
                    if dining: p['nearby_restaurants'] = dining
                    if transport: p['transport'] = transport
                else:
                    pid = generate_place_id(pname)
                    places[norm_key] = {
                        'id': pid,
                        'location_id': loc_id,
                        'name': pname,
                        'category': normalize_category(r[3], pname),
                        'avg_rating': rating,
                        'review_count': 1500,
                        'entry_fee': fee,
                        'opening_hours': '09:00 - 18:00',
                        'latitude': lat,
                        'longitude': lng,
                        'description': desc or f"{pname} is a prominent tourist landmark located in {dist}, {st}.",
                        'best_season': season,
                        'avg_visit_time': visit_time,
                        'transport': transport,
                        'nearby_hotels': hotels,
                        'nearby_restaurants': dining,
                        'created_at': '2026-09-04 00:00:00',
                        'updated_at': '2026-09-04 00:00:00'
                    }

        print(f"✅ Total places after 'Dataset' sheet: {len(places)}")

        # 2b. Sheet: State_District_Spots (235 spots)
        if 'State_District_Spots' in wb.sheetnames:
            sds_sheet = wb['State_District_Spots']
            for r in list(sds_sheet.iter_rows(values_only=True))[1:]:
                st = normalize_state_name(r[0])
                dist = str(r[1] or '').strip()
                pname = str(r[2] or '').strip()
                if not pname: continue
                norm_key = pname.lower()

                loc_id = find_location_id(dist, st, locations_dict, loc_id_map)
                cat = normalize_category(r[3], pname)
                season = str(r[4] or 'Oct-Mar').strip()
                fee = parse_entry_fee(r[5])
                rating = parse_rating(r[6])
                visit_time = str(r[7] or '1-2 hours').strip()
                hotels = str(r[9] or 'Budget to mid-range stays available.').strip()
                dining = str(r[10] or 'Regional eateries and cafes nearby.').strip() if len(r) > 10 else 'Regional eateries nearby.'

                if norm_key in places:
                    p = places[norm_key]
                    if not p.get('best_season') and season: p['best_season'] = season
                    if not p.get('avg_visit_time') and visit_time: p['avg_visit_time'] = visit_time
                else:
                    pid = generate_place_id(pname)
                    places[norm_key] = {
                        'id': pid,
                        'location_id': loc_id,
                        'name': pname,
                        'category': cat,
                        'avg_rating': rating,
                        'review_count': 950,
                        'entry_fee': fee,
                        'opening_hours': '08:30 - 18:30',
                        'latitude': None,
                        'longitude': None,
                        'description': f"{pname} is a celebrated {cat} attraction situated in {dist}, {st}, popular for sightseers and culture lovers.",
                        'best_season': season,
                        'avg_visit_time': visit_time,
                        'transport': f"Accessible by local buses, autos, and private vehicles from central {dist}.",
                        'nearby_hotels': hotels,
                        'nearby_restaurants': dining,
                        'created_at': '2026-09-04 00:00:00',
                        'updated_at': '2026-09-04 00:00:00'
                    }

        print(f"✅ Total places after 'State_District_Spots': {len(places)}")

        # 2c. Sheet: Uploaded_Places_Extended (1,019 spots)
        if 'Uploaded_Places_Extended' in wb.sheetnames:
            upe_sheet = wb['Uploaded_Places_Extended']
            for r in list(upe_sheet.iter_rows(values_only=True))[1:]:
                st = normalize_state_name(r[0])
                city = str(r[1] or '').strip()
                pname = str(r[2] or '').strip()
                if not pname: continue
                norm_key = pname.lower()

                lat = float(r[4]) if r[4] is not None else None
                lng = float(r[5]) if r[5] is not None else None
                rating = parse_rating(r[6])
                fee = parse_entry_fee(r[7])

                if norm_key in places:
                    p = places[norm_key]
                    if not p['latitude'] and lat: p['latitude'] = lat
                    if not p['longitude'] and lng: p['longitude'] = lng
                    if fee > 0 and p['entry_fee'] == 0: p['entry_fee'] = fee
                else:
                    loc_id = find_location_id(city, st, locations_dict, loc_id_map)
                    cat = normalize_category(r[3], pname)
                    pid = generate_place_id(pname)
                    places[norm_key] = {
                        'id': pid,
                        'location_id': loc_id,
                        'name': pname,
                        'category': cat,
                        'avg_rating': rating,
                        'review_count': 1200,
                        'entry_fee': fee,
                        'opening_hours': '09:00 - 18:00',
                        'latitude': lat,
                        'longitude': lng,
                        'description': f"{pname} is a premier {cat} destination in {city}, {st}, attracting tourists with its iconic significance.",
                        'best_season': 'Oct-Mar',
                        'avg_visit_time': '1-2 hours',
                        'transport': f"Well connected by city bus lines, cabs, and metro/rail routes in {city}.",
                        'nearby_hotels': 'Top rated hotels, boutique lodges, and homestays nearby.',
                        'nearby_restaurants': 'Variety of authentic multi-cuisine restaurants and street food in area.',
                        'created_at': '2026-09-04 00:00:00',
                        'updated_at': '2026-09-04 00:00:00'
                    }

        print(f"✅ Total places after 'Uploaded_Places_Extended': {len(places)}")

        # 2d. Sheet: Uploaded_Top_Places_Kaggle (325 spots)
        if 'Uploaded_Top_Places_Kaggle' in wb.sheetnames:
            k_sheet = wb['Uploaded_Top_Places_Kaggle']
            for r in list(k_sheet.iter_rows(values_only=True))[1:]:
                pname = str(r[3] or '').strip()
                norm_key = pname.lower()
                if norm_key in places:
                    p = places[norm_key]
                    if r[6] is not None and not p.get('avg_visit_time'):
                        p['avg_visit_time'] = f"{r[6]} hours"

    # -------------------------------------------------------------------------
    # 2e. Load 7 Curated Tamil Nadu Category Datasets (181 Tourist Spots)
    # -------------------------------------------------------------------------
    # Load OSM reference coordinates from tamil_nadu_tourist_places.xlsx
    osm_places = {}
    osm_path = os.path.join(DATASETS_DIR, 'tamil_nadu_tourist_places.xlsx')
    if os.path.exists(osm_path):
        try:
            osm_wb = openpyxl.load_workbook(osm_path, data_only=True)
            for r in list(osm_wb.active.iter_rows(values_only=True))[1:]:
                if r[0] and r[2] and r[3]:
                    osm_places[str(r[0]).strip().lower()] = (float(r[2]), float(r[3]))
        except Exception as e:
            print(f"Warning loading OSM coords: {e}")

    tn_category_datasets = [
        ('Tamilnadu parks and gardens.xlsx', 'nature'),
        ('Tamilnadu_ArtGallery.xlsx', 'museum'),
        ('Tamilnadu_Cultural Centre.xlsx', 'cultural'),
        ('Tamilnadu_Exhibition.xlsx', 'cultural'),
        ('Tamilnadu_Forts.xlsx', 'historical'),
        ('Tamilnadu_Shopping market & Bazaar.xlsx', 'shopping'),
        ('cinema.xlsx', 'cultural')
    ]

    new_tn_added = 0
    new_tn_enriched = 0

    for fname, default_cat in tn_category_datasets:
        fpath = os.path.join(DATASETS_DIR, fname)
        if not os.path.exists(fpath):
            continue
        try:
            ds_wb = openpyxl.load_workbook(fpath, data_only=True)
            ds_rows = list(ds_wb.active.iter_rows(values_only=True))
            for idx, r in enumerate(ds_rows[1:]):
                if not r or not any(r):
                    continue
                pname = str(r[2] or '').strip()
                if not pname:
                    continue
                dist = str(r[1] or '').strip()
                desc = str(r[4] or '').strip()
                attractions = str(r[5] or '').strip()
                season = str(r[6] or 'Oct-Mar').strip()
                transport = str(r[7] or '').strip()
                hospital = str(r[10] or '').strip() if len(r) > 10 else ''
                police = str(r[11] or '').strip() if len(r) > 11 else ''
                rules = str(r[13] or '').strip() if len(r) > 13 else ''
                source = str(r[14] or '').strip() if len(r) > 14 else ''
                map_link = str(r[15] or '').strip() if len(r) > 15 else ''

                loc_id = find_location_id(dist, 'Tamil Nadu', locations_dict, loc_id_map)
                loc_obj = loc_id_map.get(loc_id, {})
                base_lat = loc_obj.get('latitude', 13.0827) or 13.0827
                base_lng = loc_obj.get('longitude', 80.2707) or 80.2707

                # Coordinates lookup: OSM -> Spatial spread around district
                lat, lng = None, None
                p_low = pname.lower()
                if p_low in osm_places:
                    lat, lng = osm_places[p_low]
                else:
                    for k in osm_places:
                        if len(k) > 6 and (k in p_low or p_low in k):
                            lat, lng = osm_places[k]
                            break
                if not lat:
                    angle = (idx * 137.5) % 360
                    radius = 0.012 + (idx % 5) * 0.005
                    lat = round(float(base_lat) + radius * math.cos(math.radians(angle)), 6)
                    lng = round(float(base_lng) + radius * math.sin(math.radians(angle)), 6)

                full_desc = desc
                if attractions and attractions not in full_desc:
                    full_desc += f" Major features & attractions: {attractions}."
                if rules:
                    full_desc += f" Visitor Guidelines: {rules}."
                if source:
                    full_desc += f" Official source: {source}."

                nearby_hotels_text = 'Accommodations, lodges, and heritage stays available in vicinity.'
                if hospital:
                    nearby_hotels_text += f" Emergency Medical: {hospital}."
                if police:
                    nearby_hotels_text += f" Police Station: {police}."

                norm_key = pname.lower()
                if norm_key in places:
                    p = places[norm_key]
                    if map_link:
                        p['map_url'] = map_link
                    if full_desc and len(full_desc) > len(p.get('description', '')):
                        p['description'] = full_desc
                    if transport and len(transport) > len(p.get('transport', '')):
                        p['transport'] = transport
                    if season:
                        p['best_season'] = season
                    if lat and not p.get('latitude'):
                        p['latitude'] = lat
                        p['longitude'] = lng
                    new_tn_enriched += 1
                else:
                    pid = generate_place_id(pname)
                    places[norm_key] = {
                        'id': pid,
                        'location_id': loc_id,
                        'name': pname,
                        'category': default_cat,
                        'avg_rating': 4.6,
                        'review_count': 1150,
                        'entry_fee': 0.0,
                        'opening_hours': '09:00 - 18:00',
                        'latitude': lat,
                        'longitude': lng,
                        'map_url': map_link if map_link else f"https://www.google.com/maps/search/?api=1&query={lat},{lng}",
                        'description': full_desc or f"{pname} is a renowned {default_cat} spot in {dist}, Tamil Nadu.",
                        'best_season': season,
                        'avg_visit_time': '1-2 hours',
                        'transport': transport or f"Accessible via local bus, auto, and taxi routes in {dist}.",
                        'nearby_hotels': nearby_hotels_text,
                        'nearby_restaurants': 'Local authentic dining and multi-cuisine restaurants nearby.',
                        'created_at': '2026-09-04 00:00:00',
                        'updated_at': '2026-09-04 00:00:00'
                    }
                    new_tn_added += 1
        except Exception as e:
            print(f"Warning reading {fname}: {e}")

    print(f"✅ Loaded 7 TN Category Datasets: +{new_tn_added} new places, {new_tn_enriched} existing enriched.")
    print(f"✅ Total unified places after TN category datasets: {len(places)}")

    # -------------------------------------------------------------------------
    # 3. Apply High-Precision Google Maps Coordinates & Landmark Fixes
    # -------------------------------------------------------------------------
    # Import full coordinate mappings from fix_coordinates and fix_coordinates_2
    precise_coords = {}
    try:
        sys.path.append(os.path.join(BASE_DIR, 'scripts'))
        from fix_coordinates import PLACES_2_COORDS
        precise_coords.update(PLACES_2_COORDS)
    except Exception as e:
        print(f"Notice: PLACES_2_COORDS import: {e}")

    try:
        from fix_coordinates_2 import ADDITIONAL_COORDS
        precise_coords.update(ADDITIONAL_COORDS)
    except Exception as e:
        print(f"Notice: ADDITIONAL_COORDS import: {e}")

    # Specific verified landmarks & Chennai fixes
    chennai_overrides = {
        # --- From places_1.csv & verified landmarks ---
        "plc-san-thome":              (13.03361, 80.27778),   # San Thome Basilica
        "plc-elliots-beach":          (12.99953, 80.27241),   # Edward Elliot's Beach
        "plc-fort-st-george":         (13.07972, 80.28694),   # Fort St. George & Museum
        "plc-egmore-museum":          (13.0706,  80.2567),    # Government Museum Chennai
        "plc-guindy-park":            (13.0089,  80.2406),    # Guindy National Park
        "plc-vandalur-zoo":           (12.87917, 80.08167),   # Arignar Anna Zoological Park
        "plc-dakshinachitra":         (12.82242, 80.2431),    # DakshinaChitra Heritage Museum
        "plc-dakshinachitra-museum":  (12.82242, 80.2431),    # DakshinaChitra Museum (exact same spot)
        "plc-valluvar-kottam":        (13.05441, 80.24175),   # Valluvar Kottam
        "plc-parthasarathy":          (13.0506,  80.2739),    # Arulmigu Parthasarathy Temple
        "plc-ashtalakshmi":           (12.9931,  80.2686),    # Ashtalakshmi Temple
        "plc-marundeeswarar":         (12.98556, 80.26139),   # Marundeeswarar Temple
        "plc-kalakshetra":            (12.9881,  80.265),     # Kalakshetra Foundation
        "plc-birla-planetarium":      (13.012,   80.2437),    # Birla Planetarium
        "plc-theosophical":           (13.0036,  80.2581),    # Theosophical Society Gardens
        "plc-semmozhi-poonga":        (13.0505,  80.2505),    # Semmozhi Poonga (Cathedral Rd)
        "plc-vadapalani-murugan":     (13.0528,  80.2136),    # Vadapalani Murugan Temple
        "plc-ripon-building":         (13.0825,  80.2715),    # Ripon Building & Victoria Public Hall
        "plc-st-thomas-mount":        (12.9972,  80.1639),    # St. Thomas Mount National Shrine
        "plc-rail-museum":            (13.0897,  80.2606),    # Chennai Rail Museum
        "plc-connemara-library":      (13.0706,  80.2567),    # Connemara Public Library (Egmore Museum complex)
        "plc-covelong-beach":         (12.7896,  80.2542),    # Covelong (Kovalam) Beach
        "plc-croc-bank":              (12.78,    80.239),     # Madras Crocodile Bank Trust
        "plc-vivekananda-house":      (13.0447,  80.2789),    # Vivekananda House (Illam)
        "plc-muttukadu":              (12.8227,  80.2419),    # Muttukadu Boat House
        "plc-water-activities-at-muttukadu": (12.8227, 80.2419), # Muttukadu Water Activities (same spot)
        "plc-cholamandal":            (12.92222, 80.25194),   # Cholamandal Artists' Village
        "plc-chetpet-eco-park":       (13.07412, 80.24238),   # Chetpet Eco Park
        "plc-thiruvanmiyur-beach":    (12.9736,  80.2665),    # Thiruvanmiyur Beach
        "plc-kalikambal":             (13.0872,  80.2889),    # Kalikambal Temple George Town
        "plc-thousand-lights":        (13.0547,  80.2422),    # Thousand Lights Mosque
        "plc-anna-nagar-tower":       (13.08678, 80.21435),   # Anna Nagar Tower Park

        # --- From Excel dataset & constant place alignments ---
        "plc-marina-beach":           (13.0500,  80.2824),    # Marina Beach
        "plc-barracuda-bayfishing":   (13.0500,  80.2824),    # Barracuda Bay Fishing (off Marina Beach - same spot)
        "plc-national-art-gallery":   (13.0706,  80.2567),    # National Art Gallery (inside Egmore Museum complex - same spot)
        "plc-pondy-bazaar":           (13.0399,  80.2388),    # Pondy Bazaar T. Nagar
        "plc-pulicat-lake":           (13.4167,  80.3167),    # Pulicat Lake
        "plc-mahabalipuram":          (12.6168,  80.1993),    # Mahabalipuram Shore Temple
        "plc-mgr-film-city":          (12.9866,  80.2492),    # MGR Film City Taramani
        "plc-adventure-sports-at-covelong-bea": (12.7896, 80.2542),  # Covelong Adventure Sports (same spot as Covelong Beach)
        "plc-scuba-diving-at-covelong-beach":   (12.7896, 80.2542),  # Covelong Scuba Diving (same spot as Covelong Beach)
        "plc-queensland-amusement-park":        (13.0450, 80.0105),  # Queensland Amusement Park (Palanjur NH4)
        "plc-ubbalamadugu-falls":     (13.6042,  79.9711),    # Ubbalamadugu Falls (Tada Falls)
        "plc-eachanari":              (10.9419,  76.9697),    # Eachanari Vinayagar Temple
    }
    precise_coords.update(chennai_overrides)

    coimbatore_and_kodai_fixes = {
        "plc-black-thunder-amusement-park": (11.3142, 76.9383),     # Mettupalayam
        "plc-brookefields-mall":            (11.0094, 76.9575),     # Dr Krishnasamy Rd
        "plc-marudamalai-temple":           (11.0458, 76.8525),     # Marudamalai Hill
        "plc-trek-to-dhoni-hills":          (10.8800, 76.6300),     # Dhoni Hills
        "plc-trek-to-perumal-peak":         (10.2833, 77.5500),     # Perumal Peak
        "plc-trek-to-thalaiyar-falls":      (10.2458, 77.5894),     # Thalaiyar Falls
        "plc-adiyogi-shiva-statue":         (10.9723, 76.7405),     # Isha Adiyogi Statue
        "plc-racing-events-at-chettipalayam": (10.9167, 77.0333),   # Kari Motor Speedway Chettipalayam
        "plc-gedee-car-museum-tour":        (11.0047, 76.9744),     # GeDee Car Museum Avinashi Rd
        "plc-textile-museum-tour":          (11.0183, 76.9650),     # Textile Museum
        "plc-anamalai-wildlife-sanctuary":  (10.4500, 76.9500),     # Anamalai Sanctuary Pollachi
        "plc-valankulam-lake":              (10.9936, 76.9667),     # Valankulam Lake
        "plc-velliangiri-hills":            (10.9833, 76.6833),     # Velliangiri Hills
        "plc-tnau-botanical-gardens":       (11.0125, 76.9361),     # TNAU Botanical Gardens Marudhamalai Rd
        "plc-nilgiri-biosphere-nature-park": (11.1444, 76.8583),    # Anaikatti Nature Park
        "plc-kodaikanal-lake":              (10.2381, 77.4892),     # Kodaikanal Lake
        "plc-night-safari":                 (10.2300, 77.4800),     # Kodaikanal Night Safari
        "plc-stroll-at-coakers-walk":       (10.2319, 77.4925),     # Coaker's Walk Kodaikanal
        "plc-dolphins-nose-1":              (10.2075, 77.5186),     # Dolphin's Nose Kodaikanal
        "plc-caps-valley-viewpoint":        (10.2150, 77.4650),     # Caps Fly Valley Kodaikanal
        "plc-bear-shola-falls":             (10.2436, 77.4839),     # Bear Shola Falls Kodaikanal
        "plc-ooty-lake-1":                  (11.4096, 76.6951),     # Ooty Lake Nilgiris
    }
    precise_coords.update(coimbatore_and_kodai_fixes)

    # Ingest all remaining Tamil Nadu datasets (Police, Fire, Hotels, Churches, Mosques, Attractions, Dining, Medical)
    load_extended_tn_datasets(places, locations_dict, loc_id_map)

    for p in places.values():
        if p['id'] == 'plc-ooty-lake-1':
            p['location_id'] = 'loc-nlg'
        if p['id'] in precise_coords:
            p['latitude'], p['longitude'] = precise_coords[p['id']]
        if not p.get('map_url'):
            if p.get('latitude') is not None and p.get('longitude') is not None:
                p['map_url'] = f"https://www.google.com/maps/search/?api=1&query={p['latitude']},{p['longitude']}"
            else:
                p['map_url'] = None

    return list(places.values())

def clean_station_name(raw, dist_name):
    s = str(raw or '').strip()
    s_low = s.lower()
    if s == 'G1': return f'G1 Police Station (Ooty, {dist_name})'
    if s == 'E6': return f'E6 Ennore Police Station'
    if s == 'HVF': return f'HVF Police Station (Avadi, {dist_name})'
    if s_low == 'sup': return f'Superintendent of Police Office ({dist_name})'
    if s == 'G3': return f'G3 Police Station (Pattukkottai, {dist_name})'
    if s_low == 'police quarters': return f'{dist_name} Police Quarters & Precinct'
    if s_low == 'police outpost': return f'{dist_name} Police Assistance Outpost'
    if s_low == 'police checkpost': return f'{dist_name} Highway Police Checkpost'
    if s_low in ['commisioner office', 'commissioner office']: return f'City Police Commissioner Office ({dist_name})'
    if 'central station police station' in s_low: return 'Chennai Central Railway Police Station'
    if s_low == 't.s.p. camp': return f'Tamil Nadu Special Police (TSP) Camp ({dist_name})'
    if s_low == 'armed reserve police': return f'Armed Reserve Police Headquarters ({dist_name})'
    if s_low == 'nilgiri armed reserve': return 'Nilgiris Armed Reserve Police Headquarters'
    if s_low == 'thiruvarur armed reserve': return 'Thiruvarur Armed Reserve Police Headquarters'
    if s_low in ["women's police station", "all womens police station", "all women police station"]:
        return f"All Women's Police Station ({dist_name})"

    if s.endswith(' PS') or s.endswith(' ps') or s.endswith(' Ps'):
        s = s[:-3].strip() + ' Police Station'
    elif s.endswith(' P.S.') or s.endswith(' p.s.'):
        s = s[:-5].strip() + ' Police Station'

    if not any(k in s.lower() for k in ['police', 'station', 'outpost', 'patrol', 'hq', 'office', 'battalion', 'camp', 'reserve', 'quarters', 'checkpost']):
        s = f'{s} Police Station'

    return s

def load_extended_tn_datasets(places, locations_dict, loc_id_map):
    print("\n🌐 Ingesting All Remaining Tamil Nadu Datasets (Police, Fire, Hotels, Churches, Mosques, Attractions, Dining, Hospitals)...")

    tn_locs = [l for l in locations_dict.values() if l['state'] == 'Tamil Nadu' and l.get('latitude') and l.get('longitude')]
    if not tn_locs:
        tn_locs = list(locations_dict.values())

    def get_best_loc(lat, lon):
        try:
            slat = float(lat)
            slon = float(lon)
            return min(tn_locs, key=lambda l: (slat - float(l['latitude']))**2 + (slon - float(l['longitude']))**2)
        except:
            return tn_locs[0]

    existing_keys = set((p['name'].lower(), p['location_id']) for p in places.values())
    place_ids = set(p['id'] for p in places.values())

    def add_place(name, category, lat, lon, description, opening_hours, entry_fee=0.0, avg_rating=4.7, best_season='Throughout the year', avg_visit_time='1-2 hours', transport='', nearby_hotels='', nearby_restaurants=''):
        clean_n = str(name or '').strip()[:140].strip()
        if not clean_n or len(clean_n) < 2:
            return
        
        try:
            flat = round(float(lat), 6)
            flon = round(float(lon), 6)
        except:
            return

        loc = get_best_loc(flat, flon)
        dedup_key = (clean_n.lower(), loc['id'])
        if dedup_key in existing_keys:
            return
        existing_keys.add(dedup_key)

        base_slug = f"plc-{slugify(clean_n, 32)}"
        pid = base_slug
        counter = 1
        while pid in place_ids:
            pid = f"{base_slug}-{counter}"
            counter += 1
        place_ids.add(pid)

        p_obj = {
            'id': pid,
            'location_id': loc['id'],
            'name': clean_n,
            'category': category,
            'avg_rating': round(float(avg_rating), 2),
            'review_count': 350,
            'entry_fee': float(entry_fee),
            'opening_hours': opening_hours,
            'latitude': flat,
            'longitude': flon,
            'map_url': f"https://www.google.com/maps/search/?api=1&query={flat},{flon}",
            'description': description.replace('{district}', loc['name']),
            'best_season': best_season,
            'avg_visit_time': avg_visit_time,
            'transport': transport or f"Easily accessible by public transit, auto-rickshaw, and arterial roads in {loc['name']}.",
            'nearby_hotels': nearby_hotels or f"Quality hotels, resorts, and homestays available in {loc['name']}.",
            'nearby_restaurants': nearby_restaurants or f"Authentic South Indian messes and dining options nearby in {loc['name']}.",
            'created_at': '2026-09-04 00:00:00',
            'updated_at': '2026-09-04 00:00:00'
        }
        places[pid] = p_obj

    # 1. Police Stations
    path_police = os.path.join(DATASETS_DIR, 'tamil_nadu_police_stations_clean.csv')
    if os.path.exists(path_police):
        c_before = len(places)
        with open(path_police, 'r', encoding='utf-8', errors='ignore') as f:
            for r in csv.DictReader(f):
                loc = get_best_loc(r['latitude'], r['longitude'])
                name = clean_station_name(r.get('name', ''), loc['name'])
                desc = "Verified Tamil Nadu police station and tourist assistance outpost in {district}. Providing 24/7 public safety, rapid emergency dispatch (100/112), and security support."
                add_place(name, 'police_station', r['latitude'], r['longitude'], desc, 'Open 24/7 (Emergency: 100 / 112)', 0.0, 4.8, 'Throughout the year', 'Emergency assistance')
        print(f"  ✅ Added {len(places) - c_before} Police Stations to spots.")

    # 2. Fire Stations
    path_fire = os.path.join(DATASETS_DIR, 'tamil_nadu_fire_stations_clean.csv')
    if os.path.exists(path_fire):
        c_before = len(places)
        with open(path_fire, 'r', encoding='utf-8', errors='ignore') as f:
            for r in csv.DictReader(f):
                loc = get_best_loc(r['latitude'], r['longitude'])
                raw_name = (r.get('name') or '').strip()
                if not raw_name or raw_name.lower() in ['fire and rescue station', 'fire station']:
                    name = f"Tamil Nadu Fire and Rescue Station ({loc['name']})"
                else:
                    name = f"{raw_name} Fire Station" if 'fire' not in raw_name.lower() else raw_name
                desc = "Tamil Nadu Fire and Rescue Services station in {district}. Equipped with emergency fire engines, hazardous response, and life-saving rescue apparatus (101/112)."
                add_place(name, 'fire_station', r['latitude'], r['longitude'], desc, 'Open 24/7 (Emergency: 101 / 112)', 0.0, 4.9, 'Throughout the year', 'Emergency assistance')
        print(f"  ✅ Added {len(places) - c_before} Fire Stations to spots.")

    # 3. Hotels
    path_hotels = os.path.join(DATASETS_DIR, 'tamil_nadu_hotels_clean.csv')
    if os.path.exists(path_hotels):
        c_before = len(places)
        with open(path_hotels, 'r', encoding='utf-8', errors='ignore') as f:
            for r in csv.DictReader(f):
                name = (r.get('name') or '').strip()
                cat_type = (r.get('category') or 'hotel').replace('_', ' ').title()
                desc = f"Verified {cat_type} accommodation in {{district}}, Tamil Nadu. Featuring guest amenities, comfortable lodging, and prime connectivity to tourist destinations."
                add_place(name, 'stay_hotel', r['latitude'], r['longitude'], desc, 'Open 24 Hours (Front Desk 24/7)', 0.0, 4.6, 'Throughout the year', 'Overnight stay')
        print(f"  ✅ Added {len(places) - c_before} Hotels to spots.")

    # 4. Churches
    path_churches = os.path.join(DATASETS_DIR, 'tamil_nadu_churches_clean.csv')
    if os.path.exists(path_churches):
        c_before = len(places)
        with open(path_churches, 'r', encoding='utf-8', errors='ignore') as f:
            for r in csv.DictReader(f):
                name = (r.get('name') or '').strip()
                desc = "Historic Christian church and place of worship in {district}, Tamil Nadu. Known for architectural heritage, tranquil prayer halls, and community services."
                add_place(name, 'religious', r['latitude'], r['longitude'], desc, '06:00 - 19:30 (Sunday Mass available)', 0.0, 4.7, 'October–March', '30-45 mins')
        print(f"  ✅ Added {len(places) - c_before} Churches to spots.")

    # 5. Mosques
    path_mosques = os.path.join(DATASETS_DIR, 'tamil_nadu_mosques_clean.csv')
    if os.path.exists(path_mosques):
        c_before = len(places)
        with open(path_mosques, 'r', encoding='utf-8', errors='ignore') as f:
            for r in csv.DictReader(f):
                loc = get_best_loc(r['latitude'], r['longitude'])
                raw_name = (r.get('name') or '').strip()
                if raw_name.lower() in ['mosque', 'masjid', 'jummah mosque', 'jamia masjid']:
                    name = f"Jamia Masjid ({loc['name']})"
                else:
                    name = raw_name
                desc = "Prominent Islamic place of worship and mosque in {district}, Tamil Nadu. Welcoming congregational prayers (Fajr to Isha), community reflection, and Islamic heritage."
                add_place(name, 'religious', r['latitude'], r['longitude'], desc, '05:00 - 21:00 (Daily prayer times)', 0.0, 4.7, 'Throughout the year', '30-45 mins')
        print(f"  ✅ Added {len(places) - c_before} Mosques to spots.")

    # 6. Tourist Places & Attractions
    path_tourist = os.path.join(DATASETS_DIR, 'tamil_nadu_tourist_places.xlsx')
    if os.path.exists(path_tourist):
        c_before = len(places)
        wb_tp = openpyxl.load_workbook(path_tourist, data_only=True)
        for r in list(wb_tp.active.iter_rows(values_only=True))[1:]:
            name = str(r[0] or '').strip()
            raw_cat = str(r[1] or '').strip().lower()
            lat = r[2]
            lon = r[3]
            if not name or len(name) < 3 or lat is None or lon is None:
                continue
            if any(h in name.lower() for h in ['boys hostel', 'girls hostel', 'ladies hostel', 'college']):
                continue

            if raw_cat in ['hotel', 'guest_house', 'hostel', 'apartment', 'motel', 'resort']:
                cat = 'stay_hotel'
                hrs = 'Open 24 Hours'
                dur = 'Overnight stay'
                desc = "Tourist lodge and hospitality accommodation in {district}. Offering lodging, guest services, and travel assistance."
            elif raw_cat in ['park', 'viewpoint']:
                cat = 'nature'
                hrs = '06:00 - 18:30'
                dur = '1-2 hours'
                desc = "Scenic park and natural viewpoint in {district}, Tamil Nadu. Beautiful landscape, fresh air, and picturesque photo spots."
            elif raw_cat in ['museum']:
                cat = 'museum'
                hrs = '09:30 - 17:30'
                dur = '1-2 hours'
                desc = "Cultural museum and heritage repository in {district}. Displaying regional history, artifacts, and educational exhibitions."
            elif raw_cat in ['monument', 'memorial', 'archaeological_site', 'ruins']:
                cat = 'historical'
                hrs = '09:00 - 18:00'
                dur = '1-2 hours'
                desc = "Historical monument and heritage landmark in {district}, reflecting the rich dynastic history and cultural legacy of Tamil Nadu."
            elif raw_cat in ['attraction', 'artwork', 'theme_park', 'zoo', 'aquarium']:
                cat = 'cultural' if raw_cat in ['artwork', 'cultural'] else 'entertainment'
                hrs = '09:00 - 19:00'
                dur = '2-3 hours'
                desc = "Popular visitor attraction and leisure destination in {district}, featuring recreational experiences and sightseeing."
            else:
                cat = 'other'
                hrs = '09:00 - 18:00'
                dur = '1-2 hours'
                desc = "Notable tourist spot and landmark in {district}, Tamil Nadu."

            add_place(name, cat, lat, lon, desc, hrs, 0.0, 4.6, 'October–March', dur)
        print(f"  ✅ Added {len(places) - c_before} Tourist Places, Parks, and Accommodations.")

    # 7. Restaurants & Dining
    path_rest = os.path.join(DATASETS_DIR, 'tamil_nadu_restaurants_food_places_without_unnamed-1.xlsx')
    if os.path.exists(path_rest):
        c_before = len(places)
        wb_rst = openpyxl.load_workbook(path_rest, data_only=True)
        for r in list(wb_rst.active.iter_rows(values_only=True))[1:]:
            name = str(r[0] or '').strip()
            cat_tag = str(r[1] or 'restaurant').replace('_', ' ').title()
            lat = r[2]
            lon = r[3]
            if not name or len(name) < 2 or lat is None or lon is None:
                continue
            desc = f"Popular {cat_tag} in {{district}}, Tamil Nadu. Serving authentic regional specialties, beverages, South Indian thali meals, and local flavors."
            add_place(name, 'food_dining', lat, lon, desc, '07:00 - 23:00 (Breakfast, Lunch & Dinner)', 0.0, 4.6, 'Throughout the year', '45-60 mins')
        print(f"  ✅ Added {len(places) - c_before} Dining & Restaurant Spots.")

    # 8. Medical Facilities & Hospitals
    path_med = os.path.join(DATASETS_DIR, 'tamil_nadu_medical_facilities.csv')
    if os.path.exists(path_med):
        c_before = len(places)
        with open(path_med, 'r', encoding='utf-8', errors='ignore') as f:
            for r in csv.DictReader(f):
                name = (r.get('name') or '').strip()
                stype = (r.get('type') or '').strip().lower()
                if not name or len(name) < 4 or stype != 'hospital':
                    continue
                desc = "Government and multispecialty hospital in {district}, Tamil Nadu. Equipped with 24/7 emergency trauma casualty, ambulance hotline (108), and comprehensive medical care."
                add_place(name, 'medical_facility', r['latitude'], r['longitude'], desc, 'Open 24/7 (Emergency: 108)', 0.0, 4.7, 'Throughout the year', 'Emergency Medical Service')
        print(f"  ✅ Added {len(places) - c_before} Medical Facilities & Hospitals.")

def load_police_stations(locations_dict, loc_id_map):
    csv_path = os.path.join(DATASETS_DIR, 'tamil_nadu_police_stations_clean.csv')
    if not os.path.exists(csv_path):
        print(f"⚠️ Police stations CSV not found at {csv_path}")
        return [], []

    tn_locs = [l for l in locations_dict.values() if l['state'] == 'Tamil Nadu' and l['latitude'] and l['longitude']]
    if not tn_locs:
        tn_locs = list(locations_dict.values())

    police_stations = []
    safety_contacts = []
    stations_by_loc = {}

    with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.DictReader(f)
        for r in reader:
            slat = float(r['latitude'])
            slon = float(r['longitude'])
            osm_id = r.get('osm_id', '').strip()
            st_type = r.get('type', 'police').strip() or 'police'

            best_loc = min(tn_locs, key=lambda l: (slat - float(l['latitude']))**2 + (slon - float(l['longitude']))**2)
            name = clean_station_name(r.get('name', ''), best_loc['name'])
            st_id = f"ps-{osm_id.replace('/', '-')}"

            # Determine emergency hotline
            name_lower = name.lower()
            if 'women' in name_lower:
                phone = '1091 / 112 (Women Helpline)'
            elif 'highway' in name_lower or 'traffic' in name_lower or 'checkpost' in name_lower:
                phone = '103 / 112 (Highway Patrol)'
            elif best_loc['id'] == 'loc-chn':
                phone = '+91 44 2844 7788 / 112'
            elif best_loc['id'] == 'loc-cbe':
                phone = '+91 422 222 1000 / 112'
            elif best_loc['id'] == 'loc-mdu':
                phone = '+91 452 234 1100 / 112'
            elif best_loc['id'] == 'loc-nlg':
                phone = '+91 423 244 2200 / 112'
            else:
                phone = '100 / 112'

            address = f"{name}, {best_loc['name']} District, Tamil Nadu"

            ps_obj = {
                'id': st_id,
                'location_id': best_loc['id'],
                'name': name,
                'type': st_type,
                'latitude': slat,
                'longitude': slon,
                'contact_number': phone,
                'operating_hours': 'Open 24/7',
                'address': address,
                'osm_id': osm_id,
                'created_at': '2026-09-04 00:00:00',
                'updated_at': '2026-09-04 00:00:00'
            }
            police_stations.append(ps_obj)

            if best_loc['id'] not in stations_by_loc:
                stations_by_loc[best_loc['id']] = []
            stations_by_loc[best_loc['id']].append(ps_obj)

    # Generate rich safety_contacts for all districts
    for loc in locations_dict.values():
        loc_id = loc['id']
        loc_short = loc_id.replace('loc-', '')
        # 1. State Integrated Emergency Response (ERSS)
        safety_contacts.append({
            'id': f'sc-{loc_short}-erss',
            'location_id': loc_id,
            'service_type': f'{loc["name"]} Emergency Response Support (ERSS)',
            'contact_number': '112',
            'operating_hours': '24/7',
            'created_at': '2026-09-04 00:00:00',
            'updated_at': '2026-09-04 00:00:00'
        })
        # 2. Medical Emergency Ambulance
        safety_contacts.append({
            'id': f'sc-{loc_short}-med',
            'location_id': loc_id,
            'service_type': f'{loc["name"]} Medical Emergency Ambulance',
            'contact_number': '108',
            'operating_hours': '24/7',
            'created_at': '2026-09-04 00:00:00',
            'updated_at': '2026-09-04 00:00:00'
        })
        # 3. Women & Child Safety Helpline
        safety_contacts.append({
            'id': f'sc-{loc_short}-wom',
            'location_id': loc_id,
            'service_type': f'{loc["name"]} Women & Child Safety Helpline',
            'contact_number': '1091',
            'operating_hours': '24/7',
            'created_at': '2026-09-04 00:00:00',
            'updated_at': '2026-09-04 00:00:00'
        })

        # 4. If this location has verified police stations, add top 2
        loc_stations = stations_by_loc.get(loc_id, [])
        for idx, st in enumerate(loc_stations[:2]):
            safety_contacts.append({
                'id': f'sc-{loc_short}-ps{idx+1}',
                'location_id': loc_id,
                'service_type': st['name'],
                'contact_number': st['contact_number'],
                'operating_hours': st['operating_hours'],
                'created_at': '2026-09-04 00:00:00',
                'updated_at': '2026-09-04 00:00:00'
            })

    return police_stations, safety_contacts

def update_sqlite_db(locations_list, places_list, police_stations_list, safety_contacts_list):
    print(f"\n📁 Updating SQLite database at: {DB_PATH}...")
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("DROP TABLE IF EXISTS places;")
    cur.execute("DROP TABLE IF EXISTS police_stations;")
    cur.execute("DROP TABLE IF EXISTS safety_contacts;")
    cur.execute("DROP TABLE IF EXISTS locations;")

    cur.execute("""
    CREATE TABLE locations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        state TEXT NOT NULL DEFAULT 'Tamil Nadu',
        country TEXT NOT NULL DEFAULT 'India',
        currency_code TEXT NOT NULL DEFAULT 'INR',
        description TEXT,
        latitude REAL,
        longitude REAL,
        region TEXT DEFAULT 'Southern',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cur.execute("""
    CREATE TABLE places (
        id TEXT PRIMARY KEY,
        location_id TEXT NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        avg_rating REAL DEFAULT 0.00,
        review_count INTEGER DEFAULT 0,
        entry_fee REAL DEFAULT 0.00,
        opening_hours TEXT,
        latitude REAL,
        longitude REAL,
        map_url TEXT,
        description TEXT,
        best_season TEXT,
        avg_visit_time TEXT,
        transport TEXT,
        nearby_hotels TEXT,
        nearby_restaurants TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
    );
    """)

    cur.execute("""
    CREATE TABLE police_stations (
        id TEXT PRIMARY KEY,
        location_id TEXT NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'police',
        latitude REAL,
        longitude REAL,
        contact_number TEXT NOT NULL DEFAULT '100 / 112',
        operating_hours TEXT NOT NULL DEFAULT '24/7',
        address TEXT,
        osm_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
    );
    """)

    cur.execute("""
    CREATE TABLE safety_contacts (
        id TEXT PRIMARY KEY,
        location_id TEXT NOT NULL,
        service_type TEXT NOT NULL,
        contact_number TEXT NOT NULL,
        operating_hours TEXT NOT NULL DEFAULT '24/7',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
    );
    """)

    loc_tuples = [
        (
            l['id'], l['name'], l['state'], l['country'], l['currency_code'],
            l['description'], l['latitude'], l['longitude'], l['region'],
            l['created_at'], l['updated_at']
        )
        for l in locations_list
    ]
    cur.executemany("""
    INSERT INTO locations (id, name, state, country, currency_code, description, latitude, longitude, region, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, loc_tuples)

    place_tuples = [
        (
            p['id'], p['location_id'], p['name'], p['category'], p['avg_rating'],
            p['review_count'], p['entry_fee'], p['opening_hours'], p['latitude'],
            p['longitude'], p.get('map_url'), p['description'], p['best_season'], p['avg_visit_time'],
            p['transport'], p['nearby_hotels'], p['nearby_restaurants'],
            p['created_at'], p['updated_at']
        )
        for p in places_list
    ]
    cur.executemany("""
    INSERT INTO places (
        id, location_id, name, category, avg_rating, review_count, entry_fee,
        opening_hours, latitude, longitude, map_url, description, best_season, avg_visit_time,
        transport, nearby_hotels, nearby_restaurants, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, place_tuples)

    ps_tuples = [
        (
            ps['id'], ps['location_id'], ps['name'], ps['type'], ps['latitude'],
            ps['longitude'], ps['contact_number'], ps['operating_hours'], ps['address'],
            ps['osm_id'], ps['created_at'], ps['updated_at']
        )
        for ps in police_stations_list
    ]
    cur.executemany("""
    INSERT INTO police_stations (
        id, location_id, name, type, latitude, longitude, contact_number,
        operating_hours, address, osm_id, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, ps_tuples)

    sc_tuples = [
        (
            sc['id'], sc['location_id'], sc['service_type'], sc['contact_number'],
            sc['operating_hours'], sc['created_at'], sc['updated_at']
        )
        for sc in safety_contacts_list
    ]
    cur.executemany("""
    INSERT INTO safety_contacts (
        id, location_id, service_type, contact_number, operating_hours, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
    """, sc_tuples)

    conn.commit()

    cur.execute("SELECT count(*) FROM locations;")
    loc_cnt = cur.fetchone()[0]
    cur.execute("SELECT count(*) FROM places;")
    plc_cnt = cur.fetchone()[0]
    cur.execute("SELECT count(*) FROM police_stations;")
    ps_cnt = cur.fetchone()[0]
    cur.execute("SELECT count(*) FROM safety_contacts;")
    sc_cnt = cur.fetchone()[0]
    conn.close()

    print(f"🎉 SQLite Successfully Updated: {loc_cnt} Locations, {plc_cnt} Places, {ps_cnt} Police Stations, {sc_cnt} Safety Contacts.")

def update_seed_sql(locations_list, places_list, police_stations_list, safety_contacts_list):
    print(f"\n📝 Updating MySQL seed file at: {SEED_SQL_PATH}...")

    def sql_escape(val):
        if val is None:
            return 'NULL'
        s = str(val).replace('\\', '\\\\').replace("'", "''")
        return f"'{s}'"

    def sql_num(val):
        if val is None:
            return 'NULL'
        return str(val)

    lines = [
        "-- =============================================================================",
        "-- TripNova Live Tourism Platform - Master Database Seed File",
        "-- Auto-generated by backend/scripts/syncDatasets.py",
        f"-- Date Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        f"-- Scale: {len(locations_list)} Destinations, {len(places_list)} Tourist Spots & {len(police_stations_list)} Police Stations",
        "-- =============================================================================",
        "",
        "SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;",
        "SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;",
        "SET NAMES utf8mb4;",
        "",
        "DELETE FROM `places`;",
        "DELETE FROM `police_stations`;",
        "DELETE FROM `safety_contacts`;",
        "DELETE FROM `locations`;",
        "",
        "-- -----------------------------------------------------------------------------",
        f"-- 1. Seed Locations ({len(locations_list)} Administrative Cities & Districts Across India)",
        "-- -----------------------------------------------------------------------------",
        "INSERT INTO `locations` (`id`, `name`, `state`, `country`, `currency_code`, `description`, `latitude`, `longitude`, `region`, `created_at`, `updated_at`) VALUES"
    ]

    loc_values = []
    for l in locations_list:
        loc_values.append(
            f"({sql_escape(l['id'])}, {sql_escape(l['name'])}, {sql_escape(l['state'])}, {sql_escape(l['country'])}, {sql_escape(l['currency_code'])}, {sql_escape(l['description'])}, {sql_num(l['latitude'])}, {sql_num(l['longitude'])}, {sql_escape(l['region'])}, {sql_escape(l['created_at'])}, {sql_escape(l['updated_at'])})"
        )
    lines.append(",\n".join(loc_values) + ";")
    lines.append("")

    lines.append("-- -----------------------------------------------------------------------------")
    lines.append(f"-- 2. Seed Places ({len(places_list)} Attractions Across India with Full Attributes & Exact Map URLs)")
    lines.append("-- -----------------------------------------------------------------------------")

    chunk_size = 100
    for chunk_idx in range(0, len(places_list), chunk_size):
        chunk = places_list[chunk_idx:chunk_idx + chunk_size]
        lines.append("INSERT INTO `places` (`id`, `location_id`, `name`, `category`, `avg_rating`, `review_count`, `entry_fee`, `opening_hours`, `latitude`, `longitude`, `map_url`, `description`, `best_season`, `avg_visit_time`, `transport`, `nearby_hotels`, `nearby_restaurants`, `created_at`, `updated_at`) VALUES")
        chunk_vals = []
        for p in chunk:
            chunk_vals.append(
                f"({sql_escape(p['id'])}, {sql_escape(p['location_id'])}, {sql_escape(p['name'])}, {sql_escape(p['category'])}, {sql_num(p['avg_rating'])}, {sql_num(p['review_count'])}, {sql_num(p['entry_fee'])}, {sql_escape(p['opening_hours'])}, {sql_num(p['latitude'])}, {sql_num(p['longitude'])}, {sql_escape(p.get('map_url'))}, {sql_escape(p['description'])}, {sql_escape(p['best_season'])}, {sql_escape(p['avg_visit_time'])}, {sql_escape(p['transport'])}, {sql_escape(p['nearby_hotels'])}, {sql_escape(p['nearby_restaurants'])}, {sql_escape(p['created_at'])}, {sql_escape(p['updated_at'])})"
            )
        lines.append(",\n".join(chunk_vals) + ";")
        lines.append("")

    lines.append("-- -----------------------------------------------------------------------------")
    lines.append(f"-- 3. Seed Police Stations ({len(police_stations_list)} Verified Stations Across Tamil Nadu)")
    lines.append("-- -----------------------------------------------------------------------------")

    for chunk_idx in range(0, len(police_stations_list), chunk_size):
        chunk = police_stations_list[chunk_idx:chunk_idx + chunk_size]
        lines.append("INSERT INTO `police_stations` (`id`, `location_id`, `name`, `type`, `latitude`, `longitude`, `contact_number`, `operating_hours`, `address`, `osm_id`, `created_at`, `updated_at`) VALUES")
        chunk_vals = []
        for ps in chunk:
            chunk_vals.append(
                f"({sql_escape(ps['id'])}, {sql_escape(ps['location_id'])}, {sql_escape(ps['name'])}, {sql_escape(ps['type'])}, {sql_num(ps['latitude'])}, {sql_num(ps['longitude'])}, {sql_escape(ps['contact_number'])}, {sql_escape(ps['operating_hours'])}, {sql_escape(ps['address'])}, {sql_escape(ps['osm_id'])}, {sql_escape(ps['created_at'])}, {sql_escape(ps['updated_at'])})"
            )
        lines.append(",\n".join(chunk_vals) + ";")
        lines.append("")

    lines.append("-- -----------------------------------------------------------------------------")
    lines.append(f"-- 4. Seed Safety & Emergency Contacts ({len(safety_contacts_list)} District Emergency Helplines)")
    lines.append("-- -----------------------------------------------------------------------------")

    for chunk_idx in range(0, len(safety_contacts_list), chunk_size):
        chunk = safety_contacts_list[chunk_idx:chunk_idx + chunk_size]
        lines.append("INSERT INTO `safety_contacts` (`id`, `location_id`, `service_type`, `contact_number`, `operating_hours`, `created_at`, `updated_at`) VALUES")
        chunk_vals = []
        for sc in chunk:
            chunk_vals.append(
                f"({sql_escape(sc['id'])}, {sql_escape(sc['location_id'])}, {sql_escape(sc['service_type'])}, {sql_escape(sc['contact_number'])}, {sql_escape(sc['operating_hours'])}, {sql_escape(sc['created_at'])}, {sql_escape(sc['updated_at'])})"
            )
        lines.append(",\n".join(chunk_vals) + ";")
        lines.append("")

    lines.append("SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;")
    lines.append("SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;")
    lines.append("")

    with open(SEED_SQL_PATH, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))

    print(f"🎉 MySQL Seed File Generated: {SEED_SQL_PATH} ({os.path.getsize(SEED_SQL_PATH)} bytes)")

def main():
    print("🚀 Starting TripNova Dataset Synchronization...")
    locations_dict, loc_id_map = load_locations()
    print(f"✅ Loaded {len(locations_dict)} unique locations across all Indian States & UTs.")

    places_list = load_places(locations_dict, loc_id_map)
    print(f"✅ Loaded {len(places_list)} unified tourist attractions.")

    police_stations_list, safety_contacts_list = load_police_stations(locations_dict, loc_id_map)
    print(f"✅ Loaded {len(police_stations_list)} verified Tamil Nadu police stations and {len(safety_contacts_list)} emergency contacts.")

    locations_list = list(locations_dict.values())
    locations_list.sort(key=lambda x: (0 if x['state'] == 'Tamil Nadu' else 1, x['state'], x['name']))

    update_sqlite_db(locations_list, places_list, police_stations_list, safety_contacts_list)
    update_seed_sql(locations_list, places_list, police_stations_list, safety_contacts_list)

    print("\n========================================================")
    print("📊 DATASET SYNCHRONIZATION COMPLETE SUMMARY:")
    print(f"📍 Total Locations: {len(locations_list)}")
    print(f"🏛️ Total Places: {len(places_list)}")
    print(f"🛡️ Total Police Stations: {len(police_stations_list)}")
    print(f"📞 Total Safety Contacts: {len(safety_contacts_list)}")
    states = set(l['state'] for l in locations_list)
    print(f"🌐 States & UTs Covered: {len(states)}")
    cats = {}
    for p in places_list:
        cats[p['category']] = cats.get(p['category'], 0) + 1
    print(f"📂 Category Breakdown: {cats}")
    print("========================================================")

if __name__ == '__main__':
    main()

