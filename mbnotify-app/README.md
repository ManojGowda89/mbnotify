
---

# 🚀 mbnotify Ecosystem

A **real-time push notification system** for web & mobile apps powered by MQTT.

This ecosystem consists of two packages:

* 📦 **mbnotify** → Send notifications (Backend / Server)
* 📱 **mbnotify-app** → Receive notifications (Expo / React Native)

---

# 📦 1. mbnotify (Server / Sender)

Send push notifications to devices instantly.

## 📥 Installation

```bash
npm install mbnotify
```

## ⚡ Usage

```js
import { sendNotification } from "mbnotify";

await sendNotification({
  appName: "myapp",
  token: "dev_xxxxxxxxxxxxx",

  title: "Order Shipped 🚚",
  body: "Your order has been shipped!",

  icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",

  url: "https://google.com",

  data: {
    orderId: "12345"
  }
});

console.log("✅ Notification sent");
```

---

## 🧾 Payload Options

| Field   | Type   | Description          |
| ------- | ------ | -------------------- |
| appName | string | App identifier       |
| token   | string | Device token         |
| title   | string | Notification title   |
| body    | string | Notification message |
| icon    | string | Small icon URL       |
| image   | string | Large image URL      |
| url     | string | Deep link / redirect |
| data    | object | Custom payload       |

---

## 🎯 Features

* ⚡ Real-time delivery
* 🌍 Works globally via MQTT
* 📦 Lightweight API
* 🔗 Supports deep linking
* 🧠 Custom data payloads

---

# 📱 2. mbnotify-app (Client / Receiver)

Receive notifications inside your **Expo / React Native app**.

---

## 📥 Installation

```bash
npm install mbnotify-app
```

Also install Expo notifications:

```bash
npx expo install expo-notifications
```

---

## ⚙️ Setup

### ✅ Required Fix (VERY IMPORTANT)

React Native doesn't support some Node modules by default:

```js
import { Buffer } from "buffer";
import process from "process";

global.Buffer = Buffer;
global.process = process;
```

---

## 🚀 Basic Usage

```js
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Notifications from "expo-notifications";

import { requestPermission, getToken } from "mbnotify-app";

// Show notifications in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {

    async function init() {

      try {
        setStatus("Requesting permission...");

        const granted = await requestPermission();

        if (!granted) {
          setStatus("❌ Permission denied");
          return;
        }

        setStatus("Connecting...");

        const deviceToken = await getToken("myapp");

        setToken(deviceToken);
        setStatus("✅ Connected");

        console.log("📱 Device token:", deviceToken);

      } catch (err) {
        console.error(err);
        setStatus("❌ Error initializing");
      }

    }

    init();

  }, []);

  return (
    <View>
      <Text>{status}</Text>
      {token && <Text>{token}</Text>}
    </View>
  );
}
```

---

## 🔑 Functions

### `requestPermission()`

```js
const granted = await requestPermission();
```

* Requests notification permission
* Returns `true` / `false`

---

### `getToken(appName)`

```js
const token = await getToken("myapp");
```

* Connects to MQTT
* Returns a **unique device token**

---

## 📲 Flow Overview

```text
[mbnotify-app] → Generates Token
        ↓
[Your Server] → Stores Token
        ↓
[mbnotify] → Sends Notification
        ↓
[Device] → Receives Notification 🚀
```

---

## 🔥 Features

* 📡 Real-time notifications (MQTT)
* 📱 Expo compatible
* 🔔 Foreground + Background support
* 🔐 Unique device tokens
* ⚡ Fast & lightweight

---

## ⚠️ Common Issues

### ❌ MQTT Errors in React Native

Fix:

```js
global.Buffer = require("buffer").Buffer;
global.process = require("process");
```

---

### ❌ Notifications not showing

Make sure:

* Permission is granted
* `Notifications.setNotificationHandler` is configured
* App is not restricted by OS battery settings

---

## 💡 Best Practices

* Store tokens securely in DB
* Use meaningful `appName`
* Avoid sending too many notifications
* Use `data` for deep linking/navigation

---

## 🧪 Example Use Case

* 🛒 E-commerce → Order updates
* 💬 Chat app → New messages
* 📦 Delivery → Status tracking
* 📊 SaaS → Alerts & updates

---

## 👨‍💻 Author

**Manoj Gowda B R**
Full Stack Developer (MERN)

---

## 🌟 Support

If you like this project:

⭐ Star the repo
🐛 Report issues
🚀 Contribute improvements

---

## 📜 License

MIT License

---
