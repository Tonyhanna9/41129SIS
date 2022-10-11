import React from "react";
import { View, Linking } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap
} from "react-google-maps";

function Map(){
  return( 
  
  <GoogleMap 
    defaultZoom={10} 
    defaultCenter = {{lat: 45.421532, lng: -75.697189 }} 
    />

  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  return (
    <Layout>
      <TopNav
        middleContent="Home"
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
      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        

      </View> */}

    <div style = {{width: '100vw', height: '100vh'}}>
      <WrappedMap
        googleMapURL = {'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCRRZScwi8p5-AbpmZty9ajh2s-wde7u3I'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
    </Layout>
  );
}