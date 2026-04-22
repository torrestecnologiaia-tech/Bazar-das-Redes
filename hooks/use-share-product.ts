import { Share, Platform } from 'react-native';

export interface Produto {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  numeroWhatsApp?: string;
}

export function useShareProduct() {
  const shareProduct = async (produto: Produto) => {
    try {
      const message = `🛍️ *${produto.nome}*\n\n💰 Preço: ${produto.preco}\n\n📝 ${produto.descricao}\n\n📱 WhatsApp: ${produto.numeroWhatsApp || 'Disponível no app'}\n\n✨ Confira no Bazar das Redes!`;

      if (Platform.OS === 'web') {
        // Para web, copiar para clipboard
        await navigator.clipboard.writeText(message);
        alert('Anúncio copiado para a área de transferência!');
        return;
      }

      await Share.share({
        message,
        title: `Compartilhar: ${produto.nome}`,
        url: undefined, // Pode adicionar URL da app store aqui
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      throw error;
    }
  };

  const shareViaWhatsApp = (produto: Produto) => {
    const message = `🛍️ *${produto.nome}*\n\n💰 Preço: ${produto.preco}\n\n📝 ${produto.descricao}\n\n✨ Confira no Bazar das Redes!`;
    const encodedMessage = encodeURIComponent(message);
    
    // Abre WhatsApp com a mensagem
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    if (Platform.OS === 'web') {
      window.open(whatsappUrl, '_blank');
    } else {
      // Para mobile, usar deep link
      const deepLink = `whatsapp://send?text=${encodedMessage}`;
      return deepLink;
    }
  };

  return {
    shareProduct,
    shareViaWhatsApp,
  };
}
