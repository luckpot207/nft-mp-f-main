import { Link } from "react-router-dom";
import { Flex, useColorModeValue, Heading, Link as ChakraLink, Box, HStack, IconButton, useColorMode, Button, Show, Menu, MenuButton, MenuList, MenuItem, Hide, MenuDivider, MenuGroup } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoWalletSharp as WalletOpenIcon } from "react-icons/io5";
import { FaWallet as WalletClosedIcon } from "react-icons/fa";
import { CgMenuGridO as MenuIcon } from "react-icons/cg";
import { useEthConnection } from "../../context/EthConnectionProvider";

const NAV_LINKS = [
  {
    name: "Collections",
    url: "/collections"
  },
  {
    name: "Create",
    url: "/create"
  },
  {
    name: "Auction",
    url: "/auction"
  },
  {
    name: "Mint",
    url: "/mint"
  }
]

const Navbar = () => {
  const backgroundColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");
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
      shadow="lg"
      paddingY="4"
      paddingX="8"
      alignItems="center"
      zIndex={99999}
      background={backgroundColor}
      color={textColor}
    >
      <Link to='/'>
        <Heading size="lg">NFT MARKETPLACE</Heading>
      </Link>
      <Box marginLeft="auto">
        <HStack spacing="10" height="full" as="nav">

          {/* Show navlinks for wider screens */}
          <Show above="md">
            {NAV_LINKS.map((navLink, index) => (
              <Link key={index} to={navLink.url}>
                <ChakraLink fontSize="lg" fontWeight={700}>{navLink.name}</ChakraLink>
              </Link>
            ))}
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
                  <MenuItem aria-label="Switch theme" onClick={toggleColorMode} display="flex" alignItems="center" gap="2">Switch theme <ColorModeChangerIcon /></MenuItem>
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
