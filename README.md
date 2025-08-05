# LOGIN PAGE AND NOTIFICATION GENERATION

1 -- LOGIN PAGE  
1. Create a Login Page in a mobile application using React Native  
2. Generate a notification when the particular location is reached  

---

Login Page Mobile App  
A React Native mobile application that contains a login screen where the user can enter their username and password, and also generates a notification when the user reaches a specific location.

---

## Installation Steps

Step 1: Clone the Repository  
```bash
git clone https://github.com/mathilika-G/LoginWindow.git

Step 2: Create the Project (if starting fresh)
npx create-expo-app --template blank LoginWindow

Step 3: Open in VS Code
cd LoginWindow
code .

Step 4: Create the Folder & Files
Inside your project, create a screens folder and add:
Login.js (login page)
Home.js (main page after login)
Update your App.js to set up navigation.

Step 5: Install Required Packages
npm install @react-navigation/native
npm install @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install expo-location expo-notifications

Step 6: Run the App
npx expo start
