import { Flex, Grid, Heading, useColorModeValue } from "@chakra-ui/react";
import { useColor } from "../hooks/useColor";
import { useFontSize } from "../hooks/useFontSize";

export default function NoPage() {
  const tabTextColor = useColorModeValue("black", "brand");
  const color = useColor();

  return (
    <Grid
      as="main"
      padding={{ base: "4", md: "8" }}
      marginX="auto"
      gap="6"
    >
      <Flex padding="4" maxHeight={'xl'} justifyContent={'center'} alignItems='center'>
        <Heading as="figcaption" color={color.mainText} >{404} Not Found Page</Heading>
      </Flex>
    </Grid>
  )
}
