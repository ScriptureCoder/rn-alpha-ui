import React from 'react';
import { View } from 'react-native';
import { Text } from './src/rn-alpha/default/Text';

// Example component demonstrating the improved adaptive font sizing
const AdaptiveTextExamples = () => {
  return (
    <View style={{ padding: 20 }}>
      {/* Basic adaptive text with default reference width (375px) */}
      <Text 
        adaptiveSize 
        size={16} 
        color="text" 
        style={{ marginBottom: 10 }}
      >
        Adaptive Text (size: 16px, ref: 375px)
      </Text>

      {/* Custom reference width for different design systems */}
      <Text 
        adaptiveSize 
        size={18} 
        referenceWidth={320} // iPhone SE width
        color="text" 
        style={{ marginBottom: 10 }}
      >
        Adaptive Text (size: 18px, ref: 320px)
      </Text>

      {/* With size constraints */}
      <Text 
        adaptiveSize 
        size={20} 
        minSize={14} 
        maxSize={28}
        color="text" 
        style={{ marginBottom: 10 }}
      >
        Adaptive Text (size: 20px, min: 14px, max: 28px)
      </Text>

      {/* Large text for headers */}
      <Text 
        adaptiveSize 
        size={24} 
        weight="Bold"
        color="primary"
        style={{ marginBottom: 10 }}
      >
        Adaptive Header Text
      </Text>

      {/* Small text for captions */}
      <Text 
        adaptiveSize 
        size={12} 
        minSize={10}
        color="text"
        style={{ marginBottom: 10 }}
      >
        Adaptive Caption Text
      </Text>

      {/* Tablet-optimized reference width */}
      <Text 
        adaptiveSize 
        size={16} 
        referenceWidth={768} // iPad width
        color="text"
        style={{ marginBottom: 10 }}
      >
        Tablet-optimized Text
      </Text>
    </View>
  );
};

export default AdaptiveTextExamples;
