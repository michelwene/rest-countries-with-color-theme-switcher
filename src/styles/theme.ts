import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    blue: {
      900: "hsl(200, 15%, 8%)",
      800: "hsl(207, 26%, 17%)",
      700: "hsl(209, 23%, 22%)",
    },
    gray: {
      500: "hsl(0, 0%, 52%)",
      50: "hsl(0, 0%, 98%)",
    },
    white: {
      100: "hsl(0, 0%, 100%)",
    },
  },

  fonts: {
    body: "Nunito Sans, sans-serif",
  },
});
