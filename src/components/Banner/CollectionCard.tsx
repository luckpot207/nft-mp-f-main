import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Props {
  title: string
  count: number
  image: string
  contractAddress: string
}

const CollectionCard: React.FC<Props> = ({ title, count, image, contractAddress }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.7,
        delay: 0.15,
      }}>
      <Link to={`/mynft/` + contractAddress} aria-label="Single Project">
        <div
          className="bg-secondary-light cursor-pointer hover:shadow-2xl mb-10 rounded-xl shadow-lg sm:mb-0 flex px-2 ">
          <div>
            <img
              src={image}
              className="h-14 my-3 object-cover rounded-full w-14"
              alt="Single Project"
            />
          </div>
          <div className="pt-4 px-4">
            <p
              className="font-bold font-general-medium mb-1 md:text-sm text-left text-sm">
              {title}
            </p>
            <span className="font-bold text-left text-sm">
              {count} NFTs
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CollectionCard;
