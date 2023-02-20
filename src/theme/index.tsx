import { Theme as ThemeBase, extendTheme, theme as themeBase, ColorHues } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  fonts: {
    body: "'Nunito Sans', sans-serif",
    heading: "'Comfortaa', cursive",

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
      0: '#63393b80',
      50: '#63393b',
      100: '#FFFFFF',
      150: '#FFFFFF70',
      200: '#FFFFFF00',
      300: '#28B498',
      350: '#6e0077',
      400: '#B75CFF',
      500: '#FFFFFFA1',
      600: '#FFFFFF1A',
      700: '#8B8EA0',
      750: '#555555',
      800: '#2675EB',
      850: '#FF75FF',
      900: '#0075FF',
      950: '#e6911f',

    },
    gradient: {
      50: 'linear-gradient(113.49deg, #DAFA81 -30.3%, #FAC5D5 58.12%)',
      100: 'linear-gradient(113.49deg, #984D38 -30.3%, #181E41 58.12%)',
      150: 'linear-gradient(214.02deg, #105CFF 6.04%, #D11AE4 92.95%)',
      200: 'linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)',
      250: 'linear-gradient(214.02deg, #26664A 6.04%, #9AF20B 92.95%)',
      300: 'linear-gradient(214.02deg, #E6664A 6.04%, #DA620B 92.95%)',
      350: 'linear-gradient(180deg, #F8E329 0%, rgba(235, 144, 38, 0.5) 100%)',
      400: 'linear(to-b, #7928CA, #FF0080)',
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
