// Initialize the map
var map = L.map('map').setView([45.75, 4.85], 13); // Coordinates of Lyon

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markers = [];

// Fetch fire data from the API
function fetchFireData() {
    fetch('http://tp.cpe.fr:8081/fire')
        .then(response => response.json())
        .then(data => {
            data.forEach(fire => {
                var marker = L.marker([fire.coordinates.lat, fire.coordinates.lng]);
                marker.bindPopup(
                    `Feu de classe ${fire.type}<br>Intensité: ${fire.intensity}<br>Étendue: ${fire.extent}m²`
                );
                markers.push({ marker: marker, type: fire.type });
                marker.addTo(map);
            });
        });
}

// Function to filter markers
function filterMarkers(type) {
    markers.forEach(item => {
        if (type === 'all' || item.type === type) {
            item.marker.addTo(map);
        } else {
            map.removeLayer(item.marker);
        }
    });
}

// Event listener for filter selection
document.getElementById('fireType').addEventListener('change', function(event) {
    var type = event.target.value;
    filterMarkers(type);
});

// Initial data fetch
fetchFireData();
