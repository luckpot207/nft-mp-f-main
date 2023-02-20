import { Link } from "react-router-dom";
import { Grid, GridItem, Flex, Link as ChakraLink, Text, HStack, VStack, Box } from "@chakra-ui/react";
import { useColor } from "../../hooks/useColor";
import { useFontSize } from "../../hooks/useFontSize";


const socialLinks = [
  {
    icon: <i className="fa-github fab" />,
    url: "https://github.com/",
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
  const color = useColor();
  const fs = useFontSize();

  return (
    <Flex
      width="full"
      position={'static'}
      bottom={0}
      left={0}
      as="footer"
      minHeight="14"
      paddingX={'80px'}
      marginY={'100px'}
      flexDirection='column'
      fontSize={fs.xs}
      color={color.mainText}
    >
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        <GridItem w='100%' padding={'24px'}>
          <VStack>
            <Box maxWidth={'288px'}>
              <Flex marginBottom={'20px'}>
                <Text fontSize={fs.sm} color={color.logoText1}>
                  NFT
                </Text>
                <Text fontSize={fs.sm} color={color.logoText2}>
                  MARKETPLACE
                </Text>
              </Flex>
              <Text color={color.subText} wordBreak={'break-word'}>
                The best NFT marketplace websie in the world and feel your experience in selling or buy our work
              </Text>
            </Box>
          </VStack>
        </GridItem>
        <GridItem w='100%' padding={'24px'}>
          <VStack spacing={'20px'} >
            <Text fontSize={fs.sm} fontWeight={'bold'}>
              About
            </Text>
            <a href={'/'}>
              Product
            </a>
            <a href={'/'}>
              Resource
            </a>
            <a href={'/'}>
              Term & Condition
            </a>
            <a href={'/'}>
              FAQ
            </a>
          </VStack>
        </GridItem>
        <GridItem w='100%' padding={'24px'}>
          <VStack spacing={'20px'} >
            <Text fontSize={fs.sm} fontWeight={'bold'}>
              Company
            </Text>
            <a href={'/'}>
              Our Team
            </a>
            <a href={'/'}>
              Partner with us
            </a>
            <a href={'/'}>
              Privacy & Policy
            </a>
            <a href={'/'}>
              Features
            </a>
          </VStack>
        </GridItem>
        <GridItem w='100%' padding={'24px'}>
          <VStack spacing={'20px'} >
            <Text>
              +012 3456789
            </Text>
            <Text>
              adorableprogrammer@gmail.com
            </Text>
            <HStack alignItems={'center'} spacing={'40px'} height="full" as="div">
              {/* Show navlinks for wider screens */}
              {/* <Show above="md"> */}
              {socialLinks.map((link, index) => (
                <Link key={index} to={link.url} target="_blank">
                  <ChakraLink fontSize={fs.sm} fontWeight={500}>
                    <i className="md:text-2xl sm:text-1xl text-lg">{link.icon}</i>
                  </ChakraLink>
                </Link>
              ))}
              {/* </Show> */}
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
      <Flex justifyContent={'center'} marginTop={'100px'}>
        <Flex fontSize={fs.sm} color={color.subText}>
          <Text>
            Created by&nbsp;
          </Text>
          <Text color={color.mainText} fontWeight={'bold'}>Zarror&nbsp;</Text >
          <Text>
            | All Right Reserved!
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppFooter;
