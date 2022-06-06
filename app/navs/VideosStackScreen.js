import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { KnowScreen } from '../screens/KnowScreen';
import { RootDrawerScreen } from './RootDrawerScreen';
import { VideosScreen } from '../screens/VideosScreen';
import { VideosDetailScreen } from '../screens/VideosDetailScreen';
// import {VideoAIScreen} from '../screens/prueba/VideoAIScreen';
// import { Videos } from '../screens/prueba/Videos';
import { VideosPrueba } from '../screens/VideosPrueba';

const VideosStack = createStackNavigator();

export const VideoStackScreen= ({ navigation }) => (
  <VideosStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <VideosStack.Screen name="VIDEOSSCREEN" component={VideosScreen} />
    <VideosStack.Screen name="VIDEOSDETAIL" component={VideosDetailScreen} />
    {/* <VideosStack.Screen name="VIDEOSAI" component={VideoAIScreen} />
    <VideosStack.Screen name="VIDEOSSCS" component={Videos} /> */}

  </VideosStack.Navigator>
)


const styles = StyleSheet.create({})