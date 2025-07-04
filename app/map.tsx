import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function MapScreen() {
    const { title, lat, lon } = useLocalSearchParams();
    const [location, setLocation] = useState(null);
    const [hotspots, setHotspots] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            const current = await Location.getCurrentPositionAsync({});
            setLocation(current.coords);

            // Als lat/lon bestaan in de URL: zoom alleen op dat punt
            if (lat && lon) {
                mapRef.current?.animateToRegion({
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } else {
                // Anders: laad alle hotspots
                const res = await fetch('https://stud.hosted.hr.nl/1028100/locations.json');
                const data = await res.json();
                setHotspots(data);

                // Zoom uit zodat alles zichtbaar is
                mapRef.current?.animateToRegion({
                    latitude: current.coords.latitude,
                    longitude: current.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });
            }
        })();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MapView ref={mapRef} style={{ flex: 1 }}>
                {hotspots.map((spot, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
                        title={spot.title}
                        description={spot.description}
                    />
                ))}
                {lat && lon && (
                    <Marker
                        coordinate={{ latitude: parseFloat(lat), longitude: parseFloat(lon) }}
                        title={title}
                    />
                )}
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        pinColor="blue"
                        title="Jij bent hier"
                    />
                )}
            </MapView>
        </View>
    );
}
