import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import HotspotItem from '../components/HotspotItem';

export default function HomeScreen() {
    const [hotspots, setHotspots] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('https://stud.hosted.hr.nl/1028100/locations.json')
            .then((res) => res.json())
            .then((data) => setHotspots(data))
            .catch((error) => console.error('Fout bij ophalen JSON:', error));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 15 }}>🎨 Hotspots in Rotterdam</Text>

            <FlatList
                data={hotspots}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 100 }} // extra ruimte onderaan
                renderItem={({ item }) => (
                    <HotspotItem
                        item={item}
                        onPress={() =>
                            router.push({
                                pathname: '/map',
                                params: {
                                    title: item.title,
                                    lat: item.latitude,
                                    lon: item.longitude,
                                },
                            })
                        }
                    />
                )}
                ListFooterComponent={
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.button} onPress={() => router.push('/map')}>
                            <Text style={styles.buttonText}>🗺️ Open kaart direct</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => router.push('/settings')}>
                            <Text style={styles.buttonText}>⚙️ Ga naar instellingen</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        backgroundColor: '#4e8bed',
        padding: 12,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
