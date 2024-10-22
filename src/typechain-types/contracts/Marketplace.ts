/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";
import { StringLiteralLike } from "typescript";

export declare namespace Marketplace {
  export type AuctionDataStruct = {
    author: PromiseOrValue<string>;
    auctionAddr: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
    tokenUri: PromiseOrValue<string>;
    highestBidder: PromiseOrValue<string>;
    highestBid: PromiseOrValue<BigNumberish>;
    endTime: PromiseOrValue<BigNumberish>;
    isActive: PromiseOrValue<boolean>;
  };

  export type AuctionDataStructOutput = [
    string,
    string,
    BigNumber,
    string,
    string,
    BigNumber,
    BigNumber,
    boolean
  ] & {
    author: string;
    auctionAddr: string;
    tokenId: BigNumber;
    tokenUri: string;
    highestBidder: string;
    highestBid: BigNumber;
    endTime: BigNumber;
    isActive: boolean;
  };

  export type NftStruct = {
    tokenId: PromiseOrValue<BigNumberish>;
    metadataUri: PromiseOrValue<string>;
    owner: PromiseOrValue<string>;
    price: PromiseOrValue<BigNumberish>;
  };

  export type NftStructOutput = [BigNumber, string, string, BigNumber] & {
    tokenId: BigNumber;
    metadataUri: string;
    owner: string;
    price: BigNumber;
  };

  export type NftCollectionStruct = {
    name: PromiseOrValue<string>;
    symbol: PromiseOrValue<string>;
    description: PromiseOrValue<string>;
    author: PromiseOrValue<string>;
    nftContractAddr: PromiseOrValue<string>;
    nftsInCollection: Marketplace.NftStruct[];
  };

  export type NftCollectionStructOutput = [
    string,
    string,
    string,
    string,
    string,
    Marketplace.NftStructOutput[]
  ] & {
    name: string;
    symbol: string;
    description: string;
    author: string;
    nftContractAddr: string;
    nftsInCollection: Marketplace.NftStructOutput[];
  };

  export type UserDataStructure = {
    username: string;
    sc_address: string;
    image_src: string;
    discord: string;
    facebook: string;
    instagram: string;
  };
}

export interface MarketplaceInterface extends utils.Interface {
  functions: {
    "auctionContractImplementation()": FunctionFragment;
    "createAuctionContract(string,string,string)": FunctionFragment;
    "createNftContract(string,string,string)": FunctionFragment;
    "getAllAuctions()": FunctionFragment;
    "getAllNftCollections()": FunctionFragment;
    "getNftCollectionsWhereTokensOnSale()": FunctionFragment;
    "getNftsCollectionsAuthored()": FunctionFragment;
    "getNftsCollectionsWhereOwnerOwnsTokens()": FunctionFragment;
    "nativeNftContractAddr()": FunctionFragment;
    "nftContractImplementation()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "auctionContractImplementation"
      | "createAuctionContract"
      | "createNftContract"
      | "getAllAuctions"
      | "getAllNftCollections"
      | "getNftCollectionsWhereTokensOnSale"
      | "getNftsCollectionsAuthored"
      | "getNftsCollectionsWhereOwnerOwnsTokens"
      | "nativeNftContractAddr"
      | "nftContractImplementation"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "auctionContractImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createAuctionContract",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createNftContract",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllAuctions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAllNftCollections",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNftCollectionsWhereTokensOnSale",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNftsCollectionsAuthored",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNftsCollectionsWhereOwnerOwnsTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nativeNftContractAddr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nftContractImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "auctionContractImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAuctionContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createNftContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllAuctions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllNftCollections",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftCollectionsWhereTokensOnSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftsCollectionsAuthored",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftsCollectionsWhereOwnerOwnsTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nativeNftContractAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nftContractImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "AuctionContractCreated(address,address)": EventFragment;
    "CommissionReceivedByMarketplace(uint256)": EventFragment;
    "NftBought(address,uint256,address,uint256)": EventFragment;
    "NftContractCreated(address,address)": EventFragment;
    "NftMinted(address,uint256,address,string)": EventFragment;
    "NftOnSale(address,uint256,uint256)": EventFragment;
    "NftSaleCancel(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuctionContractCreated"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "CommissionReceivedByMarketplace"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NftBought"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NftContractCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NftMinted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NftOnSale"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NftSaleCancel"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface AuctionContractCreatedEventObject {
  contractAddr: string;
  author: string;
}
export type AuctionContractCreatedEvent = TypedEvent<
  [string, string],
  AuctionContractCreatedEventObject
>;

export type AuctionContractCreatedEventFilter =
  TypedEventFilter<AuctionContractCreatedEvent>;

export interface CommissionReceivedByMarketplaceEventObject {
  commission: BigNumber;
}
export type CommissionReceivedByMarketplaceEvent = TypedEvent<
  [BigNumber],
  CommissionReceivedByMarketplaceEventObject
>;

export type CommissionReceivedByMarketplaceEventFilter =
  TypedEventFilter<CommissionReceivedByMarketplaceEvent>;

export interface NftBoughtEventObject {
  nftContractAddress: string;
  tokenId: BigNumber;
  boughtBy: string;
  price: BigNumber;
}
export type NftBoughtEvent = TypedEvent<
  [string, BigNumber, string, BigNumber],
  NftBoughtEventObject
>;

export type NftBoughtEventFilter = TypedEventFilter<NftBoughtEvent>;

export interface NftContractCreatedEventObject {
  contractAddr: string;
  author: string;
}
export type NftContractCreatedEvent = TypedEvent<
  [string, string],
  NftContractCreatedEventObject
>;

export type NftContractCreatedEventFilter =
  TypedEventFilter<NftContractCreatedEvent>;

export interface NftMintedEventObject {
  nftContractAddress: string;
  tokenId: BigNumber;
  mintedTo: string;
  tokenUri: string;
}
export type NftMintedEvent = TypedEvent<
  [string, BigNumber, string, string],
  NftMintedEventObject
>;

export type NftMintedEventFilter = TypedEventFilter<NftMintedEvent>;

export interface NftOnSaleEventObject {
  nftContractAddress: string;
  tokenId: BigNumber;
  price: BigNumber;
}
export type NftOnSaleEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  NftOnSaleEventObject
>;

export type NftOnSaleEventFilter = TypedEventFilter<NftOnSaleEvent>;

export interface NftSaleCancelEventObject {
  nftContractAddress: string;
  tokenId: BigNumber;
}
export type NftSaleCancelEvent = TypedEvent<
  [string, BigNumber],
  NftSaleCancelEventObject
>;

export type NftSaleCancelEventFilter = TypedEventFilter<NftSaleCancelEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface Marketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarketplaceInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    auctionContractImplementation(overrides?: CallOverrides): Promise<[string]>;

    createAuctionContract(
      _nftContract: PromiseOrValue<string>,
      _nftId: PromiseOrValue<string>,
      _startingBid: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createNftContract(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAllAuctions(
      overrides?: CallOverrides
    ): Promise<[Marketplace.AuctionDataStructOutput[]]>;

    getAllNftCollections(
      overrides?: CallOverrides
    ): Promise<[Marketplace.NftCollectionStructOutput[]]>;

    getNftCollectionsWhereTokensOnSale(
      overrides?: CallOverrides
    ): Promise<[Marketplace.NftCollectionStructOutput[]]>;

    getNftsCollectionsAuthored(
      overrides?: CallOverrides
    ): Promise<[Marketplace.NftCollectionStructOutput[]]>;

    getNftsCollectionsWhereOwnerOwnsTokens(
      overrides?: CallOverrides
    ): Promise<[Marketplace.NftCollectionStructOutput[]]>;

    nativeNftContractAddr(overrides?: CallOverrides): Promise<[string]>;

    nftContractImplementation(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  auctionContractImplementation(overrides?: CallOverrides): Promise<string>;

  createAuctionContract(
    _nftContract: PromiseOrValue<string>,
    _nftId: PromiseOrValue<string>,
    _startingBid: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createNftContract(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _description: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAllAuctions(
    overrides?: CallOverrides
  ): Promise<Marketplace.AuctionDataStructOutput[]>;

  getAllNftCollections(
    overrides?: CallOverrides
  ): Promise<Marketplace.NftCollectionStructOutput[]>;

  getNftCollectionsWhereTokensOnSale(
    overrides?: CallOverrides
  ): Promise<Marketplace.NftCollectionStructOutput[]>;

  getNftsCollectionsAuthored(
    overrides?: CallOverrides
  ): Promise<Marketplace.NftCollectionStructOutput[]>;

  getNftsCollectionsWhereOwnerOwnsTokens(
    overrides?: CallOverrides
  ): Promise<Marketplace.NftCollectionStructOutput[]>;

  nativeNftContractAddr(overrides?: CallOverrides): Promise<string>;

  nftContractImplementation(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    auctionContractImplementation(overrides?: CallOverrides): Promise<string>;

    createAuctionContract(
      _nftContract: PromiseOrValue<string>,
      _nftId: PromiseOrValue<string>,
      _startingBid: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    createNftContract(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAllAuctions(
      overrides?: CallOverrides
    ): Promise<Marketplace.AuctionDataStructOutput[]>;

    getAllNftCollections(
      overrides?: CallOverrides
    ): Promise<Marketplace.NftCollectionStructOutput[]>;

    getNftCollectionsWhereTokensOnSale(
      overrides?: CallOverrides
    ): Promise<Marketplace.NftCollectionStructOutput[]>;

    getNftsCollectionsAuthored(
      overrides?: CallOverrides
    ): Promise<Marketplace.NftCollectionStructOutput[]>;

    getNftsCollectionsWhereOwnerOwnsTokens(
      overrides?: CallOverrides
    ): Promise<Marketplace.NftCollectionStructOutput[]>;

    nativeNftContractAddr(overrides?: CallOverrides): Promise<string>;

    nftContractImplementation(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AuctionContractCreated(address,address)"(
      contractAddr?: PromiseOrValue<string> | null,
      author?: PromiseOrValue<string> | null
    ): AuctionContractCreatedEventFilter;
    AuctionContractCreated(
      contractAddr?: PromiseOrValue<string> | null,
      author?: PromiseOrValue<string> | null
    ): AuctionContractCreatedEventFilter;

    "CommissionReceivedByMarketplace(uint256)"(
      commission?: null
    ): CommissionReceivedByMarketplaceEventFilter;
    CommissionReceivedByMarketplace(
      commission?: null
    ): CommissionReceivedByMarketplaceEventFilter;

    "NftBought(address,uint256,address,uint256)"(
      nftContractAddress?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      boughtBy?: null,
      price?: null
    ): NftBoughtEventFilter;
    NftBought(
      nftContractAddress?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      boughtBy?: null,
      price?: null
    ): NftBoughtEventFilter;

    "NftContractCreated(address,address)"(
      contractAddr?: PromiseOrValue<string> | null,
      author?: PromiseOrValue<string> | null
    ): NftContractCreatedEventFilter;
    NftContractCreated(
      contractAddr?: PromiseOrValue<string> | null,
      author?: PromiseOrValue<string> | null
    ): NftContractCreatedEventFilter;

    "NftMinted(address,uint256,address,string)"(
      nftContractAddress?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      mintedTo?: PromiseOrValue<string> | null,
      tokenUri?: null
    ): NftMintedEventFilter;
    NftMinted(
      nftContractAddress?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      mintedTo?: PromiseOrValue<string> | null,
      tokenUri?: null
    ): NftMintedEventFilter;

    "NftOnSale(address,uint256,uint256)"(
      nftContractAddress?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): NftOnSaleEventFilter;
    NftOnSale(
      nftContractAddress?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): NftOnSaleEventFilter;

    "NftSaleCancel(address,uint256)"(
      nftContractAddress?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): NftSaleCancelEventFilter;
    NftSaleCancel(
      nftContractAddress?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): NftSaleCancelEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    auctionContractImplementation(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createAuctionContract(
      _nftContract: PromiseOrValue<string>,
      _nftId: PromiseOrValue<string>,
      _startingBid: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createNftContract(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAllAuctions(overrides?: CallOverrides): Promise<BigNumber>;

    getAllNftCollections(overrides?: CallOverrides): Promise<BigNumber>;

    getNftCollectionsWhereTokensOnSale(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNftsCollectionsAuthored(overrides?: CallOverrides): Promise<BigNumber>;

    getNftsCollectionsWhereOwnerOwnsTokens(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nativeNftContractAddr(overrides?: CallOverrides): Promise<BigNumber>;

    nftContractImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    auctionContractImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createAuctionContract(
      _nftContract: PromiseOrValue<string>,
      _nftId: PromiseOrValue<string>,
      _startingBid: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createNftContract(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAllAuctions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAllNftCollections(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNftCollectionsWhereTokensOnSale(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNftsCollectionsAuthored(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNftsCollectionsWhereOwnerOwnsTokens(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nativeNftContractAddr(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nftContractImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
