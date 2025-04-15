import { gql } from '@apollo/client';

export const GET_ASSETS = gql`
  query GetAssets {
    assets {
      assetId
      nickname
      primaryAssetCategory
      wealthAssetType
      balanceCurrent
      holdings {
        majorAssetClasses {
          majorClass
          assetClasses {
            minorAssetClass
            value
          }
        }
      }
      assetInfo
    }
  }
`;
