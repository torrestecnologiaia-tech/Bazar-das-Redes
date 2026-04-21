import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "bazar_das_redes_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar favoritos do AsyncStorage ao montar o componente
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Erro ao salvar favoritos:", error);
    }
  };

  const toggleFavorite = (produtoId: string) => {
    const isFavorited = favorites.includes(produtoId);
    const updated = isFavorited
      ? favorites.filter((id) => id !== produtoId)
      : [...favorites, produtoId];
    saveFavorites(updated);
  };

  const isFavorited = (produtoId: string) => {
    return favorites.includes(produtoId);
  };

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorited,
  };
}
