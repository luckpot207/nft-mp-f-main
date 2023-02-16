import { createContext } from 'react';

interface Props {
  isMintPage: boolean
  setIsMintPage: any
  connected: boolean
  setConnected: any
}
export const UserContext = createContext<Props>({
  isMintPage: false,
  setIsMintPage: () => { },
  connected: false,
  setConnected: () => { }
});

interface NftProps {
  nfts: any
  searchNft: any
  setSearchNft: any
  searchProjectsByTitle: any
  selectNft: any
  setSelectNft: any
  selectProjectsByCategory: any
}

export const NftContext = createContext<NftProps>({
  nfts: "",
  searchNft: "",
  setSearchNft: "",
  searchProjectsByTitle: "",
  selectNft: "",
  setSelectNft: "",
  selectProjectsByCategory: ""
})


