import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import axios from "axios";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    axios
      .get("https://raw.githubusercontent.com/yourusername/tama-audio/main/songs.json")
      .then((res) => setSongs(res.data));
  }, []);

  async function playSong(url) {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
    setSound(newSound);
    await newSound.playAsync();
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Tama Music
      </Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => playSong(item.url)}
            style={{ marginBottom: 15 }}
          >
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Text style={{ fontSize: 14, color: "gray" }}>{item.category}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

