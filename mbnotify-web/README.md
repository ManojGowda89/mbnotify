---

# MBNotify

Simple **MQTT based push notification system** for Web apps.

MBNotify allows you to send push notifications to web browsers using **MQTT broker (HiveMQ by default)**.

It consists of two packages:

* **mbnotify** → Server-side package (send notifications)
* **mbnotify-web** → Client-side package (receive notifications)

---

# Architecture

```
Server (Node.js)
      │
      │ sendNotification()
      ▼
MQTT Broker (HiveMQ)
      │
      │ topic:
/{appName}/{deviceToken}/notification
      ▼
Browser (mbnotify-web)
      │
      ▼
Notification API
```

---

# Packages

| Package        | Purpose                          |
| -------------- | -------------------------------- |
| `mbnotify`     | Send notifications from backend  |
| `mbnotify-web` | Receive notifications in browser |

---

# Installation

## Server

```bash
npm install mbnotify
```

## Client

```bash
npm install mbnotify-web
```

---

# Server Usage (mbnotify)

```js
import { sendNotification } from "mbnotify";

await sendNotification({
  appName: "myapp",
  token: "dev_x8sze8zczlcmmt1s1wm",

  title: "Order Shipped 🚚",
  body: "Your order has been shipped!",

  icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",

  url: "https://google.com",

  data: {
    orderId: "12345"
  }
});

console.log("Notification sent");
```

---

# Notification Payload

| Field     | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `appName` | string | App name used as topic namespace |
| `token`   | string | Device token                     |
| `title`   | string | Notification title               |
| `body`    | string | Notification message             |
| `icon`    | string | Notification icon                |
| `image`   | string | Notification image               |
| `url`     | string | URL opened when clicked          |
| `data`    | object | Custom payload                   |

---

# Client Usage (mbnotify-web)

Example React integration.

```jsx
import { useEffect, useState } from "react";
import { requestPermission, getToken } from "mbnotify-web";

export default function App() {

  const [permission, setPermission] = useState("default");
  const [token, setToken] = useState("");

  async function initNotifications() {

    try {

      if (!("Notification" in window)) {
        throw new Error("Browser does not support notifications");
      }

      const perm = await requestPermission();

      setPermission(perm);

      if (perm !== "granted") {
        alert("Notification permission denied");
        return;
      }

      const deviceToken = await getToken("myapp");

      setToken(deviceToken);

      console.log("Device Token:", deviceToken);

    } catch (err) {
      console.error(err);
    }

  }

  useEffect(() => {
    initNotifications();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>

      <h1>MBNotify Web Demo</h1>

      <p>
        <b>Permission:</b> {permission}
      </p>

      <p>
        <b>Device Token:</b>
      </p>

      <textarea
        style={{ width: "100%", height: 80 }}
        value={token}
        readOnly
      />

      <br /><br />

      <button onClick={initNotifications}>
        Request Permission Again
      </button>

    </div>
  );
}
```

---

# Client Functions

## requestPermission()

Requests browser notification permission.

```js
const permission = await requestPermission();
```

Returns:

```
"granted"
"denied"
"default"
```

---

# getToken(appName)

Generates a **unique device token** and connects to MQTT broker.

```js
const token = await getToken("myapp");
```

Example output:

```
dev_x8sze8zczlcmmt1s1wm
```

---

# MQTT Topic Structure

MBNotify automatically uses this topic:

```
/{appName}/{deviceToken}/notification
```

Example

```
/myapp/dev_x8sze8zczlcmmt1s1wm/notification
```

---

# Default MQTT Broker

By default MBNotify uses **HiveMQ public broker**:

```
wss://broker.hivemq.com:8884/mqtt
```

No setup required.

---

# Notification Click Behavior

When user clicks notification:

```
window.open(payload.url)
```

Example:

```
https://google.com
```

---

# Example Flow

1️⃣ User opens website
2️⃣ `requestPermission()` asks for notification permission
3️⃣ `getToken("myapp")` generates device token
4️⃣ Backend sends notification using `sendNotification()`
5️⃣ Browser receives notification instantly

---

# Browser Support

| Browser | Supported |
| ------- | --------- |
| Chrome  | Yes       |
| Edge    | Yes       |
| Firefox | Yes       |
| Safari  | Partial   |

---

# License

MIT

---

# Author

**Manoj Gowda B R**

Full Stack Developer
MERN Stack • JavaScript • Web Systems

---

If you want, I can also make a **🔥 professional npm README (much better)** with:

* badges
* architecture diagram
* npm install badges
* GitHub demo GIF
* React / Next.js / Vanilla examples

That will make **mbnotify look like a serious production package**.
