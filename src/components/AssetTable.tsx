import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Collapse,
    Box,
    CircularProgress,
    Typography,
  } from '@mui/material';
  import { ExpandLess, ExpandMore } from '@mui/icons-material';
  import { useState, useEffect } from 'react';
  import { Asset } from '../types';
  import AssetModal from './AssetModal';
  import { useQuery } from '@apollo/client';
  import { GET_ASSETS } from '../graph_ql/queries';
  
  interface GroupedAssets {
    [category: string]: {
      [subCategory: string]: Asset[];
    };
  }
  
  const groupAssets = (assets: Asset[]): GroupedAssets => {
    const grouped: GroupedAssets = {};
    for (const asset of assets) {
      const { primaryAssetCategory, wealthAssetType } = asset;
      if (!grouped[primaryAssetCategory]) {
        grouped[primaryAssetCategory] = {};
      }
      if (!grouped[primaryAssetCategory][wealthAssetType]) {
        grouped[primaryAssetCategory][wealthAssetType] = [];
      }
      grouped[primaryAssetCategory][wealthAssetType].push(asset);
    }
    return grouped;
  };
  
  const AssetTable = () => {
    const wid = import.meta.env.VITE_WID;
    const { loading, error, data } = useQuery(GET_ASSETS, {
      variables: { wid },
    });
  
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
    const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({});
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
  
    useEffect(() => {
      if (data) console.log('GraphQL data:', data.getAssets);
      if (error) console.error(' GraphQL error:', error);
    }, [data, error]);
  
    if (loading)
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      );
  
    if (error)
      return (
        <Typography color="error" align="center" mt={4}>
          Error fetching assets: {error.message}
        </Typography>
      );
  
    const assets: Asset[] = data?.getAssets || [];
    const grouped = groupAssets(assets);
  
    const toggleCategory = (cat: string) =>
      setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  
    const toggleSubcategory = (cat: string, sub: string) => {
      const key = `${cat}_${sub}`;
      setOpenSubcategories(prev => ({ ...prev, [key]: !prev[key] }));
    };
  
    const handleAssetClick = (asset: Asset) => {
      setSelectedAsset(asset);
      setModalOpen(true);
    };
  
    return (
      <Box display="flex" justifyContent="center" px={2} width="100%" flexWrap="wrap">
        <TableContainer
          component={Paper}
          sx={{
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            overflowX: 'auto',
          }}
        >
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Category / Subcategory / Asset</strong></TableCell>
                <TableCell align="right"><strong>Balance</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(grouped).map(([category, subcategories]) => (
                <>
                  <TableRow key={category}>
                    <TableCell>
                      <IconButton
                        onClick={() => toggleCategory(category)}
                        size="small"
                        disableRipple
                        sx={{
                          backgroundColor: 'transparent',
                          '&:hover': { backgroundColor: 'transparent' },
                          '&:focus': { outline: 'none', boxShadow: 'none' },
                        }}
                      >
                        {openCategories[category] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                      <strong>{category}</strong>
                    </TableCell>
                    <TableCell align="right">
                      ${Object.values(subcategories)
                        .flat()
                        .reduce((sum, a) => sum + a.balanceCurrent, 0)
                        .toLocaleString()}
                    </TableCell>
                  </TableRow>
  
                  <TableRow>
                    <TableCell colSpan={2} sx={{ p: 0, border: 0 }}>
                      <Collapse in={openCategories[category]} timeout="auto" unmountOnExit>
                        <Table size="small">
                          <TableBody>
                            {Object.entries(subcategories).map(([sub, assets]) => {
                              const subKey = `${category}_${sub}`;
                              return (
                                <>
                                  <TableRow key={subKey}>
                                    <TableCell sx={{ pl: 4 }}>
                                      <IconButton
                                        onClick={() => toggleSubcategory(category, sub)}
                                        size="small"
                                        disableRipple
                                        sx={{
                                          backgroundColor: 'transparent',
                                          '&:hover': { backgroundColor: 'transparent' },
                                          '&:focus': { outline: 'none', boxShadow: 'none' },
                                        }}
                                      >
                                        {openSubcategories[subKey] ? <ExpandLess /> : <ExpandMore />}
                                      </IconButton>
                                      {sub}
                                    </TableCell>
                                    <TableCell align="right">
                                      ${assets.reduce((sum, a) => sum + a.balanceCurrent, 0).toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell colSpan={2} sx={{ p: 0, border: 0 }}>
                                      <Collapse in={openSubcategories[subKey]} timeout="auto" unmountOnExit>
                                        <Table size="small">
                                          <TableBody>
                                            {assets.map((a) => (
                                              <TableRow
                                                key={a.assetId}
                                                hover
                                                onClick={() => handleAssetClick(a)}
                                                sx={{ cursor: 'pointer' }}
                                              >
                                                <TableCell sx={{ pl: 8 }}>{a.nickname}</TableCell>
                                                <TableCell align="right">${a.balanceCurrent.toLocaleString()}</TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </Collapse>
                                    </TableCell>
                                  </TableRow>
                                </>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
  
          {selectedAsset && (
            <AssetModal
              asset={selectedAsset}
              open={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
        </TableContainer>
      </Box>
    );
  };
  
  export default AssetTable;
  