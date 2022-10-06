import { React, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button as RapiButton,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [IsPhotoSaved, setIsPhotoSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setIsPhotoSaved(true);
      });
    };

    if (IsPhotoSaved) {
      return (
        <View style={isDarkmode ? styles.container : styles.container}>
          <Image
            style={styles.preview}
            source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={IsPhotoSaved}
            // onRequestClose={() => {
            //   Alert.alert("Modal has been closed.");
            //   setModalVisible(!modalVisible);
            // }}
          >
            <View style={styles.centeredView}>
              <View
                style={
                  isDarkmode ? styles.modalViewDark : styles.modalViewLight
                }
              >
                <Text
                  style={{
                    alignSelf: "center",
                    paddingBottom: 15,
                    color: "#ff4500",
                  }}
                  size="h2"
                  fontWeight="medium"
                >
                  FIRE DETECTED!
                </Text>

                <Text
                 size="md"
                  style={
                    isDarkmode ? styles.modelTextDark : styles.modelTextLight
                  }
                >
                  Click Below to contact CCO
                </Text>

                <RapiButton text="REPORT NOW!" color="#ff4500" 
                 />
              </View>
            </View>
          </Modal>
        </View>
      );
    }

    return (
      <SafeAreaView
        style={isDarkmode ? styles.containerDark : styles.containerLight}
      >
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        {hasMediaLibraryPermission ? (
          <Button color="#FF4500" title="Send" onPress={savePhoto} />
        ) : undefined}

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

      <Camera style={styles.containerLight} ref={cameraRef}>
        <TouchableOpacity onPress={takePic}>
          <View style={styles.buttonContainer}>
            <Ionicons
              name="ellipse-outline"
              size={90}
              color={themeColor.white100}
            ></Ionicons>
          </View>
        </TouchableOpacity>
      </Camera>
    </Layout>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  modalViewDark: {
    margin: 20,
    backgroundColor: "#000000",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalViewLight: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modelTextDark: {
    paddingBottom: 15,
    color: "white",
    opacity: 0.5,
  },
  modelTextLight: {
    paddingBottom: 15,
    color: "#000000",
    opacity: 0.5,
  },
});
