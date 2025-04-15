export interface AssetClass {
    minorAssetClass: string;
    value: number;
  }
  
  export interface Holding {
    majorClass: string;
    assetClasses: AssetClass[];
  }
  
  export interface Asset {
    assetId: string;
    nickname: string;
    wealthAssetType: string;
    primaryAssetCategory: string;
    balanceCurrent: number;
    balanceAsOf: string;
    assetInfo?: string;
    holdings?: {
      majorAssetClasses: {
        majorClass: string;
        assetClasses: {
          minorAssetClass: string;
          value: number;
        }[];
      }[];
    };
  }
  
  export interface MajorAssetClass {
    majorClass: string;
    assetClasses: {
      minorAssetClass: string;
      value: number;
      percent?: number;
    }[];
  }
  