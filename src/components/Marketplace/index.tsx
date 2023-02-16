import Banner from "../Banner";
import NftGrid from "./NftGrid";
import { Flex, useColorModeValue, Heading, Link as ChakraLink, Box, HStack, IconButton, useColorMode, Button, Show, Menu, MenuButton, MenuList, MenuItem, Hide, MenuDivider, MenuGroup } from "@chakra-ui/react";

const Marketplace = () => {
  const backgroundColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    // <Flex className="container mx-auto" background={backgroundColor} color={textColor} width="full" as="div">
    <div className="container mx-auto" >
      <Banner />
      <NftGrid />
    </div>
    // </Flex>
  );
};

export default Marketplace;
