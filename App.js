// import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/provider/AuthProvider";
import { ThemeProvider } from "react-native-rapi-ui";
import { LogBox } from "react-native";

// export default function App(props) {
//   const images = [
//     require("./assets/icon.png"),
//     require("./assets/splash.png"),
//     require("./assets/login.png"),
//     require("./assets/register.png"),
//     require("./assets/forget.png"),
//   ];

//   // Ignore firebase v9 AsyncStorage warning
//   React.useEffect(() => {
//     LogBox.ignoreLogs([
//       "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
//     ]);
//   }, []);

//   return (
//     <ThemeProvider images={images}>
//       <AuthProvider>
//         <AppNavigator />
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn); // it's good to explicitly catch and inspect any error
  LogBox.ignoreLogs([
          "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
        ]);
export default class App extends React.Component {
  componentDidMount() {
    // Hides native splash screen after 2s
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 500);
  }

 

  render() {
    return (
      <ThemeProvider>
             <AuthProvider>
               <AppNavigator />
             </AuthProvider>
           </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aabbcc',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
