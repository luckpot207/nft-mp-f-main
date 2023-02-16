import { Link } from "react-router-dom";
import { Flex, useColorModeValue, Link as ChakraLink, Text, HStack, VStack, IconButton, useColorMode, Button, Show, Menu, MenuButton, MenuList, MenuItem, Hide, MenuDivider, MenuGroup } from "@chakra-ui/react";

const socialLinks = [
  {
    icon: <i className="fa-github fab" />,
    url: "https://github.com/degenpig",
  },
  {
    icon: <i className="fa-twitter fab" />,
    url: "https://twitter.com/",
  },

  {
    icon: <i className="fa-discord fab" />,
    url: "https://discord.gg/",
  },
];

const AppFooter = () => {
  return (
    <Flex
      width="full"
      position="sticky"
      top={0}
      left={0}
      as="footer"
      minHeight="14"
      shadow="xs"
      paddingY="4"
      paddingX="8"
      alignItems="center"
      marginTop='300px'
    >
      <VStack spacing={6} margin='auto'>
        <HStack spacing="10" height="full" as="div">
          {/* Show navlinks for wider screens */}
          <Show above="md">
            {socialLinks.map((link, index) => (
              <Link key={index} to={link.url} target="_blank">
                <ChakraLink fontSize="lg" fontWeight={700}>
                  <i className="md:text-3xl sm:text-2xl text-xl">{link.icon}</i>
                </ChakraLink>
              </Link>
            ))}
          </Show>
        </HStack>
        <HStack as="div" >
          <Text fontSize='1xl' >@2023 MARKETPLACE</Text >
        </HStack>
      </VStack>
    </Flex>
  );
};

export default AppFooter;
