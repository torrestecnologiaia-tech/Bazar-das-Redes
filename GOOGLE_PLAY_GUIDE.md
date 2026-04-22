# Guia de Publicação - Bazar das Redes no Google Play

## 📋 Pré-requisitos

1. **Conta Google Play Developer** - Crie em https://play.google.com/console (taxa única de $25)
2. **Keystore Android** - Certificado para assinar o APK
3. **Expo Account** - Para usar Expo Application Services (EAS Build)

## 🔑 Gerar Keystore (Primeira vez)

```bash
# Gerar keystore
keytool -genkey -v -keystore bazar-das-redes.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias bazar-das-redes-key

# Salvar em local seguro e nunca perder!
```

## 📦 Publicar com EAS Build (Recomendado)

### 1. Instalar EAS CLI
```bash
npm install -g eas-cli
```

### 2. Configurar EAS
```bash
eas build:configure
# Selecionar: Android
```

### 3. Criar APK para Google Play
```bash
eas build --platform android --release
```

### 4. Upload para Google Play
- Acesse https://play.google.com/console
- Selecione "Bazar das Redes"
- Vá para "Releases" → "Production"
- Clique "Create new release"
- Faça upload do APK gerado
- Preencha informações da versão
- Clique "Review and roll out"

## 📝 Informações Necessárias para Google Play

### Descrição do App
```
Bazar das Redes - Sua plataforma de vendas em redes sociais!

Compre e venda produtos diretamente via WhatsApp. 
Busque produtos, salve favoritos e avalie vendedores.

✨ Funcionalidades:
- Busca rápida de produtos
- Favoritos com sincronização
- Avaliações e comentários
- Compartilhamento via WhatsApp
- Modo escuro automático
- Visualização de fotos em tela cheia
```

### Screenshots (Obrigatório)
- Mínimo 2 screenshots
- Máximo 8 screenshots
- Dimensões: 1080x1920 pixels (9:16)

### Ícone do App
- 512x512 pixels
- Sem cantos arredondados
- Arquivo: `assets/images/icon.png`

### Categoria
- **Categoria**: Compras
- **Classificação**: 3+ (PEGI 3)

## ✅ Checklist Antes de Publicar

- [ ] Versão atualizada em `app.config.ts` (versão: "1.0.0")
- [ ] Ícone do app 512x512px em `assets/images/icon.png`
- [ ] Screenshots em 1080x1920px preparados
- [ ] Descrição do app finalizada
- [ ] Política de Privacidade criada
- [ ] Termos de Serviço criados
- [ ] Contato de suporte definido
- [ ] Keystore seguro e backups feitos
- [ ] Testes finais no Android realizados

## 🚀 Aumentar Versão

Sempre que fizer uma nova release:

```bash
# Editar app.config.ts
version: "1.0.1"  // Incrementar versão

# Fazer commit
git add .
git commit -m "Release v1.0.1"
git push github main
```

## 🔒 Segurança

**NUNCA compartilhe:**
- Arquivo `bazar-das-redes.keystore`
- Senha do keystore
- GitHub token (já foi revogado)

## 📞 Suporte

Para dúvidas sobre publicação:
- Documentação Expo: https://docs.expo.dev/build/setup/
- Google Play Console Help: https://support.google.com/googleplay/android-developer

## 📊 Monitoramento Pós-Publicação

Após publicar, monitore:
- Crashes e erros em Google Play Console
- Avaliações e comentários dos usuários
- Estatísticas de download e uso
- Compatibilidade com diferentes dispositivos

---

**Versão do App**: 1.0.0  
**Data**: 22 de Abril de 2026  
**Status**: Pronto para publicação
