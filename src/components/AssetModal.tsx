import {
    Dialog,
    DialogTitle,
    DialogContent,
    Tabs,
    Tab,
    IconButton,
    Box,
    Typography,
    Grid,
    Paper,
    Collapse
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import { useEffect, useState } from 'react';
  import { Asset} from '../types';

  import { ExpandMore, ExpandLess } from '@mui/icons-material';
  
  interface Props {
    asset: Asset;
    open: boolean;
    onClose: () => void;
  }
  
  const AssetModal: React.FC<Props> = ({ asset, open, onClose }) => {
    const [tab, setTab] = useState(0);
    const [expandedHoldings, setExpandedHoldings] = useState<Record<string, boolean>>({});
  
    useEffect(() => {
      if (open) {
        setTab(0);
        setExpandedHoldings({});
      }
    }, [open]);
  
    const hasHoldings =
      asset.holdings?.majorAssetClasses &&
      Array.isArray(asset.holdings.majorAssetClasses) &&
      asset.holdings.majorAssetClasses.length > 0;
  
    const assetInfo = (() => {
      try {
        return JSON.parse(asset.assetInfo || '{}');
      } catch {
        return {};
      }
    })();
  
    const relevantFields = [
      'cryptocurrencyName',
      'nickname',
      'estimateValue',
      'purchaseCost',
      'quantity',
      'asOfDate',
      'symbol',
      'streetAddress',
      'city',
      'state',
      'zipCode'
    ];
  
    const isValidDate = (dateString?: string) => {
      return !!dateString && !isNaN(new Date(dateString).getTime());
    };
  
    const formatDateOnly = (dateStr: string) => new Date(dateStr).toISOString().split('T')[0];
  
    const toggleExpand = (majorClass: string) => {
      setExpandedHoldings((prev) => ({
        ...prev,
        [majorClass]: !prev[majorClass],
      }));
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{asset.primaryAssetCategory}</Typography>
              <Typography variant="body2" color="text.secondary">
                {asset.wealthAssetType} → {asset.nickname}
              </Typography>
            </Box>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
  
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <Tabs
              value={tab}
              onChange={(_, newValue) => setTab(newValue)}
              variant="scrollable"
              TabIndicatorProps={{ sx: { backgroundColor: '#00857c' } }}
            >
              <Tab label="Overview" sx={{ color: 'text.primary', '&.Mui-selected': { color: '#00857c', fontWeight: 600 } }} />
              {hasHoldings && (
                <Tab label="Holdings" sx={{ color: 'text.primary', '&.Mui-selected': { color: '#00857c', fontWeight: 600 } }} />
              )}
              <Tab label="Details" sx={{ color: 'text.primary', '&.Mui-selected': { color: '#00857c', fontWeight: 600 } }} />
            </Tabs>
          </Box>
  
          {/* Overview */}
          {tab === 0 && (
            <Box mt={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Current Value</Typography>
                    <Typography variant="h6" color="primary">
                      ${asset.balanceCurrent.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
                {isValidDate(asset.balanceAsOf) && (
                  <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>As of Date</Typography>
                      <Typography variant="body1">{formatDateOnly(asset.balanceAsOf)}</Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
  
          {/* Holdings */}
          {tab === 1 && hasHoldings && (
            <Box mt={3}>
              <Typography variant="subtitle1" gutterBottom>Holdings</Typography>
              {asset.holdings!.majorAssetClasses.map((holding, i) => {
                const hasPercent = holding.assetClasses.some((ac) => 'percent' in ac);
                return (
                  <Box key={i} mt={2}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      onClick={() => toggleExpand(holding.majorClass)}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: '#f0f0f0',
                        px: 2,
                        py: 1,
                        borderRadius: 1
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <IconButton size="small" disableRipple sx={{ p: 0, mr: 1 }}>
                          {expandedHoldings[holding.majorClass] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                        <Typography variant="subtitle2">{holding.majorClass}</Typography>
                      </Box>
                    </Box>
  
                    <Collapse in={expandedHoldings[holding.majorClass]} timeout="auto" unmountOnExit>
                      <Box component="table" width="100%" sx={{ mt: 1 }}>
                        <thead>
                          <tr>
                            <th align="left">Minor Class</th>
                            <th align="left">Value</th>
                            {hasPercent && <th align="left">% of Total</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {holding.assetClasses.map((ac, j) => (
                            <tr key={j}>
                              <td>{ac.minorAssetClass}</td>
                              <td>${ac.value.toLocaleString()}</td>
                              {hasPercent && (
                                <td>
                                  {'percent' in ac && typeof ac.percent === 'number'
                                    ? `${ac.percent.toFixed(2)}%`
                                    : '—'}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Box>
                    </Collapse>
                  </Box>
                );
              })}
            </Box>
          )}
  
          {/* Details */}
          {(tab === 2 || (!hasHoldings && tab === 1)) && (
            <Box mt={3}>
              <Typography variant="subtitle1" gutterBottom>Details</Typography>
              <Grid container spacing={2}>
                {relevantFields.map((field) =>
                  assetInfo[field] !== undefined ? (
                    <Grid item xs={12} sm={6} key={field}>
                      <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant="subtitle2">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Typography>
                        <Typography variant="body2">
                          {typeof assetInfo[field] === 'number'
                            ? `$${Number(assetInfo[field]).toLocaleString()}`
                            : String(assetInfo[field])}
                        </Typography>
                      </Paper>
                    </Grid>
                  ) : null
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    );
  };
  
  export default AssetModal;
  