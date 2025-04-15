export interface Holding {
    majorClass: string;
    assetClasses: {
      minorAssetClass: string;
      value: number;
    }[];
  }
  
  export interface Asset {
    assetId: string;
    nickname: string;
    primaryAssetCategory: string;
    wealthAssetType: string;
    balanceCurrent: number;
    holdings?: {
      majorAssetClasses: Holding[];
    };
    assetInfo?: string;
  }
  