import { sendNotification } from "mbnotify";

await sendNotification({
  appName: "myapp",
  token: "dev_pg8e8cx064bmmui8tvu",

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