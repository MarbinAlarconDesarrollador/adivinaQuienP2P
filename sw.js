const CACHE_NAME =
    "adivina-p2p-v10";

const urlsToCache = [

    "./",
    "./index.html",
    "./style.css",
    "./app.js"

];

self.addEventListener("install",(event)=>{

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then((cache)=>{

            return cache.addAll(
                urlsToCache
            );

        })

    );

});

self.addEventListener("activate",(event)=>{

    event.waitUntil(

        caches.keys().then((cacheNames)=>{

            return Promise.all(

                cacheNames.map((cache)=>{

                    if(cache !== CACHE_NAME){

                        return caches.delete(cache);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

self.addEventListener("fetch",(event)=>{

    event.respondWith(

        fetch(event.request)
        .catch(()=>{

            return caches.match(
                event.request
            );

        })

    );

});