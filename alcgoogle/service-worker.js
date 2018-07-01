let cacheName = 'weatherPWA-v15';
const exchangeAPIUrlBase = 'https://free.currencyconverterapi.com/api/v5/convert?q=';
let filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/bootstrap.min.js',
  'scripts/jquery-3.3.1.min.js',
  '/styles/style.css',
  '/styles/bootstrap.min.css',
  '/images/icons/exchange.png',
  
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  const dbPromise = createIndexedDB();
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch',  function(e) {
 
  if (e.request.url.startsWith(exchangeAPIUrlBase)) {
    console.log('[ServiceWorker] Fetch from network first', e.request.url);
    return  fetch(e.request);
  }
  else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        console.log('[ServiceWorker] cache first for other requests', e.request.url);
        return response || fetch(e.request);
      })
    );
  }
      
      
   
  
});

function resultToIDB(response)
{

}
/**function createIndexedDB() {
  
  if (!('indexedDB' in self)) {return null;}
  var indexedDB = self.indexedDB = self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
  
 /** return indexedDB.open('exchange', 1,function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains( 'test')) {
      upgradeDb.createObjectStore( 'test', {keyPath:"id"});
    }
  });
  var request = window.indexedDB.open("toDoList", 4);
  request.onupgradeneeded = function(event) {
    var db = event.target.result;
    
    db.onerror = function(event) {
      note.innerHTML += '<li>Erreur du chargement de la base de données.</li>';
    };

    // On ajoute un magasin d'objet à la base de données
    
    var objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });
    
    // définition des index de ce magasin d'objets
    
    objectStore.createIndex("hours", "hours", { unique: false });
    objectStore.createIndex("minutes", "minutes", { unique: false });
    objectStore.createIndex("day", "day", { unique: false });
    objectStore.createIndex("month", "month", { unique: false });
    objectStore.createIndex("year", "year", { unique: false });

    objectStore.createIndex("notified", "notified", { unique: false });
    
    note.innerHTML += '<li>Magasin d\'objet ajouté.</li>';
  };
  
}*/