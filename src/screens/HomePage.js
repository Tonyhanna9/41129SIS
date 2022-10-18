import React, { useContext, useState } from "react";
import { FontAwesome5, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import {
  Layout,
  TopNav,
  Text,
  Button as RapiButton,
  Button,
  useTheme,
  themeColor,
  Section,
} from "react-native-rapi-ui";
import { AuthContext } from "../provider/AuthProvider";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = useContext(AuthContext);
  const [isMenuVisible, setisMenuVisible] = useState(false);

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout
        >
          {auth.user === true &&  <TopNav
        middleContent="Home Page"
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
                  color= {themeColor.danger600}
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
                    color= {themeColor.danger600}
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
            color={isDarkmode ? themeColor.white : themeColor.dark}
          />
                  }
                    // text="Mode"
                    color={isDarkmode ? themeColor.dark : themeColor.white}
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
                    <Ionicons name="ios-close" size={24}  color={isDarkmode ? themeColor.white : themeColor.dark} />}
                    color={isDarkmode ? themeColor.dark : themeColor.white}
                  />
                  
                </View>
              </View>
            </View>
          </Modal>
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
         {auth.user === true &&    
         <View
         style={{
           flexDirection: "row",
           alignItems: "center",
           marginTop: 25,
           justifyContent: "center",
         }}
       >
         <TouchableOpacity
        //   onPress={() => {
        //    navigation.navigate('Auth', {screen: 'Register'});
        //  }}
         >
           <Text
             fontWeight="bold"
             style={{
               marginLeft: 5,
               color: isDarkmode ? themeColor.white : themeColor.dark,
               fontSize: 20
             }}
           >
             Fire Map <FontAwesome5 name="map" size={24} color={isDarkmode ? themeColor.white : themeColor.dark} />
           </Text>
         </TouchableOpacity>
       </View>}
        {/* //  <Button
        //       style={{
        //         marginTop: 20,
        //       }}
        //       text={"Fire Map"}
        //       rightContent={
        //         <FontAwesome5 name="map" size={24} color={isDarkmode ? themeColor.white : themeColor.dark} />
        //     }
        //       // status="danger"
        //       color={isDarkmode ? themeColor.dark : themeColor.white}
        //       size="lg"
        //       onPress={() => {
        //         navigation.navigate("ReportFire");
        //       }}
        //     /> */}
        
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