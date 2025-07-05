import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function HotspotItem({ item, onPress }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        AsyncStorage.getItem(`fav-${item.title}`).then((value) => {
            if (value === 'true') setIsFavorite(true);
        });
    }, []);

    const toggleFavorite = async () => {
        const newValue = !isFavorite;
        setIsFavorite(newValue);
        await AsyncStorage.setItem(`fav-${item.title}`, newValue.toString());
    };

    const styles = StyleSheet.create({
        item: {
            padding: 15,
            backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
            borderRadius: 6,
            marginBottom: 10,
        },
        title: {
            fontSize: 16,
            color: isDarkMode ? '#fff' : '#000',
        },
    });

    return (
        <TouchableOpacity style={styles.item} onPress={onPress} onLongPress={toggleFavorite}>
            <Text style={styles.title}>
                {isFavorite ? '⭐ ' : ''}{item.title}
            </Text>
        </TouchableOpacity>
    );
}
