import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { ComponentWithAs, IconProps, useColorModeValue } from '@chakra-ui/react';
import BlackLogo from "../assets/img/pegasus_black.png"
import WhiteLogo from "../assets/img/pegasus_white.png"

interface ColorHookResult {
  changeMode: ComponentWithAs<"svg", IconProps>
  background: string
  menuText: string
  layoutBack: string
}

export const useColor = (): ColorHookResult => {
  const changeMode = useColorModeValue(MoonIcon, SunIcon);
  const background = useColorModeValue('gradient.100', 'gradient.50');
  const menuText = useColorModeValue('mine.100', 'mine.50');
  const layoutBack = useColorModeValue('mine.150', 'mine.150');
  return {
    background,
    changeMode,
    menuText,
    layoutBack,
  };
};