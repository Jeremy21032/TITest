import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen } from '../screens/HomeScreen';
import { VideosScreen } from '../screens/VideosScreen';
import { BadgesScreen } from '../screens/BadgesScreen';
import { ServicesScreen } from '../screens/ServicesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { DrawerContent } from '../screens/DrawerContent';
import * as styles from '../../assets/styles/appStyles';
import { useWindowDimensions } from 'react-native';
import { VideoStackScreen } from './VideosStackScreen';
import NoticesBottomScreen from './NoticesBottomScreen';
import { EditProfile } from '../screens/EditProfile';
import { Home } from '../screens/Home';
import { NoticesOrganicStackScreen } from './NoticesOrganicStackScreen';
import { ProfileStackScreen } from './ProfielStack';
import { RecomendationsScreen } from '../screens/RecomendationsScreen';
import { SuggestionsStackScreen } from './SuggestionsStackScreen';


const RootDrawer = createDrawerNavigator();
export const RootDrawerScreen = ({ items }) => (
    <RootDrawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{
        headerStyle: { backgroundColor: styles.colors.darkCyan },
        headerTintColor: styles.colors.cultured,
        drawerType: useWindowDimensions().width >= 768 ? "permanent" : "back",
        drawerStyle: useWindowDimensions().width >= 768? null : { width: "75%" },
        overlayColor: "transparent",
    }}>
        {console.log(".....................ITEMS...................",items)}
        <RootDrawer.Screen name="RECOMENDACIONES" component={RecomendationsScreen} />
        <RootDrawer.Screen name="INICIO" component={Home} />
        {/* <RootDrawer.Screen name="PERFIL" component={ProfileScreen} /> */}
        <RootDrawer.Screen name="PERFIL" component={ProfileStackScreen} />
        <RootDrawer.Screen name="SERVICIOS" component={ServicesScreen} />
        <RootDrawer.Screen name="NOTICIAS" component={NoticesOrganicStackScreen} />
        <RootDrawer.Screen name="VIDEOS" component={VideoStackScreen} />
        <RootDrawer.Screen name="BADGES" component={BadgesScreen} />
        <RootDrawer.Screen name="SUGERENCIAS" component={SuggestionsStackScreen} />
    </RootDrawer.Navigator>
)


