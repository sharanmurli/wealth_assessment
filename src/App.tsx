import { Box, Typography, Container, CssBaseline } from '@mui/material';
import AssetTable from './components/AssetTable';

const App = () => {
  return (
    <>
      <CssBaseline /> {/* Ensures consistent baseline styling across browsers */}

      <Box
        sx={{
          backgroundColor: '#f8f9fa',
        
          minWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          py: { xs: 4, sm: 6 }, // responsive padding
          overflowX: 'hidden', // prevents horizontal scroll
        }}
      >
        {/* Heading Section */}
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: '#212529', fontWeight: 600 }}
          >
            Wealth Management
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            gutterBottom
            sx={{ color: '#495057' }}
          >
            Track and manage your financial assets efficiently.
          </Typography>
        </Container>

        {/* Asset Table Section */}
        <Container maxWidth="md" sx={{ mt: 4, width: '100%' }}>
          <AssetTable />
        </Container>
      </Box>
    </>
  );
};

export default App;
