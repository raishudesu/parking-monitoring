import { clientsClaim } from "workbox-core";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, NetworkOnly } from "workbox-strategies";

// Workbox setup
clientsClaim();

registerRoute("/", new NetworkFirst({ cacheName: "start-url" }));

registerRoute(/.*/i, new NetworkOnly({ cacheName: "dev" }));

// Custom push notification handling
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
    });
  }
});

// Custom notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("/gpo/dashboard") && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow("/gpo/dashboard");
    })
  );
});
