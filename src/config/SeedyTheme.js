import { DefaultTheme } from "react-native-paper";

const SeedyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4CAF50",
    accent: "#8BC34A", 
    background: "#FFFFFF", 
    text: "#333333",
    danger: "#FF5722",
    chatBubbleBackground: "#DAF7A6",
    chatBubbleText: "#333333",
    chatBubbleTime: "#707070",
    userChatBubbleBackground: "#485e1e",
    userChatBubbleText: "#FFFFFF",
    userChatBubbleTime: "#E5E5E5",
  },
  fonts: {
    default: {
      fontFamily: "Roboto",
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 0,
    },
    displayLarge: {
      fontFamily: "Roboto",
      fontSize: 57,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 64,
    },
    displayMedium: {
      fontFamily: "Roboto",
      fontSize: 45,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 52,
    },
    displaySmall: {
      fontFamily: "Roboto",
      fontSize: 36,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 44,
    },
    headlineSmall: {
      fontFamily: "Roboto",
      fontSize: 24,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 32,
    },
    headlineMedium: {
      fontFamily: "Roboto",
      fontSize: 28,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 36,
    },
    headlineLarge: {
      fontFamily: "Roboto",
      fontSize: 32,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 40,
    },
    titleSmall: {
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    titleMedium: {
      fontFamily: "Roboto",
      fontSize: 16,
      fontWeight: "500",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    titleLarge: {
      fontFamily: "Roboto",
      fontSize: 22,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 28,
    },
    labelSmall: {
      fontFamily: "Roboto",
      fontSize: 11,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelMedium: {
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelLarge: {
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    bodySmall: {
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0.4,
      lineHeight: 16,
    },
    bodyMedium: {
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "400",
      letterSpacing: 0.25,
      lineHeight: 20,
    },
    bodyLarge: {
      fontFamily: "Roboto",
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
  },
};

export default SeedyTheme;
