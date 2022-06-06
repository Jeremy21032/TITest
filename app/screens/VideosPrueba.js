import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { TextInput, useTheme } from "react-native-paper";
import * as styles from "../../assets/styles/appStyles";
import { saveVideos } from "../services/VideoServices";

export const VideosPrueba = () => {
  const paperTheme = useTheme();
  const [data, setData] = React.useState({
    title: null,
    urlID: null,
    url: null,
    author: null,
    prevImgPre: "https://img.youtube.com/vi/",
    prevImgPost: "/maxresdefault.jpg",
    prevImg: null,
    id: "11v",
    category: null,
  });
  const handleChangeTitle = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        title: val,
      });
    }
  };
  const handleChangeAuthor = (val) => {
    if (val.trim().length >= 43) {
      setData({
        ...data,
        author: val,
      });
    }
  };
  const handleChangeUrl = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        url: val,
      });
      if (data.url != null) {
        const final = data.url.split("=");
        console.log(final);
        console.log(typeof final[1]);
        setData({
          ...data,
          urlID: final[1],
        });
      }
      if(data.urlID!= null){
          setData({
              ...data,
            prevImg:data.prevImgPre+data.urlID+data.prevImgPost
        })
      }
    }
    
  };

  const evaluar =async () => {
    //   https://www.youtube.com/watch?v=cHsKzdyXDH0
    //   https://img.youtube.com/vi/cHsKzdyXDH0/maxresdefault.jpg
    

    let video = {
      id: data.id,
      title: data.title,
      url: data.url,
      prevImg: data.prevImg,
      author: data.author,
      category:"reciclaje",
      urlID:data.urlID
    };
    await saveVideos(video);
  };

  return (
    <View>
      <Text style={{ color: paperTheme.colors.text }}>VideosPrueba</Text>
      <TextInput
        placeholder="Title"
        autoCapitalize="none"
        onChangeText={(val) => handleChangeTitle(val)}
      />
      <TextInput
        placeholder="Author"
        autoCapitalize="none"
        onChangeText={(val) => handleChangeAuthor(val)}
      />
      <TextInput
        placeholder="Url"
        autoCapitalize="none"
        onChangeText={(val) => handleChangeUrl(val)}
      />
      <Button title="SAVE" onPress={() => evaluar()} />
    </View>
  );
};
