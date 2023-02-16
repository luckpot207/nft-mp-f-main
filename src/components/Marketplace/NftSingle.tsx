import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SDOODTOKEN_ADDR, CARETOKEN_ADDR } from "../../utils/config";

interface Props {
  title: any
  price: any
  image: any
  priceAsset: any
  tokenId: any
  category: any
  contractAddress: any
}

const NftSingle: React.FC<Props> = ({
  title,
  price,
  image,
  priceAsset,
  tokenId,
  category,
  contractAddress
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.7,
        delay: 0.15,
      }}>
      <Link
        to={`/buy/` + contractAddress + `/` + tokenId}
        aria-label="Single Project">
        <div
          className="bg-secondary-light cursor-pointer dark:bg-ternary-dark
                        hover:shadow-xl mb-10 rounded-xl shadow-lg sm:mb-0 m-1">
          <div>
            <img
              src={image}
              className="2xl:h-72 h-36 lg:h-44 md:h-48 object-cover rounded-t-xl sm:h-62 w-full xl:h-56"
              alt="Single Project"
            />
          </div>
          <div className="px-4 py-2">
            <p
              className="dark:text-white font-bold font-general-medium mb-2
                            md:text-sm text-left text-sm text-ternary-dark">
              {title}
            </p>
            <span className="dark:text-white font-bold text- text-left text-ternary-dark">
              Price : {price}{" "}
              {priceAsset === SDOODTOKEN_ADDR
                ? "sDOOD"
                : priceAsset === CARETOKEN_ADDR
                  ? "CARE"
                  : "SGB"}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default NftSingle;
