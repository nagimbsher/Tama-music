import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [sound, setSound] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [downloadedSongs, setDownloadedSongs] = useState(new Set());
  const [downloadingSongs, setDownloadingSongs] = useState(new Set());
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    loadSongs();
    setupAudioMode();
  }, []);

  useEffect(() => {
    filterSongs();
  }, [searchQuery, selectedCategory, songs]);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  async function setupAudioMode() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error("Error setting audio mode:", error);
    }
  }

  async function loadSongs() {
    try {
      const res = await axios.get(
        "https://raw.githubusercontent.com/nagimbsher/Tama-music/main/songs.json"
      );
      setSongs(res.data);
      const uniqueCategories = [
        "All",
        ...new Set(res.data.map((song) => song.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      Alert.alert("Error", "Failed to load songs. Please check your connection.");
      console.error(error);
    }
  }

  function filterSongs() {
    let filtered = [...songs];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((song) => song.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (song) =>
          song.title.toLowerCase().includes(query) ||
          song.artist?.toLowerCase().includes(query) ||
          song.category.toLowerCase().includes(query)
      );
    }

    setFilteredSongs(filtered);
  }

  async function playSong(song, index) {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      let uri = song.url;
      
      // Check if song is downloaded, use local file
      if (downloadedSongs.has(song.id)) {
        const localUri = `${FileSystem.documentDirectory}${song.id}.mp3`;
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        if (fileInfo.exists) {
          uri = localUri;
        }
      }

      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);
      setCurrentSong(song);
      setCurrentIndex(index);
      setIsPlaying(true);
      await newSound.playAsync();
    } catch (error) {
      Alert.alert("Error", "Failed to play song. Please try again.");
      console.error(error);
    }
  }

  async function togglePlayPause() {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  }

  async function playNext() {
    if (currentIndex < filteredSongs.length - 1) {
      const nextIndex = currentIndex + 1;
      await playSong(filteredSongs[nextIndex], nextIndex);
    }
  }

  async function playPrevious() {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      await playSong(filteredSongs[prevIndex], prevIndex);
    }
  }

  function onPlaybackStatusUpdate(status) {
    if (status.didJustFinish) {
      setIsPlaying(false);
      playNext();
    }
  }

  async function downloadSong(song) {
    if (downloadedSongs.has(song.id)) {
      Alert.alert("Info", "Song is already downloaded");
      return;
    }

    setDownloadingSongs((prev) => new Set(prev).add(song.id));

    try {
      const fileUri = `${FileSystem.documentDirectory}${song.id}.mp3`;
      const downloadResumable = FileSystem.createDownloadResumable(
        song.url,
        fileUri
      );

      await downloadResumable.downloadAsync();
      setDownloadedSongs((prev) => new Set(prev).add(song.id));
      Alert.alert("Success", "Song downloaded successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to download song. Please try again.");
      console.error(error);
    } finally {
      setDownloadingSongs((prev) => {
        const newSet = new Set(prev);
        newSet.delete(song.id);
        return newSet;
      });
    }
  }

  function renderSongItem({ item, index }) {
    const isDownloaded = downloadedSongs.has(item.id);
    const isDownloading = downloadingSongs.has(item.id);
    const isCurrentSong = currentSong?.id === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.songItem,
          isCurrentSong && styles.currentSongItem,
        ]}
        onPress={() => playSong(item, index)}
      >
        <View style={styles.songInfo}>
          <Ionicons
            name={isCurrentSong && isPlaying ? "musical-notes" : "musical-note-outline"}
            size={24}
            color={isCurrentSong ? "#6366f1" : "#64748b"}
            style={styles.songIcon}
          />
          <View style={styles.songDetails}>
            <Text style={[styles.songTitle, isCurrentSong && styles.currentSongTitle]}>
              {item.title}
            </Text>
            <Text style={styles.songArtist}>{item.artist || "Unknown Artist"}</Text>
            <View style={styles.songMeta}>
              <Text style={styles.songCategory}>{item.category}</Text>
              {isDownloaded && (
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              )}
            </View>
          </View>
        </View>
        <View style={styles.songActions}>
          {isDownloading ? (
            <ActivityIndicator size="small" color="#6366f1" />
          ) : (
            <TouchableOpacity
              onPress={() => downloadSong(item)}
              style={styles.downloadButton}
            >
              <Ionicons
                name={isDownloaded ? "checkmark-circle" : "download-outline"}
                size={24}
                color={isDownloaded ? "#10b981" : "#64748b"}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1b4b" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tama Music</Text>
        <TouchableOpacity
          onPress={() => setShowCategories(!showCategories)}
          style={styles.categoryButton}
        >
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs, artists, categories..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      {showCategories && (
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowCategories(false);
                }}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Songs List */}
      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSongItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="musical-notes-outline" size={64} color="#64748b" />
            <Text style={styles.emptyText}>No songs found</Text>
          </View>
        }
      />

      {/* Audio Player */}
      {currentSong && (
        <View style={styles.playerContainer}>
          <View style={styles.playerInfo}>
            <Ionicons name="musical-notes" size={20} color="#fff" />
            <View style={styles.playerSongInfo}>
              <Text style={styles.playerSongTitle} numberOfLines={1}>
                {currentSong.title}
              </Text>
              <Text style={styles.playerSongArtist} numberOfLines={1}>
                {currentSong.artist || "Unknown Artist"}
              </Text>
            </View>
          </View>
          <View style={styles.playerControls}>
            <TouchableOpacity
              onPress={playPrevious}
              disabled={currentIndex === 0}
              style={styles.playerButton}
            >
              <Ionicons
                name="play-skip-back"
                size={24}
                color={currentIndex === 0 ? "#475569" : "#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={togglePlayPause}
              style={styles.playPauseButton}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={32}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={playNext}
              disabled={currentIndex === filteredSongs.length - 1}
              style={styles.playerButton}
            >
              <Ionicons
                name="play-skip-forward"
                size={24}
                color={currentIndex === filteredSongs.length - 1 ? "#475569" : "#fff"}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  header: {
    backgroundColor: "#1e1b4b",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  categoryButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  categoriesContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: "#6366f1",
  },
  categoryChipText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "500",
  },
  categoryChipTextActive: {
    color: "#fff",
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  songItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  currentSongItem: {
    backgroundColor: "#312e81",
    borderWidth: 2,
    borderColor: "#6366f1",
  },
  songInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  songIcon: {
    marginRight: 12,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  currentSongTitle: {
    color: "#818cf8",
  },
  songArtist: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 4,
  },
  songMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  songCategory: {
    fontSize: 12,
    color: "#64748b",
    backgroundColor: "#0f172a",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  songActions: {
    marginLeft: 10,
  },
  downloadButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: "#64748b",
    marginTop: 16,
  },
  playerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1e1b4b",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#312e81",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  playerSongInfo: {
    marginLeft: 12,
    flex: 1,
  },
  playerSongTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  playerSongArtist: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 2,
  },
  playerControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  playerButton: {
    padding: 8,
  },
  playPauseButton: {
    backgroundColor: "#6366f1",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
