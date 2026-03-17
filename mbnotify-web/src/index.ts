import mqtt from "mqtt";

const DEFAULT_BROKER = "wss://broker.hivemq.com:8884/mqtt";

let client: mqtt.MqttClient | null = null;

export interface NotificationPayload {
  title?: string
  body?: string
  icon?: string
  image?: string
  url?: string
  data?: Record<string, any>
}

/**
 * Request browser notification permission
 */
export async function requestPermission(): Promise<NotificationPermission> {

  if (!("Notification" in window)) {
    throw new Error("Notifications not supported in this browser");
  }

  return await Notification.requestPermission();
}

/**
 * Generate or retrieve device token
 */
function generateToken(): string {

  let token = localStorage.getItem("mbnotify_token");

  if (!token) {

    token =
      "dev_" +
      Math.random().toString(36).substring(2) +
      Date.now().toString(36);

    localStorage.setItem("mbnotify_token", token);
  }

  return token;
}

/**
 * Connect to MQTT broker
 */
function connectMQTT(brokerUrl: string): mqtt.MqttClient {

  if (client) return client;

  client = mqtt.connect(brokerUrl, {
    reconnectPeriod: 5000,
    connectTimeout: 10000
  });

  client.on("connect", () => {
    console.log("mbnotify web connected");
  });

  client.on("error", (err) => {
    console.error("MQTT error:", err);
  });

  return client;
}

/**
 * Display browser notification
 */
function showNotification(payload: NotificationPayload) {

  if (Notification.permission !== "granted") return;

  const options: NotificationOptions & { image?: string } = {

    body: payload.body || "",
    icon: payload.icon || "",
    image: payload.image,

    data: {
      url: payload.url
    }

  };

  const notification = new Notification(payload.title || "", options);

  notification.onclick = () => {

    if (notification.data?.url) {

      window.focus();
      window.open(notification.data.url, "_blank");

    }

  };
}

/**
 * Subscribe to device notification topic and return device token
 */
export async function getToken(
  appName: string,
  brokerUrl: string = DEFAULT_BROKER
): Promise<string> {

  if (!appName) {
    throw new Error("appName required");
  }

  const token = generateToken();

  const topic = `/${appName}/${token}/notification`;

  const mqttClient = connectMQTT(brokerUrl);

  mqttClient.subscribe(topic);

  console.log("Subscribed:", topic);

  mqttClient.on("message", (_, message) => {

    try {

      const payload: NotificationPayload =
        JSON.parse(message.toString());

      showNotification(payload);

    } catch (err) {

      console.error("Invalid notification payload", err);

    }

  });

  return token;
}