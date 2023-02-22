import { Image, Grid, GridItem, VStack, Flex, Box, Button, Text, HStack, Spacer } from "@chakra-ui/react";
import { useColor } from "../../hooks/useColor";
import { useFontSize } from "../../hooks/useFontSize";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GradientBorder from "../../components/Chakra/GradientBorder";

interface CreatorProps {
  name: string
  img_src: string
  nft: string
  description: string
  handleFollowed: Function
}

export default function Creator({ name, img_src, nft, description, handleFollowed }: CreatorProps) {
  const color = useColor();
  const fs = useFontSize();
  const [followed, touchFollow] = useState<boolean>(false);
  useEffect(() => {
    handleFollowed(!followed)
  }, [followed])

  return (
    <>
      <Grid
        position={'relative'}
        width={'389px'}
        height={'525px'}
        templateRows={'repeat(2, 1fr)'}
        background={followed ? color.disable2 : color.disable1}
        boxShadow={"0px 5px 4px rgba(0, 0, 0, 0.25)"}
        borderRadius={'10px'}
        color={color.mainText}
      >
        <Image
          position={'absolute'}
          top={'216px'}
          left={'145px'}
          width={'99px'}
          height={'99px'}
          src={img_src}
          zIndex={999}
        />
        <GridItem>
          <Image width={'389px'} height={'265px'} src={nft} />
        </GridItem>
        <GridItem>
          <Flex flexDirection={'column'} alignItems={'center'}>
            <Text
              fontSize={fs.sm}
              fontWeight={'700'}
              marginTop={'64px'}
            >
              {name}
            </Text>
            <Text
              marginTop={'10px'}
              fontSize={fs.xs}
              textAlign={'center'}
              color={color.subText}
              paddingX={'40px'}
            >
              {description}
            </Text>
            <Flex
              marginTop={'22px'}
              justifyContent={'center'}
              alignItems={'center'}
              p='2px'
              width='337px'
              height='50px'
              bg={color.button1}
              borderRadius='10px'
            >
              <Button
                width={'100%'}
                height={'100%'}
                borderRadius={'10px'}
                background={followed ? color.disable2 : color.button1}
                color={followed ? color.disableBtnText : color.mainText}
                fontSize={fs.sm}
                fontWeight={'500'}
                onClick={() => { touchFollow((followed) => !followed) }}
              >
                {
                  followed ? "+Followed" : "+Follow"
                }
              </Button>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}