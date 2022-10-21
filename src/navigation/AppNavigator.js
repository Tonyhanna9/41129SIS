import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../provider/AuthProvider";

// Main
import ReportFire from "../screens/ReportFire";
import HomePage from "../screens/HomePage";
import SubmissionConfirm from "../screens/SubmissionConfirm";
import FireMap from "../screens/map";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";
import EditProfile from "../screens/auth/EditProfile";

import Loading from "../screens/utils/Loading";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyB9j6gnZXdqnqZ-yfNyQQT77G4HtjKa2TA",
  authDomain: "firearm-6356c.firebaseapp.com",
  projectId: "firearm-6356c",
  storageBucket: "firearm-6356c.appspot.com",
  messagingSenderId: "838288196431",
  appId: "1:838288196431:web:0084cadefa7a7b076e7b3a",
  measurementId: "G-NGKWLCEYL9"
};
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

// const HomeStack = createNativeStackNavigator();
// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator headerMode="none">
//       <HomeStack.Screen name="HomePage" component={HomePage} />
//     </HomeStack.Navigator>
//   );
// }

// ** AUTH ** //
const AuthStack = createNativeStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator  screenOptions={{
      headerShown: false,
    }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="EditProfile" component={EditProfile} />
    </AuthStack.Navigator>
  );
}
// ** APP ** //
const AppStack = createNativeStackNavigator();
function AppStackScreen() {
  return (
    <AppStack.Navigator name="mainApp"
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="HomePage" component={HomePage} />
      <AppStack.Screen name="ReportFire" component={ReportFire} />
      <AppStack.Screen name="SubmissionConfirm" component={SubmissionConfirm} />
      <AppStack.Screen name="FireMap" component={FireMap} />
    </AppStack.Navigator>
  );
}
// ** ROOT ** //
const RootStack = createNativeStackNavigator();
const RootStackScreen = ({user}) => {
  return (
    <RootStack.Navigator screenOptions={{
      headerShown: false,
    }}>
        <RootStack.Screen name="App" component={AppStackScreen} />
        <RootStack.Screen name="Auth" component={AuthStackScreen} />
        
    </RootStack.Navigator>
  );
};

export default function AppNavigator() {
    const auth = useContext(AuthContext);
  const user = auth.user;
  // const [loading, setloading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState();

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setloading(false);
  //   }, 1000);
  // });
  // if (loading) {
  //   return <SplashScreen />;
  // }

  // // })
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}

// const AuthStack = createNativeStackNavigator();

// const Auth = () => {
//   return (
//     <AuthStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <AuthStack.Screen name="Login" component={Login} />
//       <AuthStack.Screen name="Register" component={Register} />
//       <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
//     </AuthStack.Navigator>
//   );
// };

// const MainStack = createNativeStackNavigator();

// const Main = () => {
//   return (
//     <MainStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <MainStack.Screen name="HomePage" component={HomePage} />
//       <MainStack.Screen name="ReportFire" component={ReportFire} />
//       <MainStack.Screen name="Login" component={Login} />
//     </MainStack.Navigator>
//   );
// };

// export default () => {
//   const auth = useContext(AuthContext);
//   const user = auth.user;
//   return (
//     <NavigationContainer>
//       {user == null && <Loading />}
//       {/* {user == true && <Auth />} */}
//       {user == false && <Main />}
//     </NavigationContainer>
//   );
// };
