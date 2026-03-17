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