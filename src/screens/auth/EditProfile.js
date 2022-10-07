import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  ActivityIndicatorComponent,
} from "react-native";
import { getAuth , updateEmail } from "firebase/auth";
import {
    Layout,
    Text,
    TextInput,
    Button,
    useTheme,
    themeColor,
    TopNav,
  } from "react-native-rapi-ui";
  import { db } from "../../config/firebase";
  import { Ionicons } from "@expo/vector-icons";
  export default function ({ navigation }) {

    const { isDarkmode, setTheme } = useTheme();
    const [loading, setLoading] = useState(false);

    //Initialising Variables
    const auth = getAuth();
    var currentuserid = "";
    const user = auth.currentUser;

    //Gets the current user's id
    if (user !== null) {
      currentuserid = user.uid;
    }

    //Create Object called "updateUserInfo" to store new data 
    const [updateUserInfo, setUserInfo] = useState({
      full_name: "",
      phone: "",
      email: "",
      emergency_name: "",
      emergency_phone: "",
    });

    //Create Object called "currentdocid" to store docid used for referencing to firestore
    const[currentdocid, setcurrentdocid] = useState("")

    //HandleInput to handle and update the "updateUserInfo" object
    const handleInput = (name, value) => {
      setUserInfo({ ...updateUserInfo, [name]: value });
    };

    //Return function to load current user data 
   function viewprofile() {
      db.collection("users")
    .where("id", "==", currentuserid)
    .get()
    .then(snap => { 
      snap.forEach(doc => {
        setcurrentdocid(doc.id);
        const Userdata = doc.data();
        setUserInfo(Userdata);
      });

    });
    }

    //Function which updates firestore with new data 
    async function editprofile() {
      const profileUpdate = db.collection("users")
      .doc(currentdocid)
      .update({
      full_name: updateUserInfo.full_name,
      email: updateUserInfo.email,
      phone: updateUserInfo.phone,
      emergency_name: updateUserInfo.emergency_name,
      emergency_phone: updateUserInfo.emergency_phone,
      });
              
      updateEmail(user, updateUserInfo.email).then(() => {
        console.log("Email Updated");
      }).catch((error) => {
        console.log("Email Update Error");
      });
      
    }

    //Condition which guarentee the "viewprofile" will only run once
    const [temp, setTemp] = useState(true);
    if (temp) { 
      viewprofile();
      setTemp(false);
    }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
      <TopNav
        middleContent="View Profile"
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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text>Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Name"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={updateUserInfo.full_name}
              onChangeText={(value) => handleInput("full_name", value)}
            />

            <Text style={{ marginTop: 15 }}>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Email"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              value={updateUserInfo.email}
              onChangeText={(value) => handleInput("email", value)}
            />

            <Text style={{ marginTop: 15 }}>Phone Number</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Phone Number"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={updateUserInfo.phone}
              onChangeText={(value) => handleInput("phone", value)}
            />

            <Text style={{ marginTop: 15 }}>Emergency Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Emergency Name"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={updateUserInfo.emergency_name}
              onChangeText={(value) => handleInput("emergency_name", value)}
            />

            <Text style={{ marginTop: 15 }}>Emergency Phone</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Emergency Phone"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={updateUserInfo.emergency_phone}
              onChangeText={(value) => handleInput("emergency_phone", value)}
            />

            <Button
              text={loading ? "Loading" : "Update"}
              onPress={() => {
                editprofile();
              }}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}