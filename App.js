import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import { AuthContext } from "./app/components/context";
import { loadFirebaseConfiguration } from "./app/util/FirebaseConfiguration";
import { RootStackScreen } from "./app/navs/RootStackScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RootDrawerScreen } from "./app/navs/RootDrawerScreen";
import {
  getPersonalInfomation,
  getPersonalRol,
} from "./app/services/InfoServicesPersonal";
import * as styles from "./assets/styles/appStyles";
import { KnowStackScreen } from "./app/navs/KnowStackScreen";
import NetInfo from "@react-native-community/netinfo";
import { getLocation } from "./app/services/GeoServices";
import { Button, Dimensions, StyleSheet, View, Text } from "react-native";
import Lottie from "lottie-react-native";

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  color: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: styles.colors.cultured,
    text: styles.colors.black,
  },
};
const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  color: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    text: styles.colors.cultured,
    background: styles.colors.black,
  },
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [internetConection, setInternetConection] = useState("");
  const [isConnected, setIsConnected] = useState("");

  const authContext = React.useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );
  const handleGetNetInfo = () => {
    NetInfo.fetch().then((state) => {
      console.log(state);

      setIsConnected(state.isConnected);
    });
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log(state);
      setInternetConection(`Connection Type: ${state.type}
      Is Connected?: ${state.isConnected}
      IP Address: ${state.details.ipAddress}`);
      setIsConnected(state.isConnected);
      console.log(typeof isConnected, isConnected);
    });
    return unsubscribe();
  }, [internetConection]);
  const [login, setLogin] = React.useState(false);
  const theme = isDarkTheme ? CustomDefaultTheme : CustomDarkTheme;
  loadFirebaseConfiguration();
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const email = user.email;
      global.email = email;
      let userData = await getPersonalRol(global.email);
      global.rol = userData.rol;
      global.name = userData.name;
      global.lastName = userData.lastName;
      global.profilePic = userData.profilePic;
      let verify = await getPersonalInfomation();
      global.direccionBase = verify.direccionBase;
     
      global.birthdate = verify.birthdate;
      if (global.rol == null) {
        setLogin(false);
        console.log("rol null");
      } else {
        setLogin(true);
      }
    } else {
      setLogin(false);
    }
  });

  const FirstNav = () => {
    return global.rol == "cliente" ? <SecondNav /> : <RootStackScreen />;
  };

  const SecondNav = () => {
    return global.direccionBase == null  ? (
      <KnowStackScreen />
    ) : (
      <RootDrawerScreen />
    );
  };
  const InternetNav = () => {
    return login ==true? <FirstNav /> : <RootStackScreen />;
  };
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {isConnected == true ? (
            <InternetNav />
          ) : (
            <View style={stylesL.container}>
              <Text style={[stylesL.header, { color: styles.colors.darkBlue }]}>
                Para poder continuar.{"\n"}Activa tu conexión a internet.
              </Text>
              <View style={{ height: Dimensions.get("window").height / 2.2 }}>
                <Lottie
                  source={require("./assets/no-internet-connection.json")}
                  autoPlay
                  loop
                  style={{ height: "100%" }}
                />
                <View style={{width: Dimensions.get("window").width/2, alignSelf: "center"}}>
                  <Button
                    title="Volver a intentar"
                    color={styles.colors.gradient2}
                    onPress={() => {
                      handleGetNetInfo();
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;

export const stylesL = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
