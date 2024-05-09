
        // Initialize the map on the "map" div with a given center and zoom
        let map = L.map('map').setView([40.7826, -73.968285], 13);

        // Load and display a simple tile layer on the map without labels
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(map);

        // Function to add a colored marker to the map
        function addMarker(lat, lon, color) {
            // Define a map from fur colors to available marker icon colors
            let colorMap = {
                'Gray': 'grey',
                'Cinnamon': 'orange',
                'Black': 'black'
            };
            // Default to grey if color not found or not defined
            let markerColor = colorMap[color] || 'grey';
            let icon = new L.Icon({
                iconUrl: `https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-${markerColor}.png`,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
    
            });

            L.marker([lat, lon], {icon: icon}).addTo(map);
        }

        // Fetch data from the API... MAKE SURE TO REPLACE WITH YOUR API ENDPOINT
        fetch('https://data.cityofnewyork.us/resource/vfnx-vebw.json?$query=SELECT%20%60x%60%2C%20%60y%60%2C%20%60primary_fur_color%60%2C%20%60geocoded_column%60')
            .then(function(response) {
                return response.json(); // Parse JSON response
            })
            .then(function(data) {
                // Process each item in the data array
                data.forEach(function(item) {
                    let lat = item.y;
                    let lon = item.x;
                    let furColor = item.primary_fur_color ? item.primary_fur_color.charAt(0).toUpperCase() + item.primary_fur_color.slice(1).toLowerCase() : 'Gray'; // Capitalize first letter
                    addMarker(lat, lon, furColor); // Add colored marker to map
                });
            })
            .catch(function(error) {
                console.error('Error loading data: ' + error);
            });
