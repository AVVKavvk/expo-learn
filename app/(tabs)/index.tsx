import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      // Only try to get historical data on iOS
      if (Platform.OS === "ios") {
        try {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 1);

          const pastStepCountResult = await Pedometer.getStepCountAsync(
            start,
            end
          );
          if (pastStepCountResult) {
            setPastStepCount(pastStepCountResult.steps);
          }
        } catch (error) {
          console.log("Error getting past step count:", error);
        }
      }

      // Watch for real-time steps (works on both platforms)
      return Pedometer.watchStepCount((result) => {
        console.log(result);

        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    let subscription;

    subscribe().then((sub) => {
      subscription = sub;
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Pedometer Available: {isPedometerAvailable}
      </Text>
      {Platform.OS === "ios" && (
        <Text style={styles.text}>
          Steps taken in the last 24 hours: {pastStepCount}
        </Text>
      )}
      {Platform.OS === "android" && (
        <Text style={styles.note}>
          Note: Historical step data not available on Android
        </Text>
      )}
      <Text style={styles.text}>Current session steps: {currentStepCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  note: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
  },
});
