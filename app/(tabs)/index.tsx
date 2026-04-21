import { FlatList, Text, View, TouchableOpacity, Linking, Image, TextInput } from "react-native";
import { useState, useMemo } from "react";

import { ScreenContainer } from "@/components/screen-container";

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

export default function HomeScreen() {
  const [produtos] = useState<Produto[]>(PRODUTOS_MOCK);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrar produtos baseado na busca
  const produtosFiltrados = useMemo(() => {
    if (!searchQuery.trim()) {
      return produtos;
    }
    return produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [produtos, searchQuery]);

  const handleComprarWhatsApp = (produto: Produto) => {
    const mensagem = `Olá! Tenho interesse no produto: *${produto.nome}* - ${produto.preco}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url).catch(() => {
      alert("WhatsApp não está instalado. Por favor, instale o WhatsApp para continuar.");
    });
  };

  const renderProduto = ({ item }: { item: Produto }) => (
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
          {/* Nome */}
          <Text className="text-base font-bold text-foreground mb-1" numberOfLines={1}>
            {item.nome}
          </Text>

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

  return (
    <ScreenContainer className="bg-background">
      {/* Campo de Busca */}
      <View className="px-4 pt-4 pb-3">
        <TextInput
          placeholder="Buscar produtos..."
          placeholderTextColor="#687076"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
        />
      </View>

      {/* Lista de Produtos */}
      {produtosFiltrados.length > 0 ? (
        <FlatList
          data={produtosFiltrados}
          renderItem={renderProduto}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 0, paddingBottom: 16 }}
          scrollEnabled={true}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-lg font-semibold text-foreground mb-2">Nenhum produto encontrado</Text>
          <Text className="text-sm text-muted text-center">
            Tente buscar por outro nome
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}
