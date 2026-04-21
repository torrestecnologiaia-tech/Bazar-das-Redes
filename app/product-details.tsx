import { ScrollView, Text, View, TouchableOpacity, Linking, Image, TextInput, FlatList, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useMemo } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { ScreenContainer } from "@/components/screen-container";
import { useReviews, type Review } from "@/hooks/use-reviews";

interface Produto {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  imagemUrl: string;
}

const PRODUTOS_MOCK: Produto[] = [
  {
    id: "1",
    nome: "Bolsa de Couro",
    preco: "R$ 89,90",
    descricao: "Bolsa de couro genuíno, marrom escuro, perfeita para uso diário",
    imagemUrl: "https://via.placeholder.com/100?text=Bolsa",
  },
  {
    id: "2",
    nome: "Óculos de Sol",
    preco: "R$ 59,90",
    descricao: "Óculos UV 400, lentes polarizadas, proteção total",
    imagemUrl: "https://via.placeholder.com/100?text=Óculos",
  },
  {
    id: "3",
    nome: "Cinto de Couro",
    preco: "R$ 45,90",
    descricao: "Cinto de couro legítimo, fivela de metal, tamanho ajustável",
    imagemUrl: "https://via.placeholder.com/100?text=Cinto",
  },
  {
    id: "4",
    nome: "Carteira Slim",
    preco: "R$ 39,90",
    descricao: "Carteira slim em couro, compartimentos para cartões e notas",
    imagemUrl: "https://via.placeholder.com/100?text=Carteira",
  },
  {
    id: "5",
    nome: "Mochila Casual",
    preco: "R$ 129,90",
    descricao: "Mochila de lona resistente, múltiplos compartimentos, alças confortáveis",
    imagemUrl: "https://via.placeholder.com/100?text=Mochila",
  },
  {
    id: "6",
    nome: "Relógio Analógico",
    preco: "R$ 99,90",
    descricao: "Relógio de pulso clássico, pulseira de couro, resistente à água",
    imagemUrl: "https://via.placeholder.com/100?text=Relógio",
  },
];

const WHATSAPP_NUMBER = "5511988287407";

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getProductReviews, getAverageRating, addReview } = useReviews();

  const produto = PRODUTOS_MOCK.find((p) => p.id === id);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  const productReviews = produto ? getProductReviews(produto.id) : [];
  const averageRating = produto ? getAverageRating(produto.id) : 0;

  if (!produto) {
    return (
      <ScreenContainer className="bg-background items-center justify-center">
        <Text className="text-lg font-semibold text-foreground">Produto não encontrado</Text>
      </ScreenContainer>
    );
  }

  const handleComprarWhatsApp = () => {
    const mensagem = `Olá! Tenho interesse no produto: *${produto.nome}* - ${produto.preco}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "WhatsApp não está instalado. Por favor, instale o WhatsApp para continuar.");
    });
  };

  const handleSubmitReview = () => {
    if (!author.trim()) {
      Alert.alert("Erro", "Por favor, digite seu nome");
      return;
    }
    if (rating === 0) {
      Alert.alert("Erro", "Por favor, selecione uma classificação");
      return;
    }
    if (!comment.trim()) {
      Alert.alert("Erro", "Por favor, digite um comentário");
      return;
    }

    addReview({
      produtoId: produto.id,
      rating,
      comment: comment.trim(),
      author: author.trim(),
      date: new Date().toLocaleDateString("pt-BR"),
    });

    Alert.alert("Sucesso", "Sua avaliação foi publicada!");
    setRating(0);
    setComment("");
    setAuthor("");
  };

  const renderReview = ({ item }: { item: Review }) => (
    <View className="mx-4 mb-4 bg-surface rounded-lg p-4 border border-border">
      {/* Cabeçalho da Avaliação */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-1">
          <Text className="text-sm font-bold text-foreground">{item.author}</Text>
          <Text className="text-xs text-muted">{item.date}</Text>
        </View>

        {/* Estrelas */}
        <View className="flex-row gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <MaterialIcons
              key={star}
              name={star <= item.rating ? "star" : "star-outline"}
              size={14}
              color={star <= item.rating ? "#F59E0B" : "#D1D5DB"}
            />
          ))}
        </View>
      </View>

      {/* Comentário */}
      <Text className="text-sm text-foreground leading-relaxed">{item.comment}</Text>
    </View>
  );

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Botão Voltar */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2 px-4 pt-4 pb-2"
        >
          <MaterialIcons name="arrow-back" size={24} color="#0a7ea4" />
          <Text className="text-primary font-semibold">Voltar</Text>
        </TouchableOpacity>

        {/* Imagem do Produto */}
        <View className="px-4 py-4">
          <Image
            source={{ uri: produto.imagemUrl }}
            className="w-full h-48 rounded-lg bg-gray-200"
            resizeMode="cover"
          />
        </View>

        {/* Informações do Produto */}
        <View className="px-4 pb-4">
          <Text className="text-2xl font-bold text-foreground mb-2">{produto.nome}</Text>
          <Text className="text-3xl font-bold text-primary mb-4">{produto.preco}</Text>
          <Text className="text-sm text-muted leading-relaxed mb-4">{produto.descricao}</Text>

          {/* Avaliação Média */}
          <View className="flex-row items-center gap-3 mb-4 bg-surface rounded-lg p-3">
            <View className="flex-row gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <MaterialIcons
                  key={star}
                  name={star <= Math.round(averageRating) ? "star" : "star-outline"}
                  size={18}
                  color={star <= Math.round(averageRating) ? "#F59E0B" : "#D1D5DB"}
                />
              ))}
            </View>
            <Text className="text-sm font-semibold text-foreground">
              {averageRating > 0 ? `${averageRating} (${productReviews.length} avaliações)` : "Sem avaliações"}
            </Text>
          </View>

          {/* Botão Comprar */}
          <TouchableOpacity
            onPress={handleComprarWhatsApp}
            className="bg-success px-4 py-3 rounded-lg flex-row items-center justify-center mb-6"
          >
            <MaterialIcons name="phone" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Comprar via WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Avaliações */}
        <View className="px-4 pb-4">
          <Text className="text-lg font-bold text-foreground mb-4">Deixe sua Avaliação</Text>

          {/* Nome */}
          <TextInput
            placeholder="Seu nome"
            placeholderTextColor="#687076"
            value={author}
            onChangeText={setAuthor}
            className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground mb-3"
          />

          {/* Seleção de Estrelas */}
          <View className="flex-row gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                className="flex-1 items-center py-2 bg-surface rounded-lg border border-border"
                style={{
                  borderColor: rating >= star ? "#F59E0B" : "#E5E7EB",
                  backgroundColor: rating >= star ? "#FEF3C7" : "#F5F5F5",
                }}
              >
                <MaterialIcons
                  name={rating >= star ? "star" : "star-outline"}
                  size={24}
                  color={rating >= star ? "#F59E0B" : "#D1D5DB"}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Comentário */}
          <TextInput
            placeholder="Compartilhe sua opinião sobre este produto..."
            placeholderTextColor="#687076"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground mb-3"
            style={{ textAlignVertical: "top" }}
          />

          {/* Botão Enviar */}
          <TouchableOpacity
            onPress={handleSubmitReview}
            className="bg-primary px-4 py-3 rounded-lg flex-row items-center justify-center mb-6"
          >
            <MaterialIcons name="send" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Publicar Avaliação</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Avaliações */}
        {productReviews.length > 0 && (
          <View className="pb-4">
            <Text className="text-lg font-bold text-foreground px-4 mb-4">
              Avaliações ({productReviews.length})
            </Text>
            <FlatList
              data={productReviews}
              renderItem={renderReview}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {productReviews.length === 0 && comment === "" && (
          <View className="items-center justify-center py-8">
            <MaterialIcons name="rate-review" size={48} color="#687076" />
            <Text className="text-sm text-muted mt-3">Nenhuma avaliação ainda. Seja o primeiro!</Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
