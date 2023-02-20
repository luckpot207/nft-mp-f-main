import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useColor } from "../hooks/useColor";
import { useFontSize } from "../hooks/useFontSize";
import { Box, Heading, Input, Text, Flex } from "@chakra-ui/react";

export default function Faq() {
  const color = useColor();
  const fs = useFontSize();
  const navigate = useNavigate();

  return (
    <Flex marginTop={'100px'} justifyContent={'center'}>
      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        paddingX={'24px'}
        maxWidth={'500px'}
      >
        <Text
        color={color.mainText}
          fontSize={fs.xl}
          textAlign={'center'}
        >
          Frenquently Asked Question
        </Text>
        <Text
          textAlign={'center'}
          marginTop={'10px'}
          fontSize={fs.sm}
          color={color.subText}
        >
          Wanna Ask Something?
        </Text>
        <Box
          marginTop={'30px'}
        >
          
        </Box>
      </Flex>
    </Flex>
  )
}