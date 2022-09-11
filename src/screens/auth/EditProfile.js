import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { getAuth} from "firebase/auth";
import {
    Layout,
    Text,
    TextInput,
    Button,
    useTheme,
    themeColor,
  } from "react-native-rapi-ui";
  import { db } from "../../config/firebase";
  export default function ({ navigation }) {
    //const auth = getAuth();
    const userId = firebase.auth().currentUser.uid;
    const userDocument = firestore()
    .collection('Users')
    .doc(userId)
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            const userData = docSnapshot.data()
            console.log(userData)
        }
    });
  }