import { FlatList, Text, View, TouchableOpacity, Linking, Image } from "react-native";
import { useState, useMemo } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { ScreenContainer } from "@/components/screen-container";
import { useFavorites } from "@/hooks/use-favorites";

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

export default function FavoritesScreen() {
  const [produtos] = useState<Produto[]>(PRODUTOS_MOCK);
  const { favorites, isFavorited, toggleFavorite } = useFavorites();

  // Filtrar apenas produtos favoritados
  const produtosFavoritados = useMemo(() => {
    return produtos.filter((produto) => favorites.includes(produto.id));
  }, [produtos, favorites]);

  const handleComprarWhatsApp = (produto: Produto) => {
    const mensagem = `Olá! Tenho interesse no produto: *${produto.nome}* - ${produto.preco}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url).catch(() => {
      alert("WhatsApp não está instalado. Por favor, instale o WhatsApp para continuar.");
    });
  };

  const renderProduto = ({ item }: { item: Produto }) => {
    const isFav = isFavorited(item.id);

    return (
      <View className="mx-4 mb-4 bg-surface rounded-2xl overflow-hidden border border-border shadow-sm">
        <View className="flex-row p-4 gap-3">
          {/* Imagem */}
          <Image
            source={{ uri: item.imagemUrl }}
            className="w-20 h-20 rounded-lg bg-gray-200"
            resizeMode="cover"
          />

          {/* Conteúdo */}
          <View className="flex-1">
            {/* Nome e Botão de Favorito */}
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-base font-bold text-foreground flex-1" numberOfLines={1}>
                {item.nome}
              </Text>
              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
              >
                <MaterialIcons
                  name={isFav ? "favorite" : "favorite-border"}
                  size={20}
                  color={isFav ? "#2E7D32" : "#687076"}
                />
              </TouchableOpacity>
            </View>

            {/* Preço */}
            <Text className="text-lg font-bold text-primary mb-2">{item.preco}</Text>

            {/* Descrição */}
            <Text className="text-xs text-muted mb-3" numberOfLines={2}>
              {item.descricao}
            </Text>

            {/* Botão WhatsApp */}
            <TouchableOpacity
              onPress={() => handleComprarWhatsApp(item)}
              className="bg-success px-3 py-2 rounded-lg flex-row items-center justify-center active:opacity-70"
            >
              <Text className="text-white text-xs font-semibold">Comprar via WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      {/* Título */}
      <View className="px-4 pt-4 pb-3">
        <Text className="text-2xl font-bold text-foreground">Meus Favoritos</Text>
        <Text className="text-sm text-muted mt-1">
          {produtosFavoritados.length} produto{produtosFavoritados.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Lista de Produtos Favoritados */}
      {produtosFavoritados.length > 0 ? (
        <FlatList
          data={produtosFavoritados}
          renderItem={renderProduto}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 0, paddingBottom: 16 }}
          scrollEnabled={true}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-4">
          <MaterialIcons name="favorite-border" size={64} color="#687076" />
          <Text className="text-lg font-semibold text-foreground mt-4 mb-2">
            Nenhum favorito ainda
          </Text>
          <Text className="text-sm text-muted text-center">
            Adicione produtos à sua lista de favoritos para acessá-los rapidamente
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}
