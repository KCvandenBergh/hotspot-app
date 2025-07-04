import { createContext, useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
    const [theme, setTheme] = useState(DefaultTheme);

    useEffect(() => {
        AsyncStorage.getItem('theme').then((value) => {
            if (value === 'dark') setTheme(DarkTheme);
            else setTheme(DefaultTheme);
        });
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === DarkTheme ? DefaultTheme : DarkTheme;
        setTheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme === DarkTheme ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
