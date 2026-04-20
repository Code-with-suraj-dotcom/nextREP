# Gym Trainer App

Welcome to the **Gym Trainer App** – a complete, responsive fitness platform engineered with React 19, Vite, and Tailwind CSS. The platform utilizes Firebase for authentication and database management, serving as the ultimate companion for fitness enthusiasts at any level.

---

## 🎯 Project Overview & Purpose

The **Gym Trainer App** is designed to democratize fitness education and workout planning. Whether you're a fitness novice or a seasoned gym-goer, the app provides a centralized hub to discover, learn, and organize a vast library of exercises. 

By pulling in comprehensive exercise data along with relevant YouTube tutorial videos, it ensures users have visual and step-by-step guidance on how to perform movements with proper form, reducing the likelihood of injury and maximizing workout efficacy.

### 🤔 The Problem It Solves
1. **Information Overload and Fragmentation:** People typically jump between Google for workouts, YouTube for form tutorials, and Notes apps for saving routines.
2. **Lack of Guidance / Intimidation:** Beginners often feel intimidated at the gym due to a lack of knowledge on how to use equipment or hit specific muscle groups. 
3. **Tracking difficulties:** It is often hard to remember which exercises target what muscle and exactly how to perform them later on.

### 🌟 How It Benefits Users
* **All-in-One Solution:** Consolidates exercise discovery, form-checking videos, and routine saving into a single interface.
* **Targeted Search:** Users can efficiently filter workouts by body part (e.g., chest, back, legs) or specific equipment (e.g., dumbbells, cables).
* **Injury Prevention:** With immediate access to YouTube video demonstrations for each specific exercise, users can double-check their posture and form in real-time.
* **Personalized Experience:** Using Firebase, users can securely create accounts, log in, and curate a customized "Library" of their favorite workouts to access them anytime across devices.

---

## 🚀 Key Features

* **Secure Authentication:** User sign-up, login, and state persistence handled seamlessly via Firebase.
* **Extensive Exercise Database:** Search thousands of exercises quickly.
* **Granular Exercise Details:** See step-by-step instructions, targeted muscle groups, and required equipment.
* **Integrated Video Tutorials:** Watch related YouTube exercise demonstrations embedded within the app.
* **Personalized 'My Library':** Save exercises to an authenticated user profile to easily retrieve them on subsequent visits.
* **Similar Exercise Recommendations:** Discover alternatives targeting the same muscle groups or using similar equipment.
* **Fully Responsive:** Sleek, modern Tailwind UI optimized for mobile devices, tablets, and wide desktop screens.

---

## 🛠️ Tech Stack & Technologies

* **Frontend:** React 19, React Router v7, Vite
* **Styling Framework:** Tailwind CSS v4
* **Backend Integration / BaaS:** Firebase v12 (Auth & Cloud Firestore/Realtime DB)
* **Data Fetching / API Calls:** Axios (integrating ExerciseDB & YouTube Search API via RapidAPI)
* **State Management:** React Context API

---

## 📂 Detailed Folder & File Structure

Here is a deep dive into the architecture of the project to help you navigate the codebase:

```text
gym_trainer/
├── public/                 # Public assets served directly by Vite (e.g., favicon, robots.txt)
│
├── src/                    # Main source code directory
│   ├── assets/             # Static project assets like local images, vectors, and logos.
│   │
│   ├── components/         # Reusable UI building blocks
│   │   ├── Detail.jsx              # Renders the textual data and instructions for a specific exercise.
│   │   ├── ExerciseCard.jsx        # A clickable summary card showing exercise name, image, and tags.
│   │   ├── ExerciseImage.jsx       # Component dedicated to rendering optimized exercise GIFs/images.
│   │   ├── Exercises.jsx           # The primary grid/list container displaying queried exercises.
│   │   ├── ExerciseVideos.jsx      # Component responsible for fetching and displaying related YouTube videos.
│   │   ├── HomeBanner.jsx          # The hero section/banner displayed at the top of the Home page.
│   │   ├── Navbar.jsx              # Main navigation header with routing links and user profile actions.
│   │   ├── SaveExerciseButton.jsx  # Interactive button handling the logic to save a workout to Firebase.
│   │   ├── SearchExercises.jsx     # Search bar & category filters (body parts, equipment) logic.
│   │   └── SimilarExercises.jsx    # Displays horizontal scroll lists of related workouts.
│   │
│   ├── context/            # React Context for Global State Management
│   │   ├── AuthContext.jsx         # Manages Firebase authentication state, exposing current user data app-wide.
│   │   └── FitnessContext.jsx      # (And .js) Manages global state related to fetched exercises, categories, and caching.
│   │
│   ├── hooks/              # Custom React hooks (e.g., for specialized data fetching or auth handling).
│   │
│   ├── pages/              # Top-level Page components associated with distinct routes
│   │   ├── ExerciseDetail.jsx      # The detailed view route (/exercise/:id) bridging Detail, Videos, and Similar components.
│   │   ├── Home.jsx                # The landing page route (/) wrapping Banner, Search, and Exercises list.
│   │   ├── Login.jsx               # The authentication route (/login) with sign-in/signup forms.
│   │   └── MyLibrary.jsx           # The authenticated user route to view their saved firebase exercises.
│   │
│   ├── services/           # External API & Backend integrations
│   │   ├── fetchData.js            # Axios utility instances containing headers and logic to securely call external APIs.
│   │   └── firebase.js             # Firebase initialization, config, and exported service instances (auth, db).
│   │
│   ├── App.jsx             # Root component that mounts context providers and React Router configuration.
│   ├── index.css           # Global stylesheet and Tailwind CSS initialization directives.
│   └── main.jsx            # React 19 entry point and DOM mounting.
│
├── .gitignore              # Specifies intentionally untracked files to ignore by Git.
├── eslint.config.js        # ESLint flat config for establishing code quality and linting rules.
├── package.json            # Project metadata, scripts, and npm dependencies.
├── README.md               # This documentation file.
└── vite.config.js          # Vite bundler configuration and plugin setup.
```

---

## ⚙️ Installation & Setup Guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/gym_trainer.git
   cd gym_trainer
   ```

2. **Install dependencies:**
   Ensure you are in the project root directory, then run:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**
   For security, API keys are not bundled in the repo. Create a `.env` file in the root directory and add the following keys. You will need a standard Firebase Web project and an active RapidAPI account (for ExerciseDB and YouTube Search API).

   ```env
   # Firebase Config
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   
   # Rapid API Keys
   VITE_RAPID_API_KEY=your_rapidapi_key
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **View the Application:**
   Open [http://localhost:5173](http://localhost:5173) in your Chrome/Firefox browser.

---

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome! Feel free to check the issues page or submit a Pull Request.

