import {  Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as styles from '../../assets/styles/appStyles'
import { validateEmail } from '../services/Validations'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { ModalInfoError } from '../components/ModalInfoError'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { ModalInfoCorrect } from '../components/ModalInfoCorrect'
import { useTheme } from 'react-native-paper'
export const ForgotScreen = ({ navigation }) => {
    const [modalVisibleError, setModalVisibleError] = React.useState(false);
    const [modalVisibleCorrect, setModalVisibleCorrect] = React.useState(false);
    const [messageCorrect, setMessageCorrect] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [messageError, setMessageError] = React.useState("");
    const auth = getAuth();
    let component = <LoadingOverlay isVisible={isLoading} setIsLoading={setIsLoading} setModalVisibleError={setModalVisibleError} setMessageError={setMessageError} />
const paperTheme = useTheme();
    const [data, setData] = React.useState({
        email: '',
        isvalidEmail: true,
        isvalidPassword: true
    })
    const textInputChange = (val) => {
        let validator = validateEmail(val);

        if (validator.Result && val.trim().length >= 6) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isvalidEmail: true,
            })
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isvalidEmail: false
            })
        }
    }
    const forgotPassword = (mail) => {
        return sendPasswordResetEmail(auth, mail)
    }
    const handleForgotPassword = () => {
        const email = data.email;
        setIsLoading(true);
        forgotPassword(email).then(() => {
            setModalVisibleCorrect(true);
            setMessageCorrect("El correo fue enviado al correo:\n"+data.email+"\nRecuerde revisar la bandeja de SPAM (Correo no deseado)")
            setIsLoading(false);
        }
        ).catch(
            (error)=>{
                setIsLoading(false);
                setModalVisibleError(true);
                setMessageError(error.message)
            }
        )
    }


    return (
        <View style={styles.commons.signContainer}>
            <StatusBar backgroundColor={styles.colors.darkCyan} barStyle="light-content" />
            <View style={styles.commons.header}>
                <Text style={styles.commons.text_header}>Recuperar tu contraseña</Text>

            </View>
            <Animatable.View
                style={[styles.commons.footer, { justifyContent: "center" }]}
                animation="fadeInUpBig"
            >
                {/* A email input field. */}
                <Text style={[styles.commons.text_footer,{marginBottom:35}]}>Te enviaremos un mensaje a tu correo.</Text>
                <Text style={styles.commons.text_footer}>Correo electrónico</Text>
                <View style={styles.commons.action}>
                    <FontAwesome
                        name="user-o"
                        color={styles.colors.darkBlue}
                        size={20} />
                    <TextInput
                        placeholder='Tu correo electrónico'
                        style={[styles.commons.textInput,{color: styles.colors.darkBlue,}]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View> : <></>}
                </View>
                {data.isvalidEmail ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.commons.errorMsg}>El correo debe tener el formato correcto.</Text>
                    </Animatable.View>
                }
                {/* A button. */}

                <View style={styles.commons.button}>
                    <TouchableOpacity style={styles.commons.signIn} onPress={() => {
                        if (data.email != null && data.email != '') {
                            let validator = validateEmail(data.email);
                            if (validator.Result) {
                         
                                handleForgotPassword();
                                console.log("llego")

                            } else {
                                setModalVisibleError(true)
                                setMessageError(validator.message);
                            }
                        } else {
                            setModalVisibleError(true)
                            setMessageError("Verifique el email proporcionado");
                        }
                    }}>

                        <LinearGradient colors={[styles.colors.gradient2,styles.colors.gradient1]} style={styles.commons.signIn}>
                            <Text style={[styles.commons.textSign, { color: "#fff" }]}>Enviar correo</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SIGNIN")}
                        style={[styles.commons.signIn, { borderColor: styles.colors.darkCyan, borderWidth: 1, marginTop: 15 }]}>
                        <Text style={[styles.commons.textSign, { color: styles.colors.darkCyan }]}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
                {isLoading ? component : <View></View>}
                <ModalInfoError
                    modalVisible={modalVisibleError}
                    setModalVisible={setModalVisibleError}
                    message={messageError}
                >
                </ModalInfoError>
                <ModalInfoCorrect
                    modalVisible={modalVisibleCorrect}
                    setModalVisible={setModalVisibleCorrect}
                    message={messageCorrect}
                >
                </ModalInfoCorrect>

            </Animatable.View>
        </View>
    )
}

