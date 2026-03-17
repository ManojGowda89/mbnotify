import mqtt from "mqtt";

const DEFAULT_BROKER = "mqtt://broker.hivemq.com:1883";

let client: mqtt.MqttClient | null = null;

function getClient(brokerUrl: string = DEFAULT_BROKER): mqtt.MqttClient {

  if (!client) {

    client = mqtt.connect(brokerUrl, {
      reconnectPeriod: 5000
    });

    client.on("connect", () => {
      console.log("mbnotify server connected");
    });

    client.on("error", (err: Error) => {
      console.error("MQTT error:", err);
    });

  }

  return client;
}

export interface SendNotificationOptions {

  appName: string
  token: string

  title?: string
  body?: string

  icon?: string
  image?: string

  url?: string

  data?: Record<string, any>

}

export interface SendNotificationResponse {

  success: boolean
  topic: string

}

export async function sendNotification(
  options: SendNotificationOptions
): Promise<SendNotificationResponse> {

  const {
    appName,
    token,
    title,
    body,
    icon,
    image,
    url,
    data
  } = options;

  if (!appName) {
    throw new Error("appName required");
  }

  if (!token) {
    throw new Error("token required");
  }

  const topic = `/${appName}/${token}/notification`;

  const payload = {

    title,
    body,
    icon,
    image,
    url,
    data,

    timestamp: Date.now()

  };

  const mqttClient = getClient();

  mqttClient.publish(
    topic,
    JSON.stringify(payload),
    { qos: 1 }
  );

  return {
    success: true,
    topic
  };
}