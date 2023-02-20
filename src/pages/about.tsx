import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useColor } from "../hooks/useColor";
import { useFontSize } from "../hooks/useFontSize";
import { Box, Heading, Input, Text, Flex, Grid, VStack, HStack, GridItem, Button, Spacer, Image } from "@chakra-ui/react";
import Bubble from "../assets/images/about/bubble.png";


export default function About() {
  const color = useColor();
  const fs = useFontSize();
  const navigate = useNavigate();

  return (
    <Box marginTop={'100px'} color={color.mainText}>
      <Flex
        justifyContent={'center'}
      >
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          paddingX={'24px'}
          maxWidth={'500px'}
        >
          <Text
            color={color.mainText}
            fontSize={fs.xl}
          >
            About Us
          </Text>
          <Text
            textAlign={'center'}
            marginTop={'10px'}
            fontSize={fs.sm}
            color={color.subText}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Flex>
      </Flex>
      <Grid
        paddingX={'120px'}
        marginTop={'30px'}
        templateColumns='repeat(2, 1fr)'
      >

        <GridItem
          w='100%'
        >
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Image width={'490px'} height={'600px'} src={Bubble} />
          </Flex>
        </GridItem>
        <GridItem
          w='100%'
          paddingLeft={'180px'}
        >
          <Flex
            flexDirection={'column'}
            paddingY={'90px'}
            paddingX={'24px'}
            maxWidth={'500px'}
          >
            <Text
              color={color.mainText}
              fontSize={fs.md}
            >
              Get Popular NFT
            </Text>
            <Text
              textAlign={'start'}
              marginTop={'10px'}
              fontSize={fs.sm}
              color={color.subText}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  )
}