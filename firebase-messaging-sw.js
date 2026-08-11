// 코주부씨앤에프 발주 앱 - 백그라운드 푸시 알림용 서비스워커
// 이 파일은 반드시 index.html과 같은 위치(저장소 루트)에 있어야 합니다.
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAOjSHydYimnS1_vlACoo3_EQDfz_RONV8",
  authDomain: "kojubuorder.firebaseapp.com",
  projectId: "kojubuorder",
  appId: "1:803038701181:web:47613a60667bf610c0f314",
  messagingSenderId: "803038701181",
});

const messaging = firebase.messaging();

// 앱이 꺼져있거나 다른 탭을 보고 있을 때 도착하는 알림을 여기서 처리해요.
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || '코주부씨앤에프';
  const body = (payload.notification && payload.notification.body) || '';
  self.registration.showNotification(title, {
    body: body,
    icon: 'https://img.icons8.com/color/192/shopping-bag.png',
    badge: 'https://img.icons8.com/color/192/shopping-bag.png',
  });
});

// 알림을 탭하면 앱 화면으로 이동
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
