/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return (
      registry[uri] ||
      new Promise((resolve) => {
        if ("document" in self) {
          const script = document.createElement("script");
          script.src = uri;
          script.onload = resolve;
          document.head.appendChild(script);
        } else {
          nextDefineUri = uri;
          importScripts(uri);
          resolve();
        }
      }).then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri =
      nextDefineUri ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = (depUri) => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require,
    };
    registry[uri] = Promise.all(
      depsNames.map((depName) => specialDeps[depName] || require(depName))
    ).then((deps) => {
      factory(...deps);
      return exports;
    });
  };
}
define(["./workbox-631a4576"], function (workbox) {
  "use strict";

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute(
    "/",
    new workbox.NetworkFirst({
      cacheName: "start-url",
      plugins: [
        {
          cacheWillUpdate: async ({ response: e }) =>
            e && "opaqueredirect" === e.type
              ? new Response(e.body, {
                  status: 200,
                  statusText: "OK",
                  headers: e.headers,
                })
              : e,
        },
      ],
    }),
    "GET"
  );
  workbox.registerRoute(
    /.*/i,
    new workbox.NetworkOnly({
      cacheName: "dev",
      plugins: [],
    }),
    "GET"
  );
});
//# sourceMappingURL=sw.js.map

// const activeTimers = new Map();

// self.addEventListener("push", (event) => {
//   if (!event.data) return;

//   const data = event.data.json();
//   const notificationId = data.data.parkingId || Date.now().toString();

//   // Clear existing timer if any
//   if (activeTimers.has(notificationId)) {
//     clearInterval(activeTimers.get(notificationId));
//   }

//   const startTime = new Date(data.data.startTime).getTime();
//   const endTime = new Date(data.data.endTime).getTime();
//   const now = Date.now();

//   if (isNaN(startTime) || isNaN(endTime) || endTime <= startTime) {
//     console.error("Invalid start or end times:", { startTime, endTime });
//     return;
//   }

//   let timeLeft = endTime - now;

//   if (timeLeft <= 0) {
//     showNotification(
//       "Parking session has ended",
//       data.title,
//       notificationId,
//       data.icon
//     );
//     return;
//   }

//   updateNotification(timeLeft, data, notificationId);

//   const timerId = setInterval(() => {
//     timeLeft = endTime - Date.now();

//     if (timeLeft <= 0) {
//       clearInterval(timerId);
//       activeTimers.delete(notificationId);
//       showNotification(
//         "Parking session has ended",
//         data.title,
//         notificationId,
//         data.icon
//       );
//     } else {
//       updateNotification(timeLeft, data, notificationId);
//     }
//   }, 1000);

//   activeTimers.set(notificationId, timerId);
// });

// function updateNotification(timeLeft, data, notificationId) {
//   const minutes = Math.floor(timeLeft / 60000);
//   const seconds = Math.floor((timeLeft % 60000) / 1000);
//   const timeString = `${minutes}m ${seconds}s`;

//   self.registration.showNotification(data.title, {
//     body: `Time remaining: ${timeString}`,
//     icon: data.icon || "/logo.png",
//     requireInteraction: true,
//     tag: notificationId,
//     data: {
//       startTime: data.data.startTime,
//       endTime: data.data.endTime,
//       notificationId,
//     },
//   });
// }

// function showNotification(body, title, notificationId, icon) {
//   self.registration.showNotification(title, {
//     body,
//     icon: icon || "/logo.png",
//     requireInteraction: false,
//     tag: notificationId,
//   });
// }

// self.addEventListener("notificationclose", (event) => {
//   console.log("Notification closed event detected:", event);

//   const notificationId = event.notification.data?.notificationId;
//   if (notificationId && activeTimers.has(notificationId)) {
//     console.log(`Cleaning up timer for notification ID: ${notificationId}`);
//     clearInterval(activeTimers.get(notificationId));
//     activeTimers.delete(notificationId);
//   } else {
//     console.log("No timer found for the closed notification.");
//   }
// });

// self.addEventListener("activate", () => {
//   console.log("Service worker activated; clearing all active timers.");
//   activeTimers.forEach(clearInterval);
//   activeTimers.clear();
// });

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
