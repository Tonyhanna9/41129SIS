import React, { useContext, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import {
  Layout,
  Text,
  Button,
  useTheme,
  themeColor,
  Section,
} from "react-native-rapi-ui";
import { AuthContext } from "../provider/AuthProvider";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = useContext(AuthContext);

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout
        >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: isDarkmode ? "#17171E" : themeColor.danger600,
          }}
        >
           <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white,
            }}
          >
            <Image
              resizeMode="cover"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../assets/firelogo.png")}
            />
          </View>
      
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
              borderRadius: 25,
              marginLeft: 25,
              marginRight: 25,
              marginBottom: 25,
              marginTop: 25 
            }}
          >
            
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 30,
                paddingBottom: 20
              }}
              size="h2"
            >
              Fire Emergency?
            </Text>
            <Text
            style={{
              alignSelf: "center",
            }}
            >Click below to take a snapshot & </Text>
            <Text
            style={{
              alignSelf: "center",
            }}
            >report to authorities instantly</Text>
            <Text></Text>
            <Text></Text>
            <Button
              text={"REPORT NOW"}
              rightContent={
                <MaterialIcons name="report" size={24} color={themeColor.white} />
            }
              // status="danger"
              color={themeColor.danger600}
              size="lg"
              onPress={() => {
                navigation.navigate("ReportFire");
              }}
            />
         
            {auth.user !== true && <View
              style={{
                // flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <Text size="md"
              style={{
                alignSelf: "center",
              }}
              >Create an account to send your details along</Text>
            <Text size="md"
              style={{
                alignSelf: "center",
              }}
              >with the report & see real-time updates</Text>
               <Text size="md"
              style={{
                alignSelf: "center",
              }}
              >on fires near you</Text>
           
            </View>}

            {auth.user !== true && <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
               onPress={() => {
                navigation.navigate('Auth', {screen: 'Register'});
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
                  Create an account
                </Text>
              </TouchableOpacity>
            </View>}

            {auth.user !== true && <View
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
                  navigation.navigate('Auth', {screen: 'Login'});
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
                  Login
                </Text>
              </TouchableOpacity>
            </View>}
            
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