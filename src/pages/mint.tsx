import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react";
import { useEthConnection } from "../context/EthConnectionProvider";
import MintBox from "../components/Nft/MintBox";
import BuyBox from "../components/Nft/BuyBox";
import SellBox from "../components/Nft/SellBox";

export default function Mint() {

  const tabTextColor = useColorModeValue("black", "brand");
  const { isConnected } = useEthConnection();

  return (
    <Tabs colorScheme={tabTextColor}>
      <TabList marginBottom="2" paddingX="16" marginTop="8">
        <Tab minWidth={{ base: "auto", md: "24" }} flexGrow={{ base: 1, md: "unset" }}>Mint</Tab>
        <Tab minWidth={{ base: "auto", md: "24" }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected}>Buy</Tab>
        <Tab minWidth={{ base: "auto", md: "24" }} flexGrow={{ base: 1, md: "unset" }} isDisabled={!isConnected}>Sell</Tab>
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