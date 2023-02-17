import { Theme as ThemeBase, extendTheme, theme as themeBase, ColorHues } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  fonts: {
    body: "'Nunito Sans', sans-serif",
    heading: "'Comfortaa', cursive"
  },
  config: {
    initialColorMode: "light"
  },
  colors: {
    brand: {
      50: "#f8c676",
      100: "#f7bd5f",
      200: "#f5b349",
      300: "#f4aa32",
      400: "#f3a01b",
      500: "#db9018",
      600: "#c28016",
      700: "#aa7013",
      800: "#926010",
      900: "#7a500e"
    },
    mine: {
      50: '#181E41',
      100: '#FFFFFF',
      200: '#FFFFFF00'
    },
    gradient: {
      50: 'linear-gradient(113.49deg, #DAFA81 -30.3%, #FAC5D5 58.12%)',
      100: 'linear-gradient(113.49deg, #984D38 -30.3%, #181E41 58.12%)',
    }
  },
  styles: {
    global: (props: any) => ({
      body: {
        backgroundColor: mode("white", "gray.700")(props)
      }
    })
  }
}) as (ThemeBase & {
  colors: (typeof themeBase.colors) & {
    brand: ColorHues,
  }
});

export default theme;
