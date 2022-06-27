import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as styles from "../../assets/styles/appStyles";
import { LinearGradient } from "expo-linear-gradient";
import {
  aniadirDireccionBase,
  getDireccionBase,
  getPlaces,
} from "../services/InfoServicesPersonal";
import DropDownPicker from "react-native-dropdown-picker";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ModalInfoError } from "../components/ModalInfoError";
import { ModalInfoCorrect } from "../components/ModalInfoCorrect";
import { getLocation, getLocationR } from "../services/GeoServices";
import { formattedDate } from "../Functions";
import { useTheme } from "react-native-paper";
import { getAuth } from "firebase/auth";

export const KnowScreen = ({ navigation }) => {
  const paperTheme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [modalVisibleCorrect, setModalVisibleCorrect] = useState(false);
  const [messageCorrect, setMessageCorrect] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [direction, setDirection] = useState(null);
  const [map,setMap] = useState();
  const [data, setData] = useState({
    date: null,
    direcionBase: null,
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
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
  const handleConfirm = (date) => {
    let pickedDate = new Date(date);
    let finalDate = formattedDate(pickedDate);
    console.warn("A date has been picked: ", finalDate);
    setData({ ...data, date: finalDate });
    hideDatePicker();
  };
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
    for (const element of places) {
      if (!items.includes(element.value)) {
        items.push(element);
      }
    }
    console.log("items", items);
  };

  useEffect(() => {
    if (items.length > 0) {
      setItems([]);
    }
    getItems();
  }, [items]);
  useEffect(() => {
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
      global.birthdate = data.date;
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
      setIsLoading(false);
    } else {
      setModalVisibleError(true);
      setMessageError("Verifica que los campos estén llenos");
      setIsLoading(false);
    }
  };
  let actualizarInformacion = async () => {
    await aniadirDireccionBase(data.direcionBase, data.date);
    await getDireccionBase(setDirection, canContinue);
  };
  let canContinue = () => {
    cerrar();
  };
  return (
    <View style={styles.commons.signContainer}>
      <View style={styles.commons.header}>
        <Text style={styles.commons.text_header}></Text>
        <Text style={styles.commons.text_header}>Hola, {global.name}.</Text>
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
          <FontAwesome
            name="birthday-cake"
            color={styles.colors.darkBlue}
            size={20}
          />
          <TextInput
            placeholder={
              data.date != "" && data.date != null
                ? data.date
                : "Ingresa tu fecha de nacimiento"
            }
            style={[
              styles.commons.textInput,
              {
                color: paperTheme.dark
                  ? styles.colors.white
                  : styles.colors.darkBlue,
              },
            ]}
            autoCapitalize="none"
            editable={false}
            placeholderTextColor={
              data.date != "" ? styles.colors.black : styles.colors.lightGray
            }
          />
          <TouchableOpacity onPress={showDatePicker}>
            <Feather name="calendar" color="grey" size={20} />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date("01/01/2005")}
          minimumDate={new Date("01/01/1920")}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
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
        <TouchableOpacity onPress={() => validate()} style={{ width: "100%" }}>
          <LinearGradient
            colors={[styles.colors.gradient2, styles.colors.gradient1]}
            style={styles.commons.signIn}
          >
            <Text
              style={[styles.commons.textSign, { color: styles.colors.white }]}
            >
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
    backgroundColor: styles.colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
