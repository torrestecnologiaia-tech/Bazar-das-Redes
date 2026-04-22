import { useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { ScreenContainer } from '@/components/screen-container';
import { cn } from '@/lib/utils';

export default function ImageViewerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const images = Array.isArray(params.images) 
    ? params.images 
    : params.images ? [params.images] : [];
  const initialIndex = parseInt(params.index as string) || 0;
  
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <ScreenContainer 
      edges={['top', 'left', 'right', 'bottom']}
      className="bg-black flex-1"
      containerClassName="bg-black"
    >
      <View className="flex-1 bg-black">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-black border-b border-border">
          <Pressable 
            onPress={() => router.back()}
            className="p-2"
          >
            <Text className="text-primary text-lg font-semibold">← Voltar</Text>
          </Pressable>
          <Text className="text-foreground text-sm font-medium">
            {currentIndex + 1} de {images.length}
          </Text>
          <View className="w-12" />
        </View>

        {/* Imagem Principal */}
        <View 
          className="flex-1 justify-center items-center"
          style={{
            width: screenWidth,
            height: screenHeight - 140,
          }}
        >
          <Image
            source={{ uri: images[currentIndex] as string }}
            style={{
              width: screenWidth,
              height: screenHeight - 140,
              resizeMode: 'contain',
            }}
            contentFit="contain"
          />
        </View>

        {/* Navegação */}
        <View className="flex-row items-center justify-between px-4 py-4 bg-black border-t border-border">
          <Pressable 
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            className={cn(
              "px-6 py-2 rounded-lg",
              currentIndex === 0 
                ? "bg-muted opacity-50" 
                : "bg-primary"
            )}
          >
            <Text className="text-white font-semibold">← Anterior</Text>
          </Pressable>

          <View className="flex-row gap-1">
            {images.map((_, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full",
                  index === currentIndex ? "bg-primary" : "bg-border"
                )}
              />
            ))}
          </View>

          <Pressable 
            onPress={handleNext}
            disabled={currentIndex === images.length - 1}
            className={cn(
              "px-6 py-2 rounded-lg",
              currentIndex === images.length - 1 
                ? "bg-muted opacity-50" 
                : "bg-primary"
            )}
          >
            <Text className="text-white font-semibold">Próximo →</Text>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}
