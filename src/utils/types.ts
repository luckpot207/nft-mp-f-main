export interface NftData {
  itemId: number;
  nftName: string;
  nftImgUrl: string;
  nftContract: any;
  priceAsset: any;
  tokenId: number;
  seller: any;
  buyer: any;
  price: string;
  listedTime: number;
  isSold: any;
}

export interface Rarity {
  trait_type: string
  value: number
}

export interface Nft {
  title: string;
  category: any;
  img: string;
  id: any
}

export interface NftToken {
  imgUrl: string
  tokenId: string
}