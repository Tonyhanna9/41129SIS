import React, { useState } from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  Button,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as uuid from "uuid";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

  const [ image, setImage ] = useState(null);
  const [ uploading, setUploading ] = useState(false);

  async function useCamera() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    console.log("Picture was taken using camera");

    manageUpload(result);
  }

  async function useFile() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    console.log("File selected: " + result);

    manageUpload(result);
  }

  async function manageUpload(result) {
    try {
      setUploading(true);
      
      if (!result.cancelled) {
        const imageUrl = await uploadImage(result.uri);
        setImage(imageUrl);
        console.log("Success");
      }
    } catch (e) {
      console.log(e)
      alert("Error when uploading image.");
    } finally {
      setUploading(false);
    }
  }

  /**
   * Reason to use below approach: https://github.com/expo/expo/issues/2402#issuecomment-443726662
   */
  async function uploadImage(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = ref(getStorage(), "images/" + uuid.v4() + ".png");
    const result = await uploadBytes(fileRef, blob);

    blob.close();
  
    return await getDownloadURL(fileRef);
  }

  return (
    <Layout>
      <TopNav
        middleContent="Second Screen"
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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button text="1" onPress={useFile} />
        <Button text="2" onPress={useCamera} />
      </View>
    </Layout>
  );
}
