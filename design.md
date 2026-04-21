# Design - Bazar das Redes

## Visão Geral

Aplicativo mobile para venda de produtos publicados em redes sociais. Interface simples, intuitiva e focada em uma única ação: visualizar produtos e contatar vendedor via WhatsApp.

## Orientação & Usabilidade

- **Orientação**: Portrait (9:16)
- **Uso**: Uma mão
- **Padrão**: Segue Apple Human Interface Guidelines (HIG)

## Paleta de Cores

| Elemento | Cor | Uso |
|----------|-----|-----|
| Primary | #6200EE (Roxo) | Toolbar, botões de ação |
| Success | #2E7D32 (Verde) | Botão "Comprar via WhatsApp" |
| Background | #FFFFFF (Branco) | Fundo geral |
| Surface | #F5F5F5 (Cinza claro) | Cards de produtos |
| Text Primary | #11181C (Preto) | Títulos e nomes |
| Text Secondary | #687076 (Cinza) | Descrições |
| Border | #E5E7EB (Cinza muito claro) | Separadores |

## Telas Principais

### 1. Home Screen (Listagem de Produtos)

**Conteúdo:**
- Toolbar com título "Bazar das Redes"
- RecyclerView/FlatList com cards de produtos
- Cada card exibe: imagem, nome, preço, descrição breve

**Funcionalidade:**
- Scroll vertical para navegar produtos
- Toque em card para expandir/visualizar detalhes (opcional)
- Botão "Comprar via WhatsApp" em cada card

**Layout:**
```
┌─────────────────────────────┐
│ Bazar das Redes             │ ← Toolbar (roxo)
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ [Img] Nome Produto      │ │
│ │       R$ 99,90          │ │ ← Card 1
│ │       Descrição breve   │ │
│ │ [Comprar via WhatsApp]  │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ [Img] Nome Produto 2    │ │
│ │       R$ 49,90          │ │ ← Card 2
│ │       Descrição breve   │ │
│ │ [Comprar via WhatsApp]  │ │
│ └─────────────────────────┘ │
│                             │
│ ... (mais produtos)         │
└─────────────────────────────┘
```

### 2. Fluxo de Compra

**Ação: Usuário toca em "Comprar via WhatsApp"**

1. App abre WhatsApp (se instalado)
2. Pré-preenchido com:
   - Número: +55 11 98828-7407
   - Mensagem: "Olá, tenho interesse no produto: [Nome do Produto]"
3. Usuário confirma e envia

## Estrutura de Dados

### Modelo: Produto

```typescript
interface Produto {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  imagemUrl: string;
  vendedor?: string;
}
```

## Dados Mock (Exemplo)

```typescript
const produtos = [
  {
    id: "1",
    nome: "Bolsa de Couro",
    preco: "R$ 89,90",
    descricao: "Bolsa de couro genuíno, marrom escuro",
    imagemUrl: "https://via.placeholder.com/100"
  },
  {
    id: "2",
    nome: "Óculos de Sol",
    preco: "R$ 59,90",
    descricao: "Óculos UV 400, lentes polarizadas",
    imagemUrl: "https://via.placeholder.com/100"
  },
  // ... mais produtos
];
```

## Navegação

- **Tab Bar**: Apenas uma aba (Home) por enquanto
- **Futuro**: Possibilidade de adicionar abas para Favoritos, Perfil, Configurações

## Considerações Técnicas

1. **Imagens**: Usar URLs de placeholder inicialmente; integrar com backend/Firebase para imagens reais
2. **WhatsApp**: Usar `Linking.openURL()` com deep link `https://wa.me/5511988287407?text=...`
3. **Estado**: AsyncStorage para persistência local (favoritos, histórico)
4. **Performance**: FlatList com otimizações (renderização lazy)

## Próximas Fases

- [ ] Adicionar funcionalidade de Favoritos
- [ ] Integrar com backend para dados dinâmicos
- [ ] Adicionar filtros/busca
- [ ] Perfil do vendedor
- [ ] Histórico de compras
