import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { getAuth , onAuthStateChanged} from "firebase/auth";
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
  export default function ({ navigation }) {
    const { isDarkmode, setTheme } = useTheme();
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const [updateUserInfo, setUserInfo] = useState({
      full_name: "",
      phone: "",
      email: "",
      password: "",
      emergency_name: "",
      emergency_phone: "",
    });
    var currentdocid = "";
    var currentuserid = "";
    const handleInput = (name, value) => {
      setUserInfo({ ...updateUserInfo, [name]: value });
    };
    const user = auth.currentUser;
    if (user !== null) {
      currentuserid = user.uid;
    }
    db.collection("users")
    .where("id", "==", currentuserid)
    .get()
    .then(snap => { 
      snap.forEach(doc => {
        console.log(doc.data());
        console.log(doc.id);
        currentdocid = doc.id;
      });
    });
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
              placeholder="Email"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={updateUserInfo.full_name}
              onChangeText={(value) => handleInput("full_name", value)}
            />

            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Password"
              //value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

            <Text style={{ marginTop: 15 }}>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Email"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
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
              secureTextEntry={true}
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
              secureTextEntry={true}
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
              secureTextEntry={true}
              value={updateUserInfo.emergency_phone}
              onChangeText={(value) => handleInput("emergency_phone", value)}
            />

            <Button
              text={loading ? "Loading" : "Continue"}
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