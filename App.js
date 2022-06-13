import React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from './app/components/context'
import { loadFirebaseConfiguration } from './app/util/FirebaseConfiguration';
import { RootStackScreen } from './app/navs/RootStackScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { RootDrawerScreen } from './app/navs/RootDrawerScreen';
import { getPersonalInfomation, getPersonalRol } from './app/services/InfoServicesPersonal';
import * as styles from './assets/styles/appStyles';
import { KnowStackScreen } from './app/navs/KnowStackScreen';
import NetInfo from '@react-native-community/netinfo';
const Drawer = createDrawerNavigator();

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  color: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: styles.colors.cultured,
    text: styles.colors.black
  }
}
const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  color: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    text: styles.colors.cultured,
    background: styles.colors.black
  }
}

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const authContext = React.useMemo(() => ({
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  const [login, setLogin] = React.useState(false);
  const theme = isDarkTheme ? CustomDefaultTheme : CustomDarkTheme;
  loadFirebaseConfiguration();
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
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

  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });


  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>

        <NavigationContainer theme={theme}>
          {login?
            (global.rol == "cliente" ? (
              (global.direccionBase == null)
                ? (<KnowStackScreen />
                ) : (<RootDrawerScreen />)
            ) : (
              <RootStackScreen />)
            ) : (
              <RootStackScreen />)}
          {/* <RootStackScreen /> */}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;