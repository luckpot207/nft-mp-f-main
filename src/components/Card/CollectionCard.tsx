import { Image, Grid, GridItem, VStack, Flex, Box, Button, Text, HStack, Spacer } from "@chakra-ui/react";
import { useColor } from "../../hooks/useColor";
import { useFontSize } from "../../hooks/useFontSize";
import { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { Marketplace } from "../../typechain-types";
import useMarketplaceContract from "../../hooks/useMarketplaceContract";
import { decodeMetadataUri, getIpfsFileUri } from "../../utils/nft";
import { useNavigate } from "react-router-dom";

interface CollectionProps {
    collection: Marketplace.NftCollectionStructOutput
}

export default function Collection({ collection }: CollectionProps) {
    const color = useColor();
    const fs = useFontSize();
    const navigate = useNavigate();
    const [placed, setPlaced] = useState<boolean>(false);

    return (
        <>
            <Grid
                position={'relative'}
                width={'389px'}
                height={'525px'}
                templateRows={'repeat(3, 1fr)'}
                background={placed ? color.disable2 : color.disable1}
                boxShadow={"0px 5px 4px rgba(0, 0, 0, 0.25)"}
                borderRadius={'10px'}
                color={color.mainText}
                padding={'26px'}
            >
                <GridItem
                    rowSpan={2}
                    minHeight={'189px'}
                >
                    <Flex justifyContent={'center'} alignItems={'center'}>
                        {collection.nftsInCollection.length > 0 ? (
                            <Image alt={`${collection.name} NFT Collection - ${collection.description}`} src={getIpfsFileUri(decodeMetadataUri(collection.nftsInCollection[0].metadataUri).image as string)} width="full" />
                        ) : null}
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1}>
                    <Grid width={'100%'} templateColumns={'repeat(2, 1fr)'} fontSize={fs.sm} wordBreak={'break-word'}>
                        <GridItem colSpan={6} wordBreak={'break-word'}>
                            <Text color={color.mainText} fontWeight={'700'}  wordBreak={'break-word'}>
                                {collection.name}
                            </Text>
                            {/* <Text color={color.subText} marginTop={'10px'} fontWeight="500" fontStyle="italic">
                                {collection.author}
                            </Text> */}
                        </GridItem>
                        <GridItem colSpan={6}>
                            <Text color={color.subText} fontSize={fs.xs} fontWeight="500" textAlign={'end'}>
                                Current Bid
                            </Text>
                            <Text color={color.mainText} fontWeight={'700'} textAlign={'end'}>
                                0.005 ETH
                            </Text>
                        </GridItem>
                    </Grid>
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
                            background={placed ? color.disable2 : color.button1}
                            color={placed ? color.logoText2 : color.mainText}
                            fontSize={fs.sm}
                            fontWeight={'500'}
                            onClick={() => {
                                setPlaced((placed) => !placed);
                                navigate(`/collection/${collection.nftContractAddr}`)
                            }}
                        >
                            {
                                placed ? "Placed a bid" : "Place a bid"
                            }
                        </Button>
                    </Flex>
                </GridItem>
            </Grid>
        </>
    )
}