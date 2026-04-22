# 🛍️ Bazar das Redes

Um aplicativo mobile inovador que conecta vendedores e compradores através de redes sociais, com integração WhatsApp e funcionalidades avançadas de busca, favoritos e avaliações.

## ✨ Funcionalidades Principais

### 🏪 Listagem de Produtos
- Visualização em cards com imagem, nome, preço e descrição
- Scroll suave e responsivo
- Carregamento otimizado

### 🔍 Busca Avançada
- Busca em tempo real por nome e descrição
- Filtros instantâneos
- Sugestões inteligentes

### ❤️ Favoritos
- Salvar produtos favoritos localmente
- Persistência com AsyncStorage
- Acesso rápido via aba dedicada

### ⭐ Avaliações e Comentários
- Sistema de estrelas (1-5)
- Comentários dos usuários
- Cálculo automático de média
- Tela dedicada para detalhes

### 📱 Integração WhatsApp
- Botão direto para contato
- Mensagem pré-preenchida
- Número do vendedor configurável

### 🌙 Modo Escuro
- Suporte automático a tema escuro
- Persistência de preferência do usuário
- Cores otimizadas para ambos os temas

### 📷 Visualização de Fotos
- Tela em tela cheia com zoom
- Navegação entre imagens
- Indicador de posição

### 🔗 Compartilhamento
- Compartilhar produtos via WhatsApp
- Suporte a outros apps de compartilhamento
- Mensagem formatada automaticamente

## 🛠️ Stack Tecnológico

- **React Native** 0.81.5
- **Expo** 54
- **TypeScript** 5.9
- **NativeWind** 4 (Tailwind CSS)
- **Expo Router** 6 (Navegação)
- **AsyncStorage** (Persistência local)
- **React Native Reanimated** 4 (Animações)

## 📁 Estrutura do Projeto

```
bazar-das-redes/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Layout das abas
│   │   ├── index.tsx        # Tela Home
│   │   └── favorites.tsx    # Tela de Favoritos
│   ├── product-details.tsx  # Detalhes do produto
│   ├── image-viewer.tsx     # Visualizador de fotos
│   └── _layout.tsx          # Layout raiz
├── components/
│   ├── screen-container.tsx # Wrapper SafeArea
│   ├── themed-view.tsx      # View com tema
│   └── ui/
│       └── icon-symbol.tsx  # Mapeamento de ícones
├── hooks/
│   ├── use-colors.ts        # Hook de cores
│   ├── use-favorites.ts     # Hook de favoritos
│   ├── use-reviews.ts       # Hook de avaliações
│   ├── use-theme-toggle.ts  # Hook de tema
│   └── use-share-product.ts # Hook de compartilhamento
├── lib/
│   ├── utils.ts             # Utilitários (cn)
│   └── theme-provider.tsx   # Provider de tema
├── assets/
│   └── images/
│       ├── icon.png         # Ícone do app
│       ├── splash-icon.png  # Ícone splash
│       └── favicon.png      # Favicon web
└── app.config.ts            # Configuração Expo
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo Go (para testar no celular)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/torrestecnologiaia-tech/Bazar-das-Redes.git
cd bazar-das-redes

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### Testar no Celular

1. Instale o app **Expo Go** no seu celular
2. Escaneie o código QR exibido no terminal
3. O app abrirá automaticamente

### Testar no Web

```bash
# O app já está rodando em http://localhost:8081
```

## 📦 Build para Android

### Com EAS Build (Recomendado)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Fazer login
eas login

# Gerar APK
eas build --platform android --release
```

### Build Local

```bash
# Gerar APK assinado
eas build --platform android --release --local
```

## 📝 Configuração

### Alterar Número WhatsApp

Edite `app/(tabs)/index.tsx`:
```typescript
const WHATSAPP_NUMBER = "5511988287407"; // Altere aqui
```

### Alterar Cores do App

Edite `theme.config.js`:
```javascript
const themeColors = {
  primary: { light: '#0a7ea4', dark: '#0a7ea4' },
  // ... outras cores
};
```

### Alterar Nome do App

Edite `app.config.ts`:
```typescript
const env = {
  appName: "Seu Nome Aqui",
  appSlug: "seu-slug-aqui",
};
```

## 🧪 Testes

```bash
# Verificar TypeScript
npm run check

# Executar linter
npm run lint

# Executar testes
npm run test
```

## 📱 Compatibilidade

- **iOS**: 13+
- **Android**: 7+ (API 24+)
- **Web**: Todos os navegadores modernos

## 🔐 Segurança

- Dados de favoritos armazenados localmente
- Sem transmissão de dados sensíveis
- Integração segura com WhatsApp via deep links

## 📄 Licença

Este projeto é propriedade de Torre Tecnologia IA Tech.

## 👥 Contribuidores

- Desenvolvido por: Manus AI
- Cliente: Torre Tecnologia IA Tech

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 Email: dev@bazardasredes.com
- 🐛 Issues: https://github.com/torrestecnologiaia-tech/Bazar-das-Redes/issues

## 🎯 Roadmap Futuro

- [ ] Notificações push
- [ ] Categorias de produtos
- [ ] Perfil do vendedor
- [ ] Chat interno
- [ ] Geolocalização
- [ ] Integração com Firebase
- [ ] Suporte a múltiplos idiomas
- [ ] Modo offline

---

**Versão**: 1.0.0  
**Última atualização**: 22 de Abril de 2026  
**Status**: ✅ Pronto para Produção
