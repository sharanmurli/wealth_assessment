import { gql } from '@apollo/client';

export const GET_ASSETS = gql`
  query GetAssets($wid: String!) {
    getAssets(wid: $wid) {
      assetId
      nickname
      balanceCurrent
      primaryAssetCategory
      wealthAssetType
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

