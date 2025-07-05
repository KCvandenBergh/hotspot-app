import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState, useContext } from 'react';
import HotspotItem from '../components/HotspotItem';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function HomeScreen() {
    const [hotspots, setHotspots] = useState([]);
    const router = useRouter();
    const { isDarkMode } = useContext(ThemeContext); // ✅ theme

    useEffect(() => {
        fetch('https://stud.hosted.hr.nl/1028100/locations.json')
            .then((res) => res.json())
            .then((data) => setHotspots(data))
            .catch((error) => console.error('Fout bij ophalen JSON:', error));
    }, []);

    const dynamicStyles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: isDarkMode ? '#121212' : '#d4f5dd',
        },
        header: {
            fontSize: 24,
            marginBottom: 15,
            color: isDarkMode ? '#fff' : '#000',
        },
        button: {
            marginTop: 10,
            backgroundColor: isDarkMode ? '#333' : '#4e8bed',
            padding: 12,
            borderRadius: 6,
        },
        buttonText: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 16,
        },
    });

    return (
        <SafeAreaView style={dynamicStyles.container}>
            <Text style={dynamicStyles.header}>🎨 Hotspots in Rotterdam</Text>

            <FlatList
                data={hotspots}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 100 }}
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
                        <TouchableOpacity style={dynamicStyles.button} onPress={() => router.push('/map')}>
                            <Text style={dynamicStyles.buttonText}>🗺️ Open kaart direct</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={dynamicStyles.button} onPress={() => router.push('/settings')}>
                            <Text style={dynamicStyles.buttonText}>⚙️ Ga naar instellingen</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
