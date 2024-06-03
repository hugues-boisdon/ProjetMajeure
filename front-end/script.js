// Variables Declaration
let map

// Leaflet map Initialisation to #map div
map = L.map('map').setView([51.505, -0.09], 13); // London Map (for initial testing)


// Leaflet event functions
function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}


// Leaflet event to event functions pairing
map.on('click', onMapClick);