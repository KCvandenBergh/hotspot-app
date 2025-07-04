import { View, Text, Switch } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isDark = theme.dark;

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Dark mode</Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
    );
}
