import { Stack } from 'expo-router';
import { ThemeProviderWrapper, ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

function InnerLayout() {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Stack screenOptions={{ headerStyle: { backgroundColor: theme.colors.background } }} />
            <StatusBar style={theme.dark ? 'light' : 'dark'} />
        </>
    );
}

export default function RootLayout() {
    return (
        <ThemeProviderWrapper>
            <InnerLayout />
        </ThemeProviderWrapper>
    );
}
