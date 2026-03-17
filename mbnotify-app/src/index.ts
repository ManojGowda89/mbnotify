import mqtt from "mqtt";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_BROKER = "wss://broker.hivemq.com:8884/mqtt";

let client: any = null;

export async function requestPermission(): Promise<boolean> {

  const { status } = await Notifications.requestPermissionsAsync();

  return status === "granted";
}

async function generateToken(): Promise<string> {

  let token = await AsyncStorage.getItem("mbnotify_token");

  if (!token) {

    token =
      "dev_" +
      Math.random().toString(36).substring(2) +
      Date.now().toString(36);

    await AsyncStorage.setItem("mbnotify_token", token);
  }

  return token;
}

function connectMQTT(brokerUrl: string) {

  if (client) return client;

  client = mqtt.connect(brokerUrl, {
    reconnectPeriod: 5000,
    connectTimeout: 10000
  });

  client.on("connect", () => {
    // console.log("✅ mbnotify app connected");
  });

  client.on("error", (err: any) => {
    console.error("MQTT error:", err);
  });

  // ✅ SINGLE message listener
  client.on("message", async (_: any, message: any) => {

    try {

      const payload = JSON.parse(message.toString());

      await Notifications.scheduleNotificationAsync({
        content: {
          title: payload.title || "",
          body: payload.body || "",
          data: payload.data || {}
        },
        trigger: null
      });

    } catch (err) {
      console.error("Invalid payload", err);
    }

  });

  return client;
}

export async function getToken(
  appName: string,
  brokerUrl: string = DEFAULT_BROKER
): Promise<string> {

  if (!appName) throw new Error("appName required");

  const token = await generateToken();

  const topic = `/${appName}/${token}/notification`;

  const mqttClient = connectMQTT(brokerUrl);

  mqttClient.subscribe(topic);

  // console.log("📡 Subscribed:", topic);

  return token;
}