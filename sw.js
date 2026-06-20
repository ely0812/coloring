const CACHE="colorgame-4cfa9116";
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon-180.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){
  var req=e.request;
  if(req.mode==="navigate"){
    e.respondWith(fetch(req).then(function(r){var c=r.clone();caches.open(CACHE).then(function(ca){ca.put(req,c);});return r;}).catch(function(){return caches.match("./index.html").then(function(r){return r||caches.match("./");});}));
    return;
  }
  e.respondWith(caches.match(req).then(function(r){return r||fetch(req);}));
});
