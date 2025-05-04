
import { useState, useEffect } from 'react';
import { useImmersiveMode } from './useImmersiveMode';
import { useTheme } from './use-theme';

export type ContentMood = 'romantic' | 'energetic' | 'relaxed' | 'mysterious' | 'intense';
export type UserMood = 'excited' | 'calm' | 'curious' | 'focused' | 'distracted';
export type AmbientEffect = 'subtle' | 'moderate' | 'immersive' | 'intense' | 'custom';

interface AIEnhancedImmersionOptions {
  enableMoodDetection?: boolean;
  enableBiometricIntegration?: boolean;
  defaultContentMood?: ContentMood;
  defaultUserMood?: UserMood;
  defaultAmbientEffect?: AmbientEffect;
  userPreferences?: {
    colorIntensity?: number;
    soundLevel?: number;
    hapticsIntensity?: number;
    enableAdvancedEffects?: boolean;
  };
}

interface BiometricData {
  heartRate?: number;
  respirationRate?: number;
  skinConductance?: number;
  lastUpdated: number;
}

export const useAIEnhancedImmersion = (options: AIEnhancedImmersionOptions = {}) => {
  const {
    enableMoodDetection = true,
    enableBiometricIntegration = false,
    defaultContentMood = 'mysterious',
    defaultUserMood = 'curious',
    defaultAmbientEffect = 'moderate',
    userPreferences = {
      colorIntensity: 0.7,
      soundLevel: 0.5,
      hapticsIntensity: 0.5,
      enableAdvancedEffects: false
    }
  } = options;

  const { isImmersive, interactWithContent } = useImmersiveMode();
  const { theme } = useTheme();
  
  const [contentMood, setContentMood] = useState<ContentMood>(defaultContentMood);
  const [userMood, setUserMood] = useState<UserMood>(defaultUserMood);
  const [ambientEffect, setAmbientEffect] = useState<AmbientEffect>(defaultAmbientEffect);
  const [biometricData, setBiometricData] = useState<BiometricData>({ lastUpdated: 0 });
  const [adaptationLevel, setAdaptationLevel] = useState(0);
  const [isAdaptationActive, setIsAdaptationActive] = useState(true);
  
  // Simulated AI detection of content mood based on content analysis
  const detectContentMood = (content: any): ContentMood => {
    // In a real implementation, this would analyze content features, colors, audio, etc.
    if (!content) return defaultContentMood;
    
    // Simple simulation based on content title or properties
    const contentString = typeof content === 'string' ? 
      content : 
      JSON.stringify(content).toLowerCase();
    
    if (contentString.includes('romantic') || contentString.includes('intimate') || contentString.includes('soirée')) {
      return 'romantic';
    } else if (contentString.includes('energetic') || contentString.includes('party') || contentString.includes('dance')) {
      return 'energetic';
    } else if (contentString.includes('relaxed') || contentString.includes('calm') || contentString.includes('spa')) {
      return 'relaxed';
    } else if (contentString.includes('mysterious') || contentString.includes('secret')) {
      return 'mysterious';
    } else if (contentString.includes('intense') || contentString.includes('extreme')) {
      return 'intense';
    }
    
    // Default or random mood if no specific keywords are found
    const moods: ContentMood[] = ['romantic', 'energetic', 'relaxed', 'mysterious', 'intense'];
    return moods[Math.floor(Math.random() * moods.length)];
  };
  
  // Analyze user behavior to estimate mood
  const analyzeUserBehavior = (interactions: any): UserMood => {
    // In a real implementation, this would use ML to analyze user patterns
    // For now we just return the default or simulate changes
    return defaultUserMood;
  };
  
  // Connect to wearable devices for biometric data
  const connectBiometricDevice = async () => {
    if (!enableBiometricIntegration) return false;
    
    try {
      // This is a placeholder for real device connection logic
      // In reality, this would use Web Bluetooth API or a native bridge
      console.log('Attempting to connect to biometric device...');
      
      // Simulate successful connection after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate receiving biometric data
      const intervalId = setInterval(() => {
        setBiometricData({
          heartRate: 60 + Math.floor(Math.random() * 40), // 60-100 bpm
          respirationRate: 12 + Math.floor(Math.random() * 8), // 12-20 breaths/min
          skinConductance: Math.random() * 10, // arbitrary units
          lastUpdated: Date.now()
        });
      }, 5000);
      
      // Clean up on unmount
      return () => clearInterval(intervalId);
    } catch (error) {
      console.error('Failed to connect to biometric device:', error);
      return false;
    }
  };
  
  // Calculate optimal ambient effects based on content, user mood and preferences
  const calculateOptimalEffects = (): Record<string, any> => {
    const baseIntensity = userPreferences.colorIntensity || 0.7;
    const isDark = theme === 'dark';
    
    // Calculate color scheme based on content mood
    let colorScheme = {
      primary: '',
      secondary: '',
      accent: '',
      background: ''
    };
    
    switch (contentMood) {
      case 'romantic':
        colorScheme = {
          primary: isDark ? 'rgba(255, 105, 180, 0.8)' : 'rgba(255, 105, 180, 0.9)',
          secondary: isDark ? 'rgba(147, 112, 219, 0.7)' : 'rgba(147, 112, 219, 0.8)',
          accent: isDark ? 'rgba(255, 182, 193, 0.9)' : 'rgba(255, 182, 193, 1)',
          background: isDark 
            ? `linear-gradient(135deg, rgba(40,10,20,${baseIntensity}) 0%, rgba(90,30,40,${baseIntensity * 0.9}) 100%)`
            : `linear-gradient(135deg, rgba(255,240,245,${baseIntensity}) 0%, rgba(255,228,225,${baseIntensity * 0.9}) 100%)`
        };
        break;
      case 'energetic':
        colorScheme = {
          primary: isDark ? 'rgba(255, 165, 0, 0.8)' : 'rgba(255, 165, 0, 0.9)',
          secondary: isDark ? 'rgba(255, 69, 0, 0.7)' : 'rgba(255, 69, 0, 0.8)',
          accent: isDark ? 'rgba(255, 215, 0, 0.9)' : 'rgba(255, 215, 0, 1)',
          background: isDark 
            ? `linear-gradient(135deg, rgba(50,20,0,${baseIntensity}) 0%, rgba(100,30,0,${baseIntensity * 0.9}) 100%)`
            : `linear-gradient(135deg, rgba(255,248,220,${baseIntensity}) 0%, rgba(255,228,196,${baseIntensity * 0.9}) 100%)`
        };
        break;
      case 'relaxed':
        colorScheme = {
          primary: isDark ? 'rgba(135, 206, 235, 0.8)' : 'rgba(135, 206, 235, 0.9)',
          secondary: isDark ? 'rgba(173, 216, 230, 0.7)' : 'rgba(173, 216, 230, 0.8)',
          accent: isDark ? 'rgba(176, 224, 230, 0.9)' : 'rgba(176, 224, 230, 1)',
          background: isDark 
            ? `linear-gradient(135deg, rgba(0,40,60,${baseIntensity}) 0%, rgba(20,60,80,${baseIntensity * 0.9}) 100%)`
            : `linear-gradient(135deg, rgba(240,248,255,${baseIntensity}) 0%, rgba(240,255,255,${baseIntensity * 0.9}) 100%)`
        };
        break;
      case 'mysterious':
        colorScheme = {
          primary: isDark ? 'rgba(138, 43, 226, 0.8)' : 'rgba(138, 43, 226, 0.9)',
          secondary: isDark ? 'rgba(75, 0, 130, 0.7)' : 'rgba(75, 0, 130, 0.8)',
          accent: isDark ? 'rgba(230, 230, 250, 0.9)' : 'rgba(230, 230, 250, 1)',
          background: isDark 
            ? `linear-gradient(135deg, rgba(30,20,40,${baseIntensity}) 0%, rgba(50,30,70,${baseIntensity * 0.9}) 100%)`
            : `linear-gradient(135deg, rgba(248,240,255,${baseIntensity}) 0%, rgba(245,245,255,${baseIntensity * 0.9}) 100%)`
        };
        break;
      case 'intense':
        colorScheme = {
          primary: isDark ? 'rgba(220, 20, 60, 0.8)' : 'rgba(220, 20, 60, 0.9)',
          secondary: isDark ? 'rgba(178, 34, 34, 0.7)' : 'rgba(178, 34, 34, 0.8)',
          accent: isDark ? 'rgba(255, 0, 0, 0.9)' : 'rgba(255, 0, 0, 1)',
          background: isDark 
            ? `linear-gradient(135deg, rgba(50,0,0,${baseIntensity}) 0%, rgba(80,10,10,${baseIntensity * 0.9}) 100%)`
            : `linear-gradient(135deg, rgba(255,240,240,${baseIntensity}) 0%, rgba(255,228,228,${baseIntensity * 0.9}) 100%)`
        };
        break;
      default:
        colorScheme = {
          primary: isDark ? 'rgba(147, 112, 219, 0.8)' : 'rgba(147, 112, 219, 0.9)',
          secondary: isDark ? 'rgba(138, 43, 226, 0.7)' : 'rgba(138, 43, 226, 0.8)',
          accent: isDark ? 'rgba(230, 230, 250, 0.9)' : 'rgba(230, 230, 250, 1)',
          background: isDark 
            ? `linear-gradient(135deg, rgba(20,30,48,${baseIntensity}) 0%, rgba(36,59,85,${baseIntensity * 0.9}) 100%)`
            : `linear-gradient(135deg, rgba(245,245,255,${baseIntensity}) 0%, rgba(240,248,255,${baseIntensity * 0.9}) 100%)`
        };
    }
    
    // Adjust based on user mood
    let vibrationPattern = [];
    let soundProfile = {};
    
    switch(userMood) {
      case 'excited':
        // Enhance colors for excited users
        colorScheme.primary = increaseColorIntensity(colorScheme.primary, 0.2);
        vibrationPattern = [50, 30, 50, 100, 50];
        soundProfile = { 
          baseFrequency: 440, 
          volume: userPreferences.soundLevel * 1.2,
          pattern: 'upbeat'
        };
        break;
      case 'calm':
        // Soften colors for calm users
        colorScheme.primary = decreaseColorIntensity(colorScheme.primary, 0.2);
        vibrationPattern = [20, 80, 20];
        soundProfile = {
          baseFrequency: 320,
          volume: userPreferences.soundLevel * 0.7,
          pattern: 'smooth'
        };
        break;
      case 'curious':
        // Standard colors with slight variation
        vibrationPattern = [30, 40, 50];
        soundProfile = {
          baseFrequency: 380,
          volume: userPreferences.soundLevel,
          pattern: 'varied'
        };
        break;
      default:
        vibrationPattern = [40];
        soundProfile = {
          baseFrequency: 380,
          volume: userPreferences.soundLevel,
          pattern: 'standard'
        };
    }
    
    // Add biometric adjustment if available
    if (biometricData.heartRate && enableBiometricIntegration) {
      const hrvFactor = biometricData.heartRate > 80 ? 0.2 : -0.1;
      colorScheme.primary = adjustColorBrightness(colorScheme.primary, hrvFactor);
      
      // Adjust vibration based on heart rate
      if (biometricData.heartRate > 90) {
        vibrationPattern = vibrationPattern.map(v => Math.floor(v * 0.7)); // Reduce intensity
      }
    }
    
    // Return final calculated effects
    return {
      colorScheme,
      vibrationPattern,
      soundProfile,
      adaptationLevel: Math.min(adaptationLevel + 0.1, 1.0), // Gradually increase adaptation
      effectIntensity: userPreferences.enableAdvancedEffects ? 'high' : 'medium'
    };
  };
  
  // Utility function to increase color intensity
  const increaseColorIntensity = (color: string, factor: number): string => {
    // Simple implementation - in reality would use proper color manipulation
    if (color.includes('rgba')) {
      return color.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/, (match, r, g, b, a) => {
        const newAlpha = Math.min(parseFloat(a) + factor, 1);
        return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
      });
    }
    return color;
  };
  
  // Utility function to decrease color intensity
  const decreaseColorIntensity = (color: string, factor: number): string => {
    // Simple implementation - in reality would use proper color manipulation
    if (color.includes('rgba')) {
      return color.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/, (match, r, g, b, a) => {
        const newAlpha = Math.max(parseFloat(a) - factor, 0.1);
        return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
      });
    }
    return color;
  };
  
  // Utility function to adjust color brightness
  const adjustColorBrightness = (color: string, factor: number): string => {
    // Simple implementation - in reality would use proper color manipulation
    if (color.includes('rgba')) {
      return color.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/, (match, r, g, b, a) => {
        const newR = Math.min(Math.max(parseInt(r) + factor * 50, 0), 255);
        const newG = Math.min(Math.max(parseInt(g) + factor * 50, 0), 255);
        const newB = Math.min(Math.max(parseInt(b) + factor * 50, 0), 255);
        return `rgba(${newR}, ${newG}, ${newB}, ${a})`;
      });
    }
    return color;
  };
  
  // Update content mood when content changes
  const updateContentMood = (content: any) => {
    if (!enableMoodDetection || !content) return;
    const detectedMood = detectContentMood(content);
    setContentMood(detectedMood);
  };
  
  // Update user mood based on interaction patterns
  const updateUserMood = (interactionData: any) => {
    if (!enableMoodDetection) return;
    const analyzedMood = analyzeUserBehavior(interactionData);
    setUserMood(analyzedMood);
  };
  
  // Connect to biometric device on first activation
  useEffect(() => {
    if (isImmersive && enableBiometricIntegration) {
      connectBiometricDevice();
    }
  }, [isImmersive, enableBiometricIntegration]);
  
  // Reset adaptation level when exiting immersive mode
  useEffect(() => {
    if (!isImmersive) {
      setAdaptationLevel(0);
    }
  }, [isImmersive]);
  
  return {
    contentMood,
    userMood,
    biometricData,
    ambientEffect,
    isAdaptationActive,
    updateContentMood,
    updateUserMood,
    setAmbientEffect,
    setIsAdaptationActive,
    toggleAdaptation: () => setIsAdaptationActive(prev => !prev),
    calculateOptimalEffects,
    // Configuration setters
    setUserPreferences: (newPrefs: any) => {
      userPreferences = { ...userPreferences, ...newPrefs };
    }
  };
};
