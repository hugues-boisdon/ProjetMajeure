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

// Tab functionality
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
  
    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the active class from all tablinks
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
// Event listener for new vehicle form submission
document.getElementById('newVehicleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var newVehicleName = document.getElementById('newVehicleName').value;
    if (newVehicleName) {
      var vehicleSelect = document.getElementById('vehiclechoice');
      var newOption = document.createElement('option');
      newOption.value = newVehicleName;
      newOption.text = newVehicleName;
      vehicleSelect.add(newOption);
      document.getElementById('newVehicleName').value = ''; // Clear the input field
    }
  });
  
  // Event listener for delete vehicle button
  document.getElementById('deleteVehicleButton').addEventListener('click', function() {
    var deleteVehicleChoice = document.getElementById('deleteVehicleChoice').value;
    if (deleteVehicleChoice !== 'none') {
      var vehicleSelect = document.getElementById('deleteVehicleChoice');
      vehicleSelect.remove(vehicleSelect.selectedIndex);
    }
  });
  
  // Event listener for update vehicle selection
  document.getElementById('updateVehicleChoice').addEventListener('change', function(event) {
    var updateVehicleChoice = event.target.value;
    if (updateVehicleChoice !== 'none') {
      document.getElementById('updateVehicleForm').style.display = 'block';
    } else {
      document.getElementById('updateVehicleForm').style.display = 'none';
    }
  });
  
  // Event listener for update vehicle form submission
  document.getElementById('updateVehicleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var updateVehicleChoice = document.getElementById('updateVehicleChoice').value;
    var updateVehicleName = document.getElementById('updateVehicleName').value;
    if (updateVehicleChoice !== 'none' && updateVehicleName) {
      var vehicleSelect = document.getElementById('updateVehicleChoice');
      vehicleSelect.options[vehicleSelect.selectedIndex].text = updateVehicleName;
      vehicleSelect.options[vehicleSelect.selectedIndex].value = updateVehicleName;
      document.getElementById('updateVehicleForm').style.display = 'none';
      document.getElementById('updateVehicleName').value = ''; // Clear the input field
    }
  });

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
  
  // Function to filter vehicles
  function filterVehicles(type) {
    vehicles.forEach(vehicle => {
      if (type === 'all' || vehicle.type === type) {
        vehicle.marker.addTo(map);
      } else {
        map.removeLayer(vehicle.marker);
      }
    });
  }
  
  // Event listener for fire type filter selection
  document.getElementById('fireType').addEventListener