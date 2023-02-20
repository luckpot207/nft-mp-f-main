import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { ComponentWithAs, IconProps, useColorModeValue } from '@chakra-ui/react';
import BlackLogo from "../assets/img/pegasus_black.png"
import WhiteLogo from "../assets/img/pegasus_white.png"

interface ColorHookResult {
  changeMode: ComponentWithAs<"svg", IconProps>
  background: string
  navText: string
  layoutBack: string
  logoText1: string
  logoText2: string
  mainText: string
  subText: string
  button1: string
  button2: string
  button3: string
  disable1: string
  disable2: string
  label: string
  title: string
}

export const useColor = (): ColorHookResult => {
  const changeMode = useColorModeValue(MoonIcon, SunIcon);
  const background = useColorModeValue('gradient.100', 'gradient.50');
  const navText = useColorModeValue('mine.100', 'mine.50');
  const layoutBack = useColorModeValue('mine.200', 'mine.200');
  const logoText1 = useColorModeValue('mine.100', 'mine.50');
  const logoText2 = useColorModeValue('mine.400', 'mine.300');
  const mainText = useColorModeValue('mine.100', 'mine.50');
  const subText = useColorModeValue('mine.150', 'mine.0');
  const button1 = useColorModeValue('gradient.200', 'gradient.50');
  const button2 = useColorModeValue('gradient.300', 'gradient.250');
  const button3 = useColorModeValue('mine.900', 'mine.850');
  const disable1 = useColorModeValue('mine.600', 'mine.500');
  const disable2 = useColorModeValue('mine.700', 'mine.700');
  const label = useColorModeValue('mine.800', 'mine.750');
  const title = useColorModeValue('gradient.400', 'gradient.350');


  return {
    background,
    changeMode,
    navText,
    layoutBack,
    logoText1,
    logoText2,
    mainText,
    subText,
    button1, 
    button2,
    button3,
    disable1,
    disable2,
    label,
    title,
  };
};