import { Link } from "react-router-dom";
import { Flex, useColorModeValue, Heading, Link as ChakraLink, Box, HStack, IconButton, useColorMode, Show, Menu, MenuButton, MenuList, MenuItem, Hide, MenuDivider, MenuGroup } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoWalletSharp as WalletOpenIcon } from "react-icons/io5";
import { FaWallet as WalletClosedIcon } from "react-icons/fa";
import { CgMenuGridO as MenuIcon } from "react-icons/cg";
import { useEthConnection } from "../../context/EthConnectionProvider";
import { useColor } from "../../hooks/useColor";
import { useFontSize } from "../../hooks/useFontSize";


const NAV_LINKS = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: "CREATE",
    url: "/create"
  },
  {
    name: "NFT",
    url: "/mint"
  },
  {
    name: "COLLECTIONS",
    url: "/collections"
  },
  {
    name: "FAQ",
    url: "/faq"
  },
  {
    name: "ABOUT",
    url: "/about"
  }
]

const Navbar = () => {
  const color = useColor();
  const fs = useFontSize();
  const ColorModeChangerIcon = useColorModeValue(MoonIcon, SunIcon);
  const { toggleColorMode } = useColorMode();
  const { connectWallet, disconnectWallet, isConnected, progress } = useEthConnection();

  return (
    <Flex
      as="header"
      width="full"
      position="sticky"
      top={0}
      left={0}
      minHeight="14"
      paddingY={'20px'}
      paddingLeft={'80px'}
      paddingRight={'30px'}
      alignItems="center"
      zIndex={5}
      background={color.layoutBack}
      color={color.navText}
      boxShadow='xl' 
      rounded='md' 
      bg='#180a3245'
    >
      <Link to='/'>
        <Flex fontWeight={'700'}>
          <Heading fontSize={fs.smd} color={color.logoText1}>
            NFT
          </Heading>
          <Heading fontSize={fs.smd} color={color.logoText2}>
            MARKETPLACE
          </Heading>
        </Flex>
      </Link>
      <Box marginLeft="auto" fontWeight={'500'}>
        <HStack spacing="10" height="full" as="nav">
          {/* Show navlinks for wider screens */}
          <Show above="md">
            {NAV_LINKS.map((navLink, index) =>
              navLink.url == "/" ? "" :
                (
                  <Link key={index} to={navLink.url}>
                    <ChakraLink fontSize="lg" fontWeight={700}>{navLink.name}</ChakraLink>
                  </Link>
                )
            )}
            <IconButton
              aria-label="Switch theme"
              icon={<ColorModeChangerIcon />}
              isRound
              variant="outline"
              onClick={toggleColorMode}
            />
            <IconButton
              aria-label="Connect Wallet"
              icon={isConnected ?
                <WalletOpenIcon size="20" /> :
                <WalletClosedIcon size="20" />
              }
              isRound={false}
              variant="outline"
              onClick={isConnected ? disconnectWallet : connectWallet}
              isLoading={progress}
            />
          </Show>

          {/* Show menu for smaller screens */}
          <Hide above="md">
            <Menu>
              <MenuButton as={IconButton} aria-label='Navigation menu' icon={<MenuIcon />} isRound />
              <MenuList>
                <MenuGroup title="Wallet">
                  <MenuItem aria-label="Connect wallet" onClick={connectWallet} display="flex" alignItems="center" gap="2" >
                    {isConnected ?
                      <WalletOpenIcon size="20" /> :
                      <WalletClosedIcon size="20" />
                    }
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Links">
                  {NAV_LINKS.map((navLink, index) => (
                    <MenuItem key={index}>
                      <Link to={navLink.url}>
                        {navLink.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Settings">
                  <MenuItem aria-label="Switch theme" onClick={toggleColorMode} display="flex" alignItems="center" gap="2">
                    Switch theme 
                    <ColorModeChangerIcon />
                    </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Hide>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Navbar;
