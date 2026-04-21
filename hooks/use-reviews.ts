import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Review {
  id: string;
  produtoId: string;
  rating: number; // 1-5 estrelas
  comment: string;
  author: string;
  date: string;
}

const REVIEWS_KEY = "bazar_das_redes_reviews";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar avaliações do AsyncStorage ao montar o componente
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const stored = await AsyncStorage.getItem(REVIEWS_KEY);
      if (stored) {
        setReviews(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveReviews = async (newReviews: Review[]) => {
    try {
      await AsyncStorage.setItem(REVIEWS_KEY, JSON.stringify(newReviews));
      setReviews(newReviews);
    } catch (error) {
      console.error("Erro ao salvar avaliações:", error);
    }
  };

  const addReview = (review: Omit<Review, "id">) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
    };
    const updated = [...reviews, newReview];
    saveReviews(updated);
    return newReview;
  };

  const getProductReviews = (produtoId: string) => {
    return reviews.filter((review) => review.produtoId === produtoId);
  };

  const getAverageRating = (produtoId: string) => {
    const productReviews = getProductReviews(produtoId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / productReviews.length) * 10) / 10;
  };

  const deleteReview = (reviewId: string) => {
    const updated = reviews.filter((review) => review.id !== reviewId);
    saveReviews(updated);
  };

  return {
    reviews,
    isLoading,
    addReview,
    getProductReviews,
    getAverageRating,
    deleteReview,
  };
}
