import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Video,
} from "react-native";
import React, { useCallback } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { useTheme } from "react-native-paper";
import { Button } from "react-native-elements";
import * as ScreenOrientation from "expo-screen-orientation";
import ReactPlayer from "react-player";
import WebView from "react-native-webview";

export const VideosDetailScreen = ({ route }) => {
  const { colors } = useTheme();
  const [videoSource, setVideoSource] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);
  if (route != null && route.params != null && route.params.items != null) {
    console.log("params" + route.params.items);
  }
  React.useEffect(() => {
    setVideoSource(route.params.items);
  }, []);
  const [state, setState] = React.useState({
    muted: false,
    fullScreen: false,
    shouldPlay: true,
  });
  const handlePlayAndPause = () => {
    setState({
      ...state,
      shouldPlay: !state.shouldPlay,
    });
  };

  const handleVolume = () => {
    setState({
      ...state,
      muted: !state.muted,
    });
  };
  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  const onStateChange = useCallback((statea) => {
    if (statea === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!", "asdas", [
        {
          text: "OK",
          onPress: () => {
            setOrientation();
          },
        },
      ]);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    <View>
      {videoSource == null ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <Text style={{ color: colors.text }}>{videoSource.title}</Text>
          <View>
            <YoutubePlayer
              height={200}
              play={state.shouldPlay}
              videoId={videoSource.urlID}
              onChangeState={onStateChange}
              forceAndroidAutoplay={true}
              onFullScreenChange={setOrientation}
              volume={state.muted ? 0 : 100}
            />
            {/* <Button title={state.shouldPlay ? "pause" : "play"} onPress={togglePlaying} /> */}
          </View>
          <View style={styles.controlBar}>
            <TouchableOpacity
              underlayColor="black"
              onPress={() => {
                handlePlayAndPause();
              }}
            >
              {state.shouldPlay ? (
                <Text style={styles.controlButton}>Pause</Text>
              ) : (
                <Text style={styles.controlButton}>Play</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              underlayColor="black"
              onPress={() => {
                handleVolume();
              }}
            >
              {state.muted ? (
                <Text style={styles.controlButton}>Unmute</Text>
              ) : (
                <Text style={styles.controlButton}>Mute</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              underlayColor="black"
              onPress={() => {
                setOrientation();
              }}
            >
              {state.fullScreen ? (
                <Text style={styles.controlButton}>Exit full screen</Text>
              ) : (
                <Text style={styles.controlButton}>Go full screen</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
    minHeight: Dimensions.get("window").height / 2.5,
    alignSelf: "stretch",
    backgroundColor: "transparent",
  },
  button: {
    margin: 10,
  },
  controlBar: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fullScreenButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  controlButton: {
    margin: 10,
    fontSize: 15,
    color: "white",
  },
  WebViewContainer: {
    height: Dimensions.get("window").height / 2,
  },
  backgroundVideo: {
    width: "100%",
    height: "100%",
  },
});
