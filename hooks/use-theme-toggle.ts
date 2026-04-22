import { useColorScheme } from './use-color-scheme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'bazar_theme_preference';

export function useThemeToggle() {
  const systemColorScheme = useColorScheme();
  const [userThemePreference, setUserThemePreference] = useState<'light' | 'dark' | 'system' | null>(null);

  // Carregar preferência salva ao iniciar
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        setUserThemePreference(saved as 'light' | 'dark' | 'system');
      }
    } catch (error) {
      console.error('Erro ao carregar preferência de tema:', error);
    }
  };

  const saveThemePreference = async (preference: 'light' | 'dark' | 'system') => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, preference);
      setUserThemePreference(preference);
    } catch (error) {
      console.error('Erro ao salvar preferência de tema:', error);
    }
  };

  const getCurrentTheme = (): 'light' | 'dark' => {
    if (userThemePreference === 'system' || userThemePreference === null) {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return userThemePreference;
  };

  return {
    currentTheme: getCurrentTheme(),
    userThemePreference,
    setThemePreference: saveThemePreference,
  };
}
