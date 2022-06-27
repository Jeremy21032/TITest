import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/context";
export function DrawerContent(props) {
  const { toggleTheme } = React.useContext(AuthContext);
  const paperTheme = useTheme();
  function cerrar() {
    const auth = getAuth();
    auth
      .signOut()
      .then(function () {
        global.rol = "";
        global.login = false;
        console.log("Log Out");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("Error: ", (errorCode, errorMessage));
      });
  }
  return (
    <View style={{ flex: 1, backgroundColor: paperTheme.colors.background }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image source={{ uri: global.profilePic }} size={50} />
              <View style={{ marginLeft: 10, flexDirection: "column" }}>
                <Title style={styles.title}>
                  {global.name} {global.lastName}
                </Title>
                <Caption style={styles.caption}>{global.email}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
              label="Recomendaciones"
              icon={({ color, size }) => (
                <Icon name="form-select" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("RECOMENDACIONES");
              }}
            />
            <DrawerItem
              label="Map"
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("INICIO");
              }}
              activeTintColor="red"
            />
            <DrawerItem
              label="Perfil"
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("PERFIL");
              }}
            />
            <DrawerItem
              label="Servicios"
              icon={({ color, size }) => (
                <FontAwesome name="people-carry" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("SERVICIOS");
              }}
            />
            <DrawerItem
              label="Noticias"
              icon={({ color, size }) => (
                <Icon name="bulletin-board" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("NOTICIAS");
              }}
            />
            <DrawerItem
              label="Videos"
              icon={({ color, size }) => (
                <Icon name="youtube-tv" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("VIDEOS");
              }}
            />

            
            <DrawerItem
              label="Sugerencias"
              icon={({ color, size }) => (
                <Icon name="form-select" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("SUGERENCIAS");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferencias">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Modo Oscuro</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Cerrar Sesión"
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          onPress={() => {
            cerrar();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingRight: 60,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,

    borderTopColor: "#f4f4f4",
    borderTopwidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    //justifyContent: 'center'
  },
});
