import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  ActivityIndicatorComponent,
} from "react-native";
import { getAuth , onAuthStateChanged, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";
import {
    Layout,
    Text,
    TextInput,
    Button,
    useTheme,
    themeColor,
  } from "react-native-rapi-ui";
  import { db } from "../../config/firebase";
  import {updateDoc} from "firebase/firestore";
  const[refreshPage, setRefreshPage] = useState("");
  export default function ({ navigation }) {
    const { isDarkmode, setTheme } = useTheme();
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    var currentdocid = "";
    var currentuserid = "";

    const user = auth.currentUser;
    if (user !== null) {
      currentuserid = user.uid;
    }

    const [updateUserInfo, setUserInfo] = useState({
      full_name: "",
      phone: "",
      email: "",
      emergency_name: "",
      emergency_phone: "",
    });

    const handleInput = (name, value) => {
      setUserInfo({ ...updateUserInfo, [name]: value });
    };

    var name = "full_name";
    var email = "email";
    var phone = "phone";
    var emergencyname = "emergency_name";
    var emergencyphone = "emergency_phone";
    var nameid = "id";

    db.collection("users")
    .where("id", "==", currentuserid)
    .get()
    .then(snap => { 
      snap.forEach(doc => {
        currentdocid = doc.id;
      });
      });

    async function viewprofile() {
    db.collection("users")
    .where("id", "==", currentuserid)
    .get()
    .then(snap => { 
      snap.forEach(doc => {
        currentdocid = doc.id;
        const Userdata = doc.data();
        updateUserInfo.full_name = Userdata[name];
          updateUserInfo.email = Userdata[email];
          updateUserInfo.phone = Userdata[phone];
          updateUserInfo.emergency_name = Userdata[emergencyname];
          updateUserInfo.emergency_phone = Userdata[emergencyphone];
      });
    });
    }


    async function editprofile() {
      /*var credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        userProvidedPassword
      );
      const credential = promptForCredentials();
      reauthenticateWithCredential(user, credential).then(() => {
        console.log("User re-authenticated");
      }).catch(function(error){
        console.log("User re-authenticated error")
      });*/
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
        //console.log("Email Updated");
      }).catch((error) => {
        console.log("Email Update Error");
      });

    /*  const newPassword = updateUserInfo.password;
      updatePassword(newPassword).then(() => {
        console.log("Password Updated");
      }).catch((error) => {
        console.log("Password Update Error");
      });*/
    }

  
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
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
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h3"
            >
              View Profile
            </Text>
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
              text="View Profile"
              onPress={() => {
                viewprofile();
                setRefreshPage("refresh");
              }}
              style={{
                marginTop: 20,
              }}
            />

            <Button
              text={loading ? "Loading" : "Update"}
              onPress={() => {
                editprofile();
              }}cd
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            <Button
              text="Go Back"
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                marginTop: 20,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}