import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useTheme, Sc } from "@react-navigation/native";
import React from "react";
import { getLocation, getLocation2 } from "../services/GeoServices";
import MapView, { Callout, Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import { Modal } from "react-native-paper";
import SceneView from "react-native-scene-view";

const height = Dimensions.get("window").height;
export const HomeScreen = ({ route }) => {
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [visibleCallOut, setVisibleCallOut] = React.useState(true);
  const [name, setName] = React.useState("Un placer verte de nuevo");
  const [coordinates, setCoordinates] = React.useState([]);
  const [data, setData] = React.useState({
    coordinatesM: [],
  });

  React.useEffect(() => {
    console.log("DIRECCION BASE ----------------------",global.direccionBase);
    getLocation(setCoordinates, global.direccionBase);
  }, []);

  const funcion = () => {
    console.log("PRESSED", visible);
  };
  return (
    <View>
      {coordinates.length <= 0 ? (
        <>
          <Text style={{ color: colors.text }}>{name}</Text>
          <ActivityIndicator size="large" />
        </>
      ) : (
        <>
          <Text style={{ color: colors.text }}>
            {name}
            {global.lastName}
          </Text>
          <Text style={{ color: colors.text }}>{coordinates.length}</Text>
          <Text style={{ color: colors.text }}>{data.coordinatesM.length}</Text>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            loadingEnabled={true}
            showsUserLocation={true}
            zoomTapEnabled={true}
            region={{
              latitude: -0.2755586,
              longitude: -78.5433207,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            }}
          >
            <Polygon
              coordinates={coordinates.sort((a, b) => a.id - b.id)}
              fillColor={"rgba(100,200,200,0.3)"}
              strokeColor="coral"
              strokeWidth={3}
              tappable={true}
              onPress={() => {
                funcion();
              }}
            ></Polygon>

            <MapView.Marker
              key={"1"}
              coordinate={{ latitude: -0.17989, longitude: -78.50273 }}
              title={"Titulo"}
              description={"description"}
            >
              <Callout>
                <Text>Ruta: {coordinates[0].ruta}</Text>
                <Text>Horario: {coordinates[0].horario}</Text>
                <Text>Frecuencia: {coordinates[0].frecuencia}</Text>
                <Text>Servicio: {coordinates[0].servicio}</Text>
                <Text>ADM_ZONAL: {coordinates[0].adm_zonal}</Text>
                <Text>Horas: {coordinates[0].horas}</Text>
                <Text>Centro Logístico: {coordinates[0].centroLogistico}</Text>
              </Callout>
            </MapView.Marker>
          </MapView>
        </>
      )}
      <Modal visible={visible} />
    </View>
  );
};

const styles = StyleSheet.create({
  map: { width: Dimensions.get("window").width, height: height / 2 },
});
