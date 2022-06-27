import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import MapView, { Polygon, PROVIDER_GOOGLE } from "react-native-maps";
const height = Dimensions.get("window").height;
export const Home = () => {
  const paperTheme = useTheme();
  const [data, setData] = useState({
    ruta: "",
    horario: "",
    frecuencia: "",
    servicio: "",
    adm_zonal: "",
    horas: "",
    centroLogistico: "",
  });
  const [location, setLocation] = useState({
    latitude: -0.2755586,
    longitude: -78.5433207,
  });

  useEffect(() => {
    setData({
      adm_zonal: global.coordenadas[0].adm_zonal,
      centroLogistico: global.coordenadas[0].centroLogistico,
      frecuencia: global.coordenadas[0].frecuencia,
      horario: global.coordenadas[0].horario,
      horas: global.coordenadas[0].horas,
      ruta: global.coordenadas[0].ruta,
      servicio: global.coordenadas[0].servicio,
    });
    setLocation({
      ...location,
      latitude: global.coordenadas[0].calloutlatitude,
      longitude: global.coordenadas[0].calloutlongitude,
    });
  }, []);
  const ComponenteFalso = () => {
    return <ActivityIndicator size="large" />;
  };
  const ComponenteVerdadero = () => {
    return (
      <ScrollView>
        <View
          style={{ flex: 1, height: Dimensions.get("window").height / 1.65 }}
        >
          <Text style={{ color: paperTheme.colors.text }}>
            Bienvenido {global.name} {global.lastName}
          </Text>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            loadingEnabled={true}
            showsUserLocation={true}
            zoomTapEnabled={true}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01922,
              longitudeDelta: 0.00421,
            }}
          >
            <Polygon
              coordinates={global.coordenadas.sort((a, b) => a.id - b.id)}
              fillColor={"rgba(100,200,200,0.3)"}
              strokeColor="coral"
              strokeWidth={3}
              tappable={true}
            ></Polygon>

            <MapView.Marker
              key={"1"}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={"Titulo"}
              description={"description"}
            >
              {/* <Callout>
                <Text>Ruta: {coordinates[0].ruta}</Text>
                <Text>Horario: {coordinates[0].horario}</Text>
                <Text>Frecuencia: {coordinates[0].frecuencia}</Text>
                <Text>Servicio: {coordinates[0].servicio}</Text>
                <Text>ADM_ZONAL: {coordinates[0].adm_zonal}</Text>
                <Text>Horas: {coordinates[0].horas}</Text>
                <Text>Centro Logístico: {coordinates[0].centroLogistico}</Text>
              </Callout> */}
            </MapView.Marker>
          </MapView>
        </View>

        <View
          style={[
            { shadowColor: paperTheme.dark ? "white" : "#2e2e2e" },
            styles.box,
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: paperTheme.colors.text,
                marginVertical: 5,
                fontSize: 20,
              },
            ]}
          >
            {data.ruta.toUpperCase()}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            HORARIO: {data.horario.toUpperCase()}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            FRECUENCIA: {data.frecuencia.toUpperCase()}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            Servicio: {data.servicio.toUpperCase()}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            ADM_ZONAL: {data.adm_zonal.toUpperCase()}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            HORAS: {data.horas}
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            CENTRO LOGÍSTICO: {data.centroLogistico.toUpperCase()}
          </Text>
        </View>
      </ScrollView>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {global.coordenadas != null && global.coordenadas.length > 0 ? (
        <ComponenteVerdadero />
      ) : (
        <ComponenteFalso />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10,
    borderWidth: 1,
    borderColor: "transparent",
    width: 350,
    height: 175,
    justifyContent: "center",
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
  map: {
    width: Dimensions.get("window").width,
    height: height / 2,
    
  },
});
