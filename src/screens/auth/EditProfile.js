import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { getAuth } from "firebase/auth";
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
    const { isDarkmode, setTheme } = useTheme();
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    db.collection("users")
    .where("id", "==", "pZGHthioD1SvXNBdzdIZb0905z72") //Need to work on passing user id 
    .get()
    .then(snap => { 
      snap.forEach(doc => {
        console.log(doc.data());
      });
    });
    /*firebase.auth().onAuthStateChanged(user => {
      if (user){
        getUserData(user.uid)
      }
    })
    function getUserData(uid){
      firebase.database().ref('users/' + uid).once("value", snap => {
        console.log(snap.val())
      })
    }
    const auth = getAuth();
    const userId = db.auth().currentUser.uid;
    const userDocument = db
    .collection('Users')
    .doc(userId)
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            const userData = docSnapshot.data()
            console.log(userData)
        }
    })*/
  
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
            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Email"
              //value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
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

            <Text style={{ marginTop: 15 }}>Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Name"
              //value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

            <Text style={{ marginTop: 15 }}>Phone Number</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Phone Number"
              //value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

            <Text style={{ marginTop: 15 }}>Emergency Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Emergency Name"
              //value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

            <Text style={{ marginTop: 15 }}>Emergency Phone</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Emergency Phone"
              //value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

            <Button
              text={loading ? "Loading" : "Continue"}
              onPress={() => {
                //login();
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