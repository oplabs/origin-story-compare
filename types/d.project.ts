import { BigNumber } from "ethers";

interface ProjectData {
    contract: {
        address: string;
        collection: {
            twitter_username: string;
            name: string;
            image_url: string;
        }
    };
    contractStats: {
        floorPrice: BigNumber
        totalVolume: number;
        totalSupply: number;
        oneDayVolume: number;
    };
    highConvictionHolders: number;
    holderDistribution: {
        name: string;
        value: number;
    }[];
    ownerAddresses: string[];
    salesByDay: {
        byDay: {
           date: string;
           sales: number;
           ethVolume: number;
           averagePrice: number; 
        }[];
        stats: object;
    };
    topHolders: {
        address: string;
        tokenIds: string[];
    }[];
    totalHolders: number;
    uniqueOwners: string;
    error?: string;
}

export type { ProjectData }