
---

# 🚀 MBNotify

A simple **foreground push notification system** for Web & Mobile apps built using the **MQTT protocol** with the **HiveMQ public broker**.

---

## 📦 Packages

| Package        | Purpose                        |
| -------------- | ------------------------------ |
| `mbnotify`     | Send notifications (Server)    |
| `mbnotify-app` | Receive notifications (Mobile) |
| `mbnotify-web` | Receive notifications (Web)    |

---

## 📥 Installation

### Server

```bash
npm install mbnotify
```

### Mobile (Expo / React Native)

```bash
npm install mbnotify-app
npx expo install expo-notifications
```

### Web

```bash
npm install mbnotify-web
```

---

## ⚡ Send Notification (Server)

```js
import { sendNotification } from "mbnotify";

await sendNotification({
  appName: "myapp",
  token: "dev_xxxxxxxxx",

  title: "Order Shipped 🚚",
  body: "Your order has been shipped!",

  icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",

  url: "https://google.com",

  data: {
    orderId: "12345"
  }
});
```

---

## 📱 Mobile Usage (Expo)

```js
import { useEffect } from "react";
import { requestPermission, getToken } from "mbnotify-app";

export default function App() {

  useEffect(() => {
    async function init() {

      const granted = await requestPermission();
      if (!granted) return;

      const token = await getToken("myapp");
      console.log("Device Token:", token);
    }

    init();
  }, []);

  return null;
}
```

---

## 🌐 Web Usage

```js
import { useEffect } from "react";
import { requestPermission, getToken } from "mbnotify-web";

export default function App() {

  useEffect(() => {
    async function init() {

      const permission = await requestPermission();
      if (permission !== "granted") return;

      const token = await getToken("myapp");
      console.log("Device Token:", token);
    }

    init();
  }, []);

  return null;
}
```

---

## 🧾 Payload

| Field   | Type   |
| ------- | ------ |
| appName | string |
| token   | string |
| title   | string |
| body    | string |
| icon    | string |
| image   | string |
| url     | string |
| data    | object |

---

## 🔥 Features

* ⚡ Foreground notifications
* 📡 MQTT-based communication
* 🌍 Uses HiveMQ public broker
* 📱 Works on Web & Mobile
* 🔗 Supports deep linking via URL

---

## 👨‍💻 Author

**Manoj Gowda B R**
Full Stack Developer (MERN)

---

## 📜 License

MIT

---
