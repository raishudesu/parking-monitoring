self.addEventListener("push", (event) => {
  let notificationData;
  try {
    notificationData = JSON.parse(event.data.text());
  } catch (error) {
    console.error("Error parsing push event data:", error);
    return;
  }

  self.registration.showNotification(notificationData.title, {
    body: notificationData.body,
    icon: notificationData.icon,
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        let focused = false;

        for (const client of clientList) {
          // Match based on the origin (protocol and domain) and pathname
          const url = new URL(client.url);
          if (url.pathname === "/gpo/dashboard" && "focus" in client) {
            client.focus();
            focused = true;
            break;
          }
        }

        // If no matching client is found, open a new window
        if (!focused && clients.openWindow) {
          return clients.openWindow("/gpo/dashboard");
        }
      })
  );
});
