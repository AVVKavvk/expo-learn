import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([
    {
      latlng: { latitude: 37.78825, longitude: -122.4324 },
      title: "San Francisco",
      description: "Financial District",
    },
    {
      latlng: { latitude: 37.79, longitude: -122.44 },
      title: "Golden Gate Park",
      description: "Beautiful urban park",
    },
    {
      latlng: { latitude: 37.77, longitude: -122.42 },
      title: "Mission District",
      description: "Art and culture hub",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const addMarker = () => {
    const newMarker = {
      latlng: {
        latitude: region.latitude + (Math.random() - 0.5) * 0.02,
        longitude: region.longitude + (Math.random() - 0.5) * 0.02,
      },
      title: `Location ${markers.length + 1}`,
      description: "New marker",
    };
    setMarkers([...markers, newMarker]);
  };

  const recenterMap = () => {
    setRegion({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Floating Action Buttons */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab} onPress={addMarker}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fabSecondary} onPress={recenterMap}>
          <Text style={styles.fabTextSmall}>⌖</Text>
        </TouchableOpacity>
      </View>

      {/* Info Panel */}
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>Map Info</Text>
        <Text style={styles.infoText}>Markers: {markers.length}</Text>
        <Text style={styles.infoText}>Lat: {region.latitude.toFixed(4)}</Text>
        <Text style={styles.infoText}>Lng: {region.longitude.toFixed(4)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  searchInput: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 10,
  },
  fab: {
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  fabSecondary: {
    backgroundColor: "#4CAF50",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  fabTextSmall: {
    color: "white",
    fontSize: 24,
  },
  infoPanel: {
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
