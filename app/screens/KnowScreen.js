import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Modal,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";
import * as styles from "../../assets/styles/appStyles";
import { LinearGradient } from "expo-linear-gradient";
import {
  aniadirDireccionBase,
  getDireccionBase,
  getPersonalInfomation,
  getPlaces,
} from "../services/InfoServicesPersonal";
import DropDownPicker from "react-native-dropdown-picker";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ModalInfoError } from "../components/ModalInfoError";
import { ModalInfoCorrect } from "../components/ModalInfoCorrect";
import { getLocation } from "../services/GeoServices";

export const KnowScreen = ({ navigation }) => {
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [mode, setMode] = React.useState("date");
  const [date2, setDate2] = React.useState(new Date());
  const [modalVisibleError, setModalVisibleError] = React.useState(false);
  const [modalVisibleCorrect, setModalVisibleCorrect] = React.useState(false);
  const [messageCorrect, setMessageCorrect] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [messageError, setMessageError] = React.useState("");
  const [direction, setDirection] = React.useState(null);
  const [map, setMap] = React.useState();
  const [data, setData] = React.useState({
    date: "",
    direcionBase: null,
  });
  let component = (
    <LoadingOverlay
      isVisible={isLoading}
      setIsLoading={setIsLoading}
      setModalVisibleError={setModalVisibleError}
      setMessageError={setMessageError}
    />
  );

  let getItems = async () => {
    let places = await getPlaces();
    for (let i = 0; i < places.length; i++) {
      if (items.includes(places[i].value)) {
      } else {
        items.push(places[i]);
      }
    }
    console.log("items", items);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow(Platform.OS === "windows");
    setDate2(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      (tempDate.getDate() < 10 ? "0" : "") +
      tempDate.getDate() +
      "-" +
      (tempDate.getMonth() < 9 ? "0" : "") +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear();
    setData({ ...data, date: fDate });
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  React.useEffect(() => {
    if (items.length > 0) {
      setItems([]);
    }
    getItems();
  }, []);
  React.useEffect(() => {
    if (direction != null) {
      canContinue();
    }
  }, [direction]);

  let validate = async () => {
    setIsLoading(true);
    if (
      data.direcionBase != null &&
      data.date != null &&
      data.direcionBase != "" &&
      data.date != ""
    ) {
      actualizarInformacion()
        .then(() => {
          setModalVisibleCorrect(true);
          setMessageCorrect("Información actualizada con éxito");
          setIsLoading(false);
        })
        .catch((error) => {
          setModalVisibleError(true);
          setMessageError(error.message);
          setIsLoading(false);
        });
    } else {
      setModalVisibleError(true);
      setMessageError("Verifica que los campos estén llenos");
      setIsLoading(false);
    }
  };
  let actualizarInformacion = async () => {
    await aniadirDireccionBase(data.direcionBase, data.date);
    await getLocation(setMap, data.direcionBase);
    await getDireccionBase(setDirection, canContinue);
  };
  let canContinue = () => {
    console.log("MAPA************************* ", map);
    const JsonArray = JSON.stringify(map);
    global.coordinatesArray=map;
    navigation.navigate("HOMEKN", { items: "nombre cualquiera" });
  };
  return (
    <View style={styles.commons.signContainer}>
      <View style={styles.commons.header}>
        <Text style={styles.commons.text_header}>Hola, {global.name}.</Text>
        <Text style={styles.commons.text_header}></Text>
        <Text style={styles.commons.text_header}>
          Antes de continuar, queremos conocerte un poco más.
        </Text>
      </View>
      <Animatable.View style={stylesK.footer} animation="fadeInUpBig">
        <Text style={styles.commons.description}>
          Por que para nosotros eres importante, queremos formar parte de tus
          momentos importantes
        </Text>
        <Text
          style={[
            styles.commons.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Fecha de Nacimiento
        </Text>
        <View style={[styles.commons.action, { marginBottom: 35 }]}>
          <FontAwesome name="birthday-cake" color="#05375a" size={20} />
          <TextInput
            placeholder={
              data.date != "" ? data.date : "Ingresa tu fecha de nacimiento"
            }
            style={styles.commons.textInput}
            autoCapitalize="none"
            editable={false}
            placeholderTextColor={
              data.date != "" ? styles.colors.black : styles.colors.lightGray
            }
          />
          <TouchableOpacity onPress={() => showMode("date")}>
            <Feather name="calendar" color="grey" size={20} />
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date2}
            mode={mode}
            is24Hour={true}
            display="calendar"
            onChange={onChange}
            maximumDate={new Date()}
            textColor="red"
          />
        )}
        <Text style={styles.commons.description}>
          Selecciona el sector donde vives.
        </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={(item) => {
            console.log(item);
            setData({ ...data, direcionBase: item.label });
          }}
        />
        <Text style={styles.commons.description}>{"\n"}</Text>
        <TouchableOpacity
          // onPress={() => { if (selected != null) { aniadirDireccion() } else { Alert.alert("asdasd", "asdasd") } }}
          onPress={() => validate()}
          style={{ width: "100%" }}
        >
          <LinearGradient
            colors={["#08d4c4", "#01ab9d"]}
            style={styles.commons.signIn}
          >
            <Text style={[styles.commons.textSign, { color: "#fff" }]}>
              Continuar
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
      {isLoading ? component : <View></View>}
      <ModalInfoError
        modalVisible={modalVisibleError}
        setModalVisible={setModalVisibleError}
        message={messageError}
      ></ModalInfoError>
      <ModalInfoCorrect
        modalVisible={modalVisibleCorrect}
        setModalVisible={setModalVisibleCorrect}
        message={messageCorrect}
      ></ModalInfoCorrect>
    </View>
  );
};

export const stylesK = StyleSheet.create({
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
