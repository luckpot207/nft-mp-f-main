import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue, Text } from "@chakra-ui/react";
import { useEthConnection } from "../context/EthConnectionProvider";
import MintBox from "../components/Nft/MintBox";
import BuyBox from "../components/Nft/BuyBox";
import SellBox from "../components/Nft/SellBox";
import { useColor } from "../hooks/useColor";
import { useFontSize } from "../hooks/useFontSize";
import { fontSize } from "@mui/system";

export default function Mint() {
  const color = useColor();
  const fs = useFontSize();
  const tabTextColor = useColorModeValue("black", "brand");
  const { isConnected } = useEthConnection();

  return (
    <Tabs isFitted colorScheme={'blue'} size='lg' alignItems={'center'} color={color.subText}>
      <TabList marginBottom="2" paddingX="16" marginTop="8" fontSize={fs.xl} >
        <Tab _selected={{ color: color.tabText }} minWidth={{ base: "auto", md: "24" }} flexGrow={{ base: 1, md: "unset" }}>
          Mint
        </Tab>
        <Tab _selected={{ color: color.tabText }} minWidth={{ base: "auto", md: "24" }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected}>
          Buy
        </Tab>
        <Tab _selected={{ color: color.tabText }} minWidth={{ base: "auto", md: "24" }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected}>
          Sell
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MintBox />
        </TabPanel>
        <TabPanel>
          <BuyBox />
        </TabPanel>
        <TabPanel>
          <SellBox />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}