import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    emergency_name: "",
    emergency_phone: "",
  });

  const [isValiduserInfo, setIsValidUserInfo] = useState({
    full_name: Boolean,
    phone: Boolean,
    email: Boolean,
    password: Boolean,
    emergency_name: Boolean,
    emergency_phone: Boolean,
  });
  const handleInput = (name, value) => {
    setUserInfo({ ...userInfo, [name]: value });
    handleValidation(name);
  };

  const handleValidation = (ref) => {
    //email check
    if (ref == "email") {
      console.log("ooi");
      let re = /\S+@\S+\.\S+/;
      let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

      if (re.test(userInfo.email) || regex.test(userInfo.email)) {
        setIsValidUserInfo({
          full_name: true,
          phone: true,
          email: true,
          password: true,
          emergency_name: true,
          emergency_phone: true,
        });
      } else {
        setIsValidUserInfo({
          full_name: true,
          phone: true,
          email: false,
          password: true,
          emergency_name: true,
          emergency_phone: true,
        });
      }
    }

    //phone check
    if (ref == "emergency_phone") {
      let Pregex = /04[\d]{8}/g;
      if (Pregex.test(userInfo.emergency_phone)) {
        setIsValidUserInfo({
          full_name: true,
          phone: true,
          email: true,
          password: true,
          emergency_name: true,
          emergency_phone: true,
        });
      } else {
        setIsValidUserInfo({
          full_name: true,
          phone: true,
          email: true,
          password: true,
          emergency_name: true,
          emergency_phone: false,
        });
      }
    }
    //name check
    if (ref == "full_name") {
      let Nregex = /^[a-zA-Z]+ [a-zA-Z]+$/;
      if (Nregex.test(userInfo.full_name)) {
        setIsValidUserInfo({
          full_name: true,
          phone: true,
          email: true,
          password: true,
          emergency_name: true,
          emergency_phone: true,
        });
      } else {
        setIsValidUserInfo({
          full_name: false,
          phone: true,
          email: true,
          password: true,
          emergency_name: true,
          emergency_phone: true,
        });
      }
    }
    //password check
    if (ref == "password") {
      const isNonWhiteSpace = /^\S*$/;

      const isContainsUppercase = /^(?=.*[A-Z]).*$/;

      const isContainsLowercase = /^(?=.*[a-z]).*$/;

      const isContainsNumber = /^(?=.*[0-9]).*$/;

      const isValidLength = /^.{6,16}$/;
      if (
        isNonWhiteSpace.test(userInfo.password) &&
        isContainsUppercase.test(userInfo.password) &&
        isContainsLowercase.test(userInfo.password) &&
        isContainsNumber.test(userInfo.password) &&
        isValidLength.test(userInfo.password)
      ) {
        setIsValidUserInfo({
          full_name: true,
          phone: true,
          email: true,
          password: true,
          emergency_name: true,
          emergency_phone: true,
        });
      } else {
        setIsValidUserInfo({
          full_name: true,
          phone: true,
          email: true,
          password: false,
          emergency_name: true,
          emergency_phone: true,
        });
      }
    }
  };

  async function register() {
    try {
      await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      ).then(async (authUser) => {
        await db
          .collection("users")
          .add({
            id: authUser?.user?.uid,
            full_name: userInfo.full_name,
            email: userInfo.email,
            phone: userInfo.phone,
            emergency_name: userInfo.emergency_name,
            emergency_phone: userInfo.emergency_phone,
          })
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.log("error...", error.message);
            setLoading(false);
            alert(error.message);
          });
      });
    } catch (error) {
      setLoading(false);
      console.log("error...", error.message);
      alert(error.message);
    }
  }

  console.log("userInfo.....", userInfo);

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
            <Image
              resizeMode="cover"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../../assets/register.png")}
            />
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
              size="h2"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Register
            </Text>
            <Text>Full name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your full name"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              value={userInfo.full_name}
              onChangeText={(value) => handleInput("full_name", value)}
            />
            {isValiduserInfo.full_name ? (
              <Text status="danger" size="sm" style={{ marginTop: 10 }}></Text>
            ) : (
              <Text status="danger" size="sm" style={{ marginTop: 10 }}>
                {" "}
                Please enter a valid name!
              </Text>
            )}

            <Text style={{ marginTop: 15 }}>Phone</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your phone number"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={userInfo.phone}
              onChangeText={(value) => handleInput("phone", value)}
            />

            <Text style={{ marginTop: 15 }}>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your email"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              //secureTextEntry={true}
              keyboardType="email-address"
              value={userInfo.email}
              onChangeText={(value) => handleInput("email", value)}
            />
            {isValiduserInfo.email ? (
              <Text status="danger" size="sm" style={{ marginTop: 10 }}></Text>
            ) : (
              <Text status="danger" size="sm" style={{ marginTop: 10 }}>
                {" "}
                Please enter a valid email!
              </Text>
            )}

            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              value={userInfo.password}
              onChangeText={(value) => handleInput("password", value)}
            />

            {isValiduserInfo.password ? (
              <Text status="danger" size="sm" style={{ marginTop: 10 }}></Text>
            ) : (
              <Text status="danger" size="sm" style={{ marginTop: 10 }}>
                Must have at least 6 Characters with 1 uppercase, lowercase and
                a digit.
              </Text>
            )}

            <Text
              fontWeight="bold"
              size="h3"
              style={{
                //alignSelf: "center",
                paddingTop: 30,
              }}
            >
              Emergency contact
            </Text>

            <Text style={{ marginTop: 15 }}>Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter an emergency contact name"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={userInfo.emergency_name}
              onChangeText={(value) => handleInput("emergency_name", value)}
            />

            <Text style={{ marginTop: 15 }}>Phone</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter an emergency contact number"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={userInfo.emergency_phone}
              onChangeText={(value) => handleInput("emergency_phone", value)}
            />
            {isValiduserInfo.emergency_phone ? (
              <Text status="danger" size="sm" style={{ marginTop: 10 }}></Text>
            ) : (
              <Text status="danger" size="sm" style={{ marginTop: 10 }}>
                {" "}
                Please enter a valid phone number!
              </Text>
            )}

            <Button
              text={loading ? "Loading" : "Create an account"}
              status="danger"
              onPress={() => {
                register();
              }}
              style={{
                marginTop: 20,
              }}
              disabled={!loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                    color: "#ff4500",
                  }}
                >
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
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
