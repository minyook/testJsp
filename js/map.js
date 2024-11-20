((g) => {
    var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
    b = b[c] || (b[c] = {});
    var d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = () =>
        h || (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g)
                e.set(k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()), g[k]);
            e.set("callback", c + ".maps." + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => (h = n(Error(p + " could not load.")));
            a.nonce = m.querySelector("script[nonce]")?.nonce || "";
            m.head.append(a);
        }));
    d[l] ? console.warn(p + " only loads once. Ignoring:", g) : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
    key: "AIzaSyCWtoNxnoKfGqkJEeFEzpGCOvrzSRYIGfI",
    v: "weekly",
});

// Initialize and add the map
let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const defaultPosition = { lat: 36.5, lng: 127.5 }; // 대한민국 중심 좌표

    map = new Map(document.getElementById("map"), {
        zoom: 7,
        center: defaultPosition,
        mapId: "DEMO_MAP_ID",
    });

    let marker;

    map.addListener("click", (event) => {
        const clickedLatLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

        if (marker) {
            marker.setMap(null);
        }

        marker = new AdvancedMarkerElement({
            map: map,
            position: clickedLatLng,
            title: "선택된 위치",
        });

        localStorage.setItem("clickedLocation", JSON.stringify(clickedLatLng));
        console.log("Location saved to local storage:", clickedLatLng);

        document.getElementById('next-button').style.display = 'block';
    });
}

document.getElementById('next-button').style.display = 'none';

initMap();

document.getElementById('next-button').addEventListener('click', function() {
    window.location.href = 'main-info.html';
});
