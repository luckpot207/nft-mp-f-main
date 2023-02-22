
import { useState, useEffect } from "react";
import { Image, Grid, GridItem, VStack, Flex, Box, Button, Text, HStack, Spacer } from "@chakra-ui/react";
import { useColor } from "../hooks/useColor";
import { useFontSize } from "../hooks/useFontSize";
import Hurricane from "../assets/images/client/hurricane.jpg";
import Sphere from "../assets/images/client/sphere.png";
import Camera from "../assets/images/client/camera.png";
import Diamond from "../assets/images/client/diamond.png";
import Brain from "../assets/images/client/brain.png";
import Rabbit from "../assets/images/client/rabbit.jpg";
import Man from "../assets/images/client/man.png";
import Blockchain_logo from "../assets/images/landing/blockchain.io_logo.png";
import Binance_logo from "../assets/images/landing/binance_logo.png";
import Ethereum_logo from "../assets/images/landing/ethereum_logo.png";
import Creator from "../components/Card/Creator";
import Creator1 from "../assets/images/landing/creator1.png";
import Creator2 from "../assets/images/landing/creator2.png";
import Creator3 from "../assets/images/landing/creator3.png";
import NFT1 from "../assets/images/landing/topnft1.png";
import NFT2 from "../assets/images/landing/topnft2.png";
import NFT3 from "../assets/images/landing/topnft3.png";

export default function Home() {
  const color = useColor();
  const fs = useFontSize();
  const [followed1, setFollowed1] = useState<boolean>(false);
  const [followed2, setFollowed2] = useState<boolean>(false);
  const [followed3, setFollowed3] = useState<boolean>(false);

  return (
    <VStack
      spacing={'150px'}
      marginTop={'100px'}
      color={color.mainText}
    >
      <Grid
        paddingX={'120px'}
        templateColumns='repeat(2, 1fr)'
      >
        <GridItem
          w='100%'
          paddingRight={'180px'}
        >
          <Flex
            height={'100%'}
            justifyContent={'start'}
            alignItems={'center'}
          >
            <Flex
              flexDirection={'column'}
            >
              <Text
                fontSize={fs.xxl}
                fontFamily={'Poppins'}
                fontWeight={'700'}
                lineHeight={'120%'}
              >
                Create, Sell & Collect Your Own Creative NFT
              </Text>
              <Text
                marginTop={'10px'}
                color={color.subText}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nunc vulputate libero et velit.
              </Text>
              <Flex
                alignItems={'center'}
                marginTop={'30px'}
              >
                <Button
                  background={color.button1}
                  borderRadius={'10px'}
                >
                  Explore Now
                </Button>
                <Button
                  background={color.disable1}
                  borderRadius={'10px'}
                  marginLeft={'20px'}
                >
                  Sell NFT
                </Button>
              </Flex>
              <Flex
                flexDirection={'row'}
                marginTop={'40px'}
              >
                <Flex
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <Text
                    fontSize={fs.md}
                  >
                    37k+
                  </Text>
                  <Text
                    fontSize={fs.sm}
                    color={color.subText}
                  >
                    Artworks
                  </Text>
                </Flex>
                <Spacer />
                <Flex
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <Text
                    fontSize={fs.md}
                  >
                    20k+
                  </Text>
                  <Text
                    fontSize={fs.sm}
                    color={color.subText}
                  >
                    Artists
                  </Text>
                </Flex>
                <Spacer />
                <Flex
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <Text
                    fontSize={fs.md}
                  >
                    99k+
                  </Text>
                  <Text
                    fontSize={fs.sm}
                    color={color.subText}
                  >
                    Aucations
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem
          w='100%'
        >
          <Flex
            justifyContent={'end'}
          >
            <HStack spacing={'15px'}>
              <VStack spacing={'15px'}>
                <Image width={'187px'} height={'140px'} borderRadius={'10px'} src={Hurricane} />
                <Image width={'187px'} height={'220px'} borderRadius={'10px'} src={Sphere} />
                <Image width={'187px'} height={'127px'} borderRadius={'10px'} src={Camera} />
              </VStack>
              <VStack spacing={'10px'}>
                <Image width={'187px'} height={'108px'} borderRadius={'10px'} marginBottom={'5px'} src={Diamond} />
                <Image width={'187px'} height={'220px'} borderRadius={'10px'} src={Brain} />
                <Image width={'187px'} height={'150px'} borderRadius={'10px'} src={Rabbit} />
              </VStack>
              <Box>
                <Image width={'187px'} height={'412px'} borderRadius={'10px'} src={Man} />
              </Box>
            </HStack>
          </Flex>
        </GridItem>
      </Grid>
      <HStack
        paddingX={'125px'}
        spacing={'155px'}
      >
        <a href="binance.com">
          <Image src={Binance_logo} />
        </a>
        <a href="ethereum.com">
          <Image src={Ethereum_logo} />
        </a>
        <a href="blockchain.io">
          <Image src={Blockchain_logo} />
        </a>
      </HStack>
      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        paddingX={'24px'}
        maxWidth={'500px'}
      >
        <Text
          fontSize={fs.xl}
        >
          Featured Artworks
        </Text>
        <Text
          textAlign={'center'}
          marginTop={'10px'}
          fontSize={fs.sm}
          color={color.subText}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Box
          marginTop={'30px'}
        >

        </Box>
      </Flex>
      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        paddingX={'24px'}
        maxWidth={'500px'}
      >
        <Text
          fontSize={fs.xl}
        >
          Top Creator
        </Text>
        <Text
          textAlign={'center'}
          marginTop={'10px'}
          fontSize={fs.sm}
          color={color.subText}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <HStack
          marginTop={'30px'}
          spacing={'15px'}
        >
          <Creator
            img_src={Creator1}
            name="Jhon Stick"
            nft={NFT1}
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            handleFollowed={setFollowed1}
          />
          <Creator
            img_src={Creator2}
            name="Jhon Stick"
            nft={NFT2}
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            handleFollowed={setFollowed2}
          />
          <Creator
            img_src={Creator3}
            name="Jhon Stick"
            nft={NFT3}
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            handleFollowed={setFollowed3}
          />
        </HStack>
      </Flex>
    </VStack>
  )
}