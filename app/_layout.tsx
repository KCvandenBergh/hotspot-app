import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { ThemeProviderWrapper, ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

function InnerLayout() {
    const { theme } = useContext(ThemeContext);

    return (
        <ThemeProvider value={theme}>
            <Stack />
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}

export default function RootLayout() {
    return (
        <ThemeProviderWrapper>
            <InnerLayout />
        </ThemeProviderWrapper>
    );
}
