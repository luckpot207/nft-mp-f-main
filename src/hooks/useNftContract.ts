import { useContext } from "react";
import { NativeNftContext } from "../context/NativeNftProvider";

const useNativeNftContract = () => {
  return useContext(NativeNftContext);
}

export default useNativeNftContract;