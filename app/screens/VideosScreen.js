import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { Button } from "react-native-elements";
import { ListVideos } from "./Lists/ListVideos";
import { getVideos } from "../services/VideoServices";
import DropDownPicker from "react-native-dropdown-picker";
import Feather from 'react-native-vector-icons/Feather';

export const VideosScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [selected, isSelected] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { id: 1, label: "Orgánicos", value: "organicos" },
    { id: 2, label: "Covid", value: "covid" },
    { id: 3, label: "Reciclaje", value: "reciclaje" },
    { id: 4, label: "Medio Ambiente", value: "medio ambiente" },
  ]);

  const [chosed, setChosed] = React.useState(null);

  const [videos, setVideos] = React.useState(null);
  React.useEffect(() => {
    async function fillVideos() {
      let videosN = await getVideos();
      setVideos(videosN);
    }
    fillVideos();
  }, []);
  return (
    <View>
      {videos == null ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <>
          <View>
            <Text style={{ color: colors.text }}>Filtrar:</Text>
            {/* <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onSelectItem={(item) => {
                console.log(item);
                setChosed(item.value);
              }}
            />
            <TouchableOpacity onPress={() =>{ setChosed(null)}}><Feather name="x-circle" size={30}/></TouchableOpacity> */}
          </View>
          <FlatList
            data={videos}
            numColumns={1}
            renderItem={({ item }) => {
              return (
                <ListVideos
                  infoVideos={item}
                  containerStyle={{
                    borderColor: selected == false ? "green" : "red",
                  }}
                />
              );
            }}
            keyExtractor={(item) => {
              return item.id;
            }}
          />

          <Text style={{ color: colors.text }}>VideosScreen</Text>
          <Button
            title="Go"
            onPress={() => {
              navigation.navigate("VIDEOSDETAIL");
            }}
          />
          <Button
            title="Go2"
            onPress={() => {
              navigation.navigate("VIDEOSPRUEBA");
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
