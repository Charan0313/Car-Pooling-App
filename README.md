# 🚗 Carpooling System – A Smart and Privacy-Focused Ride-Sharing Solution

This Carpooling System enables users to create and join ride pools securely and efficiently. It connects riders and drivers based on proximity, preferences, and timing—while ensuring strong privacy protections like masked contact and SOS features.

This project was developed using **React Native** and **Expo** for the mobile app, with a backend powered by **PostgreSQL** and integrated services like **Stripe**, **Clerk**, and **Google Maps**.

## 📋 Table of Contents
- 🤖 Introduction  
- ⚙️ Tech Stack  
- 🔋 Features  
- 🤸 Quick Start  
- ⚗️ Code Snippets  
- 🔗 Useful Links  
- 📦 Assets  
- 📽️ Screenshots



## ⚙️ Tech Stack

### 🖥️ Frontend (Mobile App)
- **React Native** – Cross-platform mobile development
- **Expo** – Easier development and deployment of React Native apps
- **Tailwind CSS** – Utility-first styling with NativeWind
- **Google Maps SDK** – Location services and map rendering
- **Clerk** – Authentication and user management
- **Stripe** – Payment gateway integration

### 🗄️ Backend & Database
- **PostgreSQL** – Relational database for storing user, ride, and payment data
- **RESTful APIs** – Backend endpoints for client-server communication
- **(Optional)** Supabase/NeonDB – Hosted PostgreSQL with serverless support




## 🔋 Features

✅ **Authentication**
- Email/Password login via Clerk
- Google oAuth
- Email verification

✅ **Ride Pool Creation (Drivers)**
- Set source, destination, time, vehicle info 
- View and approve join requests

✅ **Ride Matching (Riders)**
- Search for rides by route, time, 

✅ **Privacy & Security**
- Limited profile visibility until confirmation

✅ **Live Map & Route**
- Google Maps integration
- Location autocomplete using Places API

✅ **Payments**
- Book rides only after Stripe payment confirmation

✅ **Ride History**
- View current, past, and scheduled rides
📚 Track and review all past rides, bookings, and activity.

📱 Cross-Platform Support: Fully responsive and optimized for both Android and iOS via Expo.



## 🤸 Quick Start

Follow the steps below to set up and run the Carpooling System project locally on your machine.


### 🔧 Prerequisites

Ensure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

To install Expo CLI globally:

```bash
npm install -g expo-cli
```

📥 Clone the Repository

```bash
git clone https://github.com/Charan0313/car-pooling-app.git
cd car-pooling-app
```
📦 Install Dependencies

```bash
npm install
```
🛠️ Set Up Environment Variables
Create a .env file in the root of your project and add the following content:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=

EXPO_PUBLIC_PLACES_API_KEY=
EXPO_PUBLIC_DIRECTIONS_API_KEY=

DATABASE_URL=

EXPO_PUBLIC_SERVER_URL=https://your-server-url.dev/

EXPO_PUBLIC_GEOAPIFY_API_KEY=

EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

🔐 Replace the placeholder values with your actual credentials from:

- Clerk
- Stripe
- Google Maps API
- Geoapify
- NeonDB or your PostgreSQL provider

🚀 Run the Project

Start the app using:

```bash
npx expo start
```
Then:
Open the Expo Go app on your iOS or Android device.
Scan the QR code shown in your terminal or browser to run the app on your device.


## ⚗️ Code Snippets

### Queries

<details>
  <summary><code>GET Rides SQL Query</code></summary>

```sql
SELECT
    rides.ride_id,
    rides.origin_address,
    rides.destination_address,
    rides.origin_latitude,
    rides.origin_longitude,
    rides.destination_latitude,
    rides.destination_longitude,
    rides.ride_time,
    rides.fare_price,
    rides.payment_status,
    rides.created_at,
    'driver', json_build_object(
        'driver_id', drivers.id,
        'first_name', drivers.first_name,
        'last_name', drivers.last_name,
        'profile_image_url', drivers.profile_image_url,
        'car_image_url', drivers.car_image_url,
        'car_seats', drivers.car_seats,
        'rating', drivers.rating
    ) AS driver 
FROM 
    rides
INNER JOIN
    drivers ON rides.driver_id = drivers.id
WHERE 
    rides.user_email = ${id}
ORDER BY 
    rides.created_at DESC;
```
</details>

<details>
  <summary><code>SEED Drivers Query</code></summary>

```sql
INSERT INTO drivers (id, first_name, last_name, profile_image_url, car_image_url, car_seats, rating)
VALUES 
('1', 'James', 'Wilson', 'https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/', 'https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/', 4, '4.80'),
('2', 'David', 'Brown', 'https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/', 'https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/', 5, '4.60'),
('3', 'Michael', 'Johnson', 'https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/', 'https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/', 4, '4.70'),
('4', 'Robert', 'Green', 'https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/', 'https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/', 4, '4.90');
```
</details>

### Schema

<details>
  <summary><code>CREATE Drivers Table SQL Query</code></summary>

```sql
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    profile_image_url TEXT,
    car_image_url TEXT,
    car_seats INTEGER NOT NULL CHECK (car_seats > 0),
    rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5)
);
```
</details>

<details>
  <summary><code>CREATE Rides Table SQL Query</code></summary>

```sql
CREATE TABLE rides (
    ride_id SERIAL PRIMARY KEY,
    origin_address VARCHAR(255) NOT NULL,
    destination_address VARCHAR(255) NOT NULL,
    origin_latitude DECIMAL(9, 6) NOT NULL,
    origin_longitude DECIMAL(9, 6) NOT NULL,
    destination_latitude DECIMAL(9, 6) NOT NULL,
    destination_longitude DECIMAL(9, 6) NOT NULL,
    ride_time INTEGER NOT NULL,
    fare_price DECIMAL(10, 2) NOT NULL CHECK (fare_price >= 0),
    payment_status VARCHAR(20) NOT NULL,
    driver_id INTEGER REFERENCES drivers(id),
    user_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
</details>

<details>
  <summary><code>CREATE Users Table SQL</code></summary>

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    clerk_id VARCHAR(50) UNIQUE NOT NULL
);
```
</details>

### Mock Data

<details>
  <summary><code>Mock Drivers</code></summary>

```json
[
  {
    "id": "1",
    "first_name": "James",
    "last_name": "Wilson",
    "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
    "car_seats": 4,
    "rating": "4.80"
  },
  {
    "id": "2",
    "first_name": "David",
    "last_name": "Brown",
    "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
    "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
    "car_seats": 5,
    "rating": "4.60"
  }
]
```
</details>

<details>
  <summary><code>Mock Rides</code></summary>

```json
[
  {
    "ride_id": "1",
    "origin_address": "Kathmandu, Nepal",
    "destination_address": "Pokhara, Nepal",
    "origin_latitude": "27.717245",
    "origin_longitude": "85.323961",
    "destination_latitude": "28.209583",
    "destination_longitude": "83.985567",
    "ride_time": 391,
    "fare_price": "19500.00",
    "payment_status": "paid",
    "driver_id": 2,
    "user_id": "1",
    "created_at": "2024-08-12 05:19:20.620007",
    "driver": {
      "driver_id": "2",
      "first_name": "David",
      "last_name": "Brown",
      "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      "car_seats": 5,
      "rating": "4.60"
    }
  }
]
```
</details>


## 🔗 Useful Links

Here are some important resources and documentation used in the project:

- [Expo NativeWind Setup](https://www.nativewind.dev/quick-starts/expo)
- [Clerk Expo Quickstart](https://clerk.com/docs/expo/quickstarts)
- [Clerk OAuth Integration](https://clerk.com/docs/reference/oauth)
- [Stripe React Native SDK](https://docs.stripe.com/react-native)
- [Google Maps API](https://developers.google.com/maps/documentation)
- [Geoapify Maps & Places](https://www.geoapify.com/)
- [NeonDB - Serverless PostgreSQL](https://neon.tech/)

## 📦 Assets

All icons, illustrations, logos, and mock images used in this project can be found inside: [here](https://drive.google.com/drive/folders/1UoeM73yBJE4Kk8wF1Lsqk8o3UZYPYITd?usp=sharing)

## 📽️ Screenshots
<img src="https://github.com/user-attachments/assets/a6ef9f47-0500-4685-9288-ab43c4ae7b10" alt="Login Screen" width="350" />

<img src="https://github.com/user-attachments/assets/db94dfb0-4707-4bbc-9354-b2873d3538a3" alt="Home Screen" width="350" />

<img src="https://github.com/user-attachments/assets/829d7cdd-df05-4ed6-8691-29745c4c27af" alt="Rider Screen" width="350" />

<img src="https://github.com/user-attachments/assets/0cd203de-faa9-4367-805a-2b7e94050d33" alt="Success Screen" width="350" />

