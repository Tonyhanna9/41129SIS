import { React, useEffect, useRef, useState, useContext } from "react";
import { FontAwesome5,MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
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
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { saveImageFB } from "./utils/FBStorage";
import { AuthContext } from "../provider/AuthProvider";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [isPhotoSaved, setIsPhotoSaved] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isMenuVisible, setisMenuVisible] = useState(false);
  const auth = useContext(AuthContext);

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
      quality: 0.25,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  let savePhoto = () => {
    saveImageFB(photo.uri).then(() => {
      setIsPhotoSaved(true);
    });
  };

  if (photo) {
    if (isPhotoSaved) {
      return (
        <View style={isDarkmode ? styles.container : styles.container}>
          <Image
            style={styles.preview}
            source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
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
                  Click below to connect with a 000 call operator.
                </Text>
                <View
                  style={{
                    paddingBottom: 9,
                  }}
                >
                  <RapiButton
                    onPress={() => {
                      navigation.navigate("App", {
                        screen: "SubmissionConfirm",
                      });
                      setisModalVisible(false);
                    }}
                    text="Connect to 000"
                    color="#ff4500"
                  />
                </View>

                <Text
                  size="sm"
                  style={
                    isDarkmode ? styles.modelTextDark : styles.modelTextLight
                  }
                >
                  Do not wish to report through the app?{" "}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("App", { screen: "HomePage" });
                    }}
                  >
                    <Text
                      size="sm"
                      style={{
                        textDecorationLine: "underline",
                        color: "#3366FF",
                      }}
                    >
                      Go back
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      );
    } else if (!isPhotoSaved) {
      {
        savePhoto();
      } // Photo is saved automatically. User interaction is no longer required,
      // so we can remove the below buttons.
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
  }

  return (
    <Layout>
       {auth.user !== false &&  <TopNav
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
          <Feather name="more-vertical" size={24} color={isDarkmode ? themeColor.white100 : themeColor.dark} />
        }
        rightAction={() => {
          setisMenuVisible(true);
        }}
      />
        }
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
      >
        <View style={styles.centeredView}>
          <View
            style={
            isDarkmode ? styles.modalViewDark : styles.modalViewLight
            }
          >
                <View
                  style={{
                    paddingBottom: 9,
                    width: 140
                  }}
                >
                  <RapiButton
                    onPress={() => {
                      navigation.navigate("Auth", {
                        screen: "EditProfile",
                      });
                      setisMenuVisible(false);
                    }}
                    text="Edit Profile"
                    leftContent={
                      <FontAwesome5 name="user" size={24} color="white" />
                  }
                    color="#ff4500"
                  />
                </View>
                <View
                  style={{
                    paddingBottom: 9,
                    width: 140
                  }}
                >
                  <RapiButton
                 
                    onPress={() => {
                      navigation.navigate("App", {
                        screen: "SubmissionConfirm",
                      });
                      setisMenuVisible(false);
                    }}
                    leftContent={
                      <MaterialIcons name="logout" size={24} color="white" />
                  }
                    text="Logout"
                    color="#ff4500"
                  />
                </View>
                <View
                  style={{
                    paddingBottom: 9,

                  }}
                >
                  <RapiButton
                    onPress={() => {
                      if (isDarkmode) {
                        setTheme("light");
                      } else {
                        setTheme("dark");
                      }
                    }}
                    leftContent={
                       <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
                  }
                    // text="Mode"
                    color="white"
                  />
                  
                </View>
               
                <View
                  style={{
                    paddingBottom: 9,
                  }}
                >
                  <RapiButton
                    onPress={() => {
                      setisMenuVisible(false);
                    }}
                    text={
                    <Ionicons name="ios-close" size={24} color="black" />}
                    color="white"
                  />
                  
                </View>
              </View>
            </View>
          </Modal>
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
    padding: 20,
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
    padding: 20,
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
