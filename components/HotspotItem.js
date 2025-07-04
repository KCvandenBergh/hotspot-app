import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function HotspotItem({ item, onPress }) {
    const [isFavorite, setIsFavorite] = useState(false);

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

    return (
        <TouchableOpacity style={styles.item} onPress={onPress} onLongPress={toggleFavorite}>
            <Text style={styles.title}>
                {isFavorite ? '⭐ ' : ''}{item.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
    },
});
