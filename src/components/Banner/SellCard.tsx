import React from "react";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { motion } from "framer-motion";
import { Contract, ethers } from "ethers";

import CollectionCard from "./CollectionCard";

import spacekitty_nft from "../../assets/images/nftimgs/spacekitty_nft.png";
import spaceowl_nft from "../../assets/images/nftimgs/spaceowl_nft.png";
import dragondoodle_nft from "../../assets/images/nftimgs/dragondoodle_nft.png";
import doodcat_nft from "../../assets/images/nftimgs/doodcat_nft.png";
import deddood_nft from "../../assets/images/nftimgs/deddood_nft.png";
import royalrat_nft from "../../assets/images/nftimgs/royalrat_nft.png";
import classicalcat_nft from "../../assets/images/nftimgs/classicalcat_nft.png";
import alien_nft from "../../assets/images/nftimgs/alien_nft.png";
import elementowl_nft from "../../assets/images/nftimgs/elementowl_nft.png";
import elementdog_nft from "../../assets/images/nftimgs/elementdog_nft.png";
import elementoctopus_nft from "../../assets/images/nftimgs/elementoctopus_nft.png";
import qaf_nft from "../../assets/images/nftimgs/qaf_nft.png";
import primordialplanet_nft from "../../assets/images/nftimgs/primordialplanet_nft.png";
import badbuddies_nft from "../../assets/images/nftimgs/badbuddies_nft.png";
import badbuddies2_nft from "../../assets/images/nftimgs/badbuddies2_nft.png";
import badbuddies3_nft from "../../assets/images/nftimgs/badbuddies3_nft.png";

import {
  MARKETPLACE_ABI,
  SPACEKITTYNFT_ABI,
  SPACEOWLNFT_ABI,
  DRAGONDOODLENNFT_ABI,
  ELEMENTOWLSNFT_ABI,
  ELEMENTDOGSNFT_ABI,
  ELEMENTTOCTUPUSNFT_ABI,
  QAFNFT_ABI,
  ROYALRATSNFT_ABI,
  CLASSICALCATSSNFT_ABI,
  ALIENSNFT_ABI,
  PLANETSNFT_ABI,
  DOODCATNFT_ABI,
  DEDDOODNFT_ABI
} from "../../utils/abi";

import {
  ANCIENTALIENS_ADDR,
  BADBUDDIES2_ADDR,
  BADBUDDIES3_ADDR,
  BADBUDDIES_ADDR,
  CLASSICALCATS_ADDR,
  DEDNFT_ADDR,
  DOODNFT_ADDR,
  DRAGONDOODLE_ADDR,
  ELEMENTDOGS_ADDR,
  ELEMENTOCTOPUS_ADDR,
  ELEMENTOWLS_ADDR,
  PRIMORDIALPLANETOIDS_ADDR,
  QAF_ADDR,
  ROYALRATS_ADDR,
  SPACEKITTY_ADDR,
  SPACEOWLS_ADDR,
} from "../../utils/config";

const SellCard = () => {
  const { account } = useWeb3React();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = provider.getSigner();

  const [doodcatNftCount, setDoodCatNftCount] = useState(0);
  const [deddoodNftCount, setDedDoodNftCount] = useState(0);
  const [spaceittyNftCount, setSpaceKittyNftCount] = useState(0);
  const [spaceowlNftCount, setSpaceOwlNftCount] = useState(0);
  const [dragondoodleNftCount, setDragondDolldeNftCount] = useState(0);
  const [elementowlsNftCount, setElementowlsNftCount] = useState(0);
  const [elementdogsNftCount, setElementdogsNftCount] = useState(0);
  const [elementoctpusNftCount, setElmentoctpusNftCount] = useState(0);
  const [qafNftCount, setQafNftCount] = useState(0);
  const [royalratsNftCount, setRoyalRatsNftCount] = useState(0);
  const [classicalCatsNftCount, setClassicalCatsNftCount] = useState(0);
  const [ancientAliensNftCount, setAncientAliensNftCount] = useState(0);
  const [planetoidNftCount, setPlanetoidNftCount] = useState(0);
  const [badbuddiesNftCount, setBadbuddiesNftCount] = useState(0);
  const [badbuddies2NftCount, setBadbuddies2NftCount] = useState(0);
  const [badbuddies3NftCount, setBadbuddies3NftCount] = useState(0);

  const DOODCATCONTRACT = new ethers.Contract(
    DOODNFT_ADDR,
    DOODCATNFT_ABI,
    provider
  );

  const DEDDOODCONTRACT = new ethers.Contract(
    DEDNFT_ADDR,
    DEDDOODNFT_ABI,
    provider
  );

  const SPACEKITTYCONTRACT = new ethers.Contract(
    SPACEKITTY_ADDR,
    SPACEKITTYNFT_ABI,
    provider
  );

  const SPACEOWLCONTRACT = new ethers.Contract(
    SPACEOWLS_ADDR,
    SPACEOWLNFT_ABI,
    provider
  );

  const DRAGONDOODLECONTRACT = new ethers.Contract(
    DRAGONDOODLE_ADDR,
    DRAGONDOODLENNFT_ABI,
    provider
  );

  const ELEMENTOWLSCONTRACT = new ethers.Contract(
    ELEMENTOWLS_ADDR,
    ELEMENTOWLSNFT_ABI,
    provider
  );

  const ELEMENTDOGSCONTRACT = new ethers.Contract(
    ELEMENTDOGS_ADDR,
    ELEMENTDOGSNFT_ABI,
    provider
  );
  const ELEMENTOCTOPUSCONTRACT = new ethers.Contract(
    ELEMENTOCTOPUS_ADDR,
    ELEMENTTOCTUPUSNFT_ABI,
    provider
  );
  const QAFCONTRACT = new ethers.Contract(
    QAF_ADDR,
    QAFNFT_ABI,
    provider
  );
  const ROYALRATSCONTRACT = new ethers.Contract(
    ROYALRATS_ADDR,
    ROYALRATSNFT_ABI,
    provider
  );
  const CLASSICALCATSCONTRACT = new ethers.Contract(
    CLASSICALCATS_ADDR,
    CLASSICALCATSSNFT_ABI,
    provider
  );
  const ALIENSCONTRACT = new ethers.Contract(
    ANCIENTALIENS_ADDR,
    ALIENSNFT_ABI,
    provider
  );
  const PLANETOIDSCONTRACT = new ethers.Contract(
    PRIMORDIALPLANETOIDS_ADDR,
    PLANETSNFT_ABI,
    provider
  );
  const BADBUDDIESCONTRACT = new ethers.Contract(
    BADBUDDIES_ADDR,
    SPACEKITTYNFT_ABI,
    provider
  );
  const BADBUDDIES2CONTRACT = new ethers.Contract(
    BADBUDDIES2_ADDR,
    SPACEKITTYNFT_ABI,
    provider
  );

  const BADBUDDIES3CONTRACT = new ethers.Contract(
    BADBUDDIES3_ADDR,
    SPACEKITTYNFT_ABI,
    provider
  );

  const getNFTCount = async () => {
    await DOODCATCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setDoodCatNftCount(data.length);
    });

    await DEDDOODCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setDedDoodNftCount(data.length);
    });

    await SPACEKITTYCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setSpaceKittyNftCount(data.length);
    });

    await SPACEOWLCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setSpaceOwlNftCount(data.length);
    });

    await DRAGONDOODLECONTRACT.walletOfOwner(account).then(async (data: any) => {
      setDragondDolldeNftCount(data.length);
    });

    await ELEMENTOWLSCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setElementowlsNftCount(data.length);
    });

    await ELEMENTDOGSCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setElementdogsNftCount(data.length);
    });

    await ELEMENTOCTOPUSCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setElmentoctpusNftCount(data.length);
    });

    await QAFCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setQafNftCount(data.length);
    });

    await CLASSICALCATSCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setClassicalCatsNftCount(data.length);
    });

    await ROYALRATSCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setRoyalRatsNftCount(data.length);
    });

    await ALIENSCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setAncientAliensNftCount(data.length);
    });

    await PLANETOIDSCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setPlanetoidNftCount(data.length);
    });

    await BADBUDDIESCONTRACT.walletOfOwner(account).then(async (data: any) => {
      setBadbuddiesNftCount(data.length);
    });

    await BADBUDDIES2CONTRACT.walletOfOwner(account).then(async (data: any) => {
      setBadbuddies2NftCount(data.length);
    });

    await BADBUDDIES3CONTRACT.walletOfOwner(account).then(async (data: any) => {
      setBadbuddies3NftCount(data.length);
    });
  };

  useEffect(() => {
    if (account) {
      getNFTCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  return (
    <>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.9,
          delay: 0.1,
        }}
        className="font-general-regular 
                      text-center 
                      text-3xl
                      sm:text-4xl
                      pt-20
                      font-bold
                      sm:mb-20
                      ">
        Selling Collections
      </motion.h1>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: -180 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 mt-6 sm:gap-10 sm:grid-cols-3">
          <CollectionCard
            image={spacekitty_nft}
            title="SpaceKitty"
            count={spaceittyNftCount}
            contractAddress={SPACEKITTY_ADDR}
          />
          <CollectionCard
            image={spaceowl_nft}
            title="SpaceOwls"
            count={spaceowlNftCount}
            contractAddress={SPACEOWLS_ADDR}
          />
          <CollectionCard
            image={dragondoodle_nft}
            title="Dragon Doodles"
            count={dragondoodleNftCount}
            contractAddress={DRAGONDOODLE_ADDR}
          />
          <CollectionCard
            image={doodcat_nft}
            title="DoodCats"
            count={doodcatNftCount}
            contractAddress={DOODNFT_ADDR}
          />
          <CollectionCard
            image={deddood_nft}
            title="DedDoods"
            count={deddoodNftCount}
            contractAddress={DEDNFT_ADDR}
          />
          <CollectionCard
            image={elementowl_nft}
            title="ElementOwls"
            count={elementowlsNftCount}
            contractAddress={ELEMENTOWLS_ADDR}
          />
          <CollectionCard
            image={elementdog_nft}
            title="ElementDogs"
            count={elementdogsNftCount}
            contractAddress={ELEMENTDOGS_ADDR}
          />
          <CollectionCard
            image={elementoctopus_nft}
            title="ElementOctopus"
            count={elementoctpusNftCount}
            contractAddress={ELEMENTOCTOPUS_ADDR}
          />
          <CollectionCard
            image={qaf_nft}
            title="QAF"
            count={qafNftCount}
            contractAddress={QAF_ADDR}
          />

          <CollectionCard
            image={royalrat_nft}
            title="Royal Rats"
            count={royalratsNftCount}
            contractAddress={ROYALRATS_ADDR}
          />
          <CollectionCard
            image={classicalcat_nft}
            title="The Classical Cats"
            count={classicalCatsNftCount}
            contractAddress={CLASSICALCATS_ADDR}
          />
          <CollectionCard
            image={alien_nft}
            title="The Ancient Aliens"
            count={ancientAliensNftCount}
            contractAddress={ANCIENTALIENS_ADDR}
          />

          <CollectionCard
            image={primordialplanet_nft}
            title="The Primordial Planetoids"
            count={planetoidNftCount}
            contractAddress={PRIMORDIALPLANETOIDS_ADDR}
          />

          <CollectionCard
            image={badbuddies_nft}
            title="Bad Buddies"
            count={badbuddiesNftCount}
            contractAddress={BADBUDDIES_ADDR}
          />

          <CollectionCard
            image={badbuddies2_nft}
            title="Bad Buddies2"
            count={badbuddies2NftCount}
            contractAddress={BADBUDDIES2_ADDR}
          />

          <CollectionCard
            image={badbuddies3_nft}
            title="Bad Buddies3"
            count={badbuddies3NftCount}
            contractAddress={BADBUDDIES3_ADDR}
          />
        </motion.div>
      </motion.section>
    </>
  );
};
export default SellCard;
