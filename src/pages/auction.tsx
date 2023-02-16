import { Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";

export default function Auction() {

  return (
    <Flex padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto" flexDirection={{ base: "column", md: "row" }} flexWrap="nowrap">
      <Flex position="relative" width={{ base: "full", md: "50%" }} height={{ base: "100px", md: "200px" }} padding={{ base: "2", md: "4" }} justifyContent='center' alignItems='end'>
        <Text marginTop={{ base: "4", md: "2" }} textAlign="center" fontSize='2xl'><Link to='/auction/all'>All Auctions</Link></Text>
      </Flex>
      <Flex position="relative" width={{ base: "full", md: "50%" }} height={{ base: "100px", md: "200px" }} padding={{ base: "2", md: "4" }} justifyContent='center' alignItems='end'>
        <Text marginTop={{ base: "4", md: "2" }} textAlign="center" fontSize='2xl'><Link to='/auction/create'>Create Auction</Link></Text>
      </Flex>
    </Flex>
  )
}