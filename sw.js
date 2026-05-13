const CACHE_NAME =
    "adivina-p2p-v11";

const urlsToCache = [

    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./assets/anderson.png",
    "./assets/camilo.png",
    "./assets/carla.png",
    "./assets/carlos.png",
    "./assets/francy.png",
    "./assets/freddy.png",
    "./assets/jaider.png",
    "./assets/jesus.png",
    "./assets/jhoan.png",
    "./assets/jorge.png",
    "./assets/karina.png",
    "./assets/laura.png",
    "./assets/lorena.png",
    "./assets/lucas.png",
    "./assets/lucia.png",
    "./assets/luis.png",
    "./assets/marbin.png",
    "./assets/nuvia.png",
    "./assets/pedro.png",
    "./assets/rafael.png",
    "./assets/valentina.png",
    "./assets/withman.png"
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