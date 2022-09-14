import { React, useEffect, useRef, useState }  from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
 import * as MediaLibrary from 'expo-media-library';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    // let sharePic = () => {
    //   shareAsync(photo.uri).then(() => {
    //     setPhoto(undefined);
    //   });
    // };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        {/* <Button title="Share" onPress={sharePic} /> */}
        {hasMediaLibraryPermission ? <Button title="Send" onPress={savePhoto} /> : undefined}
        <Button title="Retry" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Layout>
      <TopNav
        middleContent="Report Fire 🔥"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      
        <Text fontWeight="bold">This is the second screen</Text>
      </View> */}

        <Camera style={styles.container} ref={cameraRef}>
       <View style={styles.buttonContainer}>
         <Button title="Take Pic" onPress={takePic} />
       </View>
       </Camera>
    </Layout>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});
