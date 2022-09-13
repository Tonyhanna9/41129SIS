import React, { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
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
  TopNav,
} from "react-native-rapi-ui";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout
        >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: isDarkmode ? "#17171E" : themeColor.white,
          }}
        >
           
       <TopNav
        leftContent={<Ionicons name="chevron-back" size={24} color="white" />}
        // rightContent={<Ionicons name="ellipsis-vertical" size={20} color={theme.black} /> }
        // leftAction={() => console.log('back icon pressed')}
        middleContent="Submission Confirmation"
        backgroundColor={themeColor.danger600}
        borderColor={themeColor.white}
    />
  <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white,
    
            }}
          >
             <Text
              style={{
                alignSelf: "center",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 30,
                paddingBottom: 20
              }}
            >
             <FontAwesome5 name="check-circle" size={90} color="red" />
            </Text>
            <Text
              // fontWeight="bold"
              style={{
                alignSelf: "center",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 10,
                paddingBottom: 5
              }}
              size="xl"
            >
            You have submitted a report of a fire. The authorities are being informed.
            </Text>
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
            
            {/* <Text
              style={{
                alignSelf: "center",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 30,
                paddingBottom: 20
              }}
            >
             <FontAwesome5 name="check-circle" size={90} color="red" />
            </Text>
            <Text
              // fontWeight="bold"
              style={{
                alignSelf: "auto",
                paddingLeft: 10,
                paddingRight: 30,
                paddingTop: 10,
                paddingBottom: 5
              }}
              size="xl"
            >
            You have submitted a report of a fire. The authorities are being informed.
            </Text> */}
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 30,
                paddingBottom: 5
              }}
              size="h3"
            >
              What can you do next?
            </Text>
            <Text
            style={{
              alignSelf: "flex-start",
              paddingBottom: 5
            }}
            
            ><Entypo name="dot-single" size={20} color="black" />Go inside but stay alert</Text>
            <Text
            style={{
              alignSelf: "flex-start",
              paddingBottom: 5
            }}
            >
              <Entypo name="dot-single" size={20} color="black" />
              Shelter in a room on the opposite side of the house from the approaching fire and one that has a clear exit out of the house</Text>
              <Text
            style={{
              alignSelf: "flex-start",
              paddingBottom: 5
            }}
            >
              <Entypo name="dot-single" size={20} color="black" />
              Patrol inside the house, including the roof space looking for sparks and embers</Text>
              <Text
            style={{
              alignSelf: "flex-start",
            }}

            ><Entypo name="dot-single" size={20} color="black" />Protect yourself from the heat of the fire </Text>
            <Text></Text>
            <Text></Text>
            <Button
              text={"Home Page"}
           
              // status="danger"
              color={themeColor.danger600}
              size="lg"
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