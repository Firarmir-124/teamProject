import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ModalBody from '../../components/ModalBody';
import CardLocation from './components/CardLocation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectLocationsColumnSettings,
  selectLocationsListData,
  selectLocationsListLoading,
  setCurrentPage,
} from './locationsSlice';
import { getLocationsList } from './locationsThunks';
import { StyledTableCell } from '../../constants';
import LocationDrawer from './components/LocationDrawer';
import SettingsIcon from '@mui/icons-material/Settings';

const LocationList = () => {
  const dispatch = useAppDispatch();
  const locationsListData = useAppSelector(selectLocationsListData);
  const locationsListLoading = useAppSelector(selectLocationsListLoading);
  const columns = useAppSelector(selectLocationsColumnSettings);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getLocationsList({ page: locationsListData.page, perPage: locationsListData.perPage }));
  }, [dispatch, locationsListData.page, locationsListData.perPage]);

  return (
    <Box sx={{ py: 2 }}>
      <Grid container alignItems="center" mb={2}>
        <Grid item>
          <Chip
            sx={{ fontSize: '20px', p: 3 }}
            label={`Список локаций: ${locationsListData.count}`}
            variant="outlined"
            color="info"
          />
        </Grid>
        <Grid item>
          <IconButton onClick={() => setIsDrawerOpen(true)} sx={{ mx: 1 }}>
            <SettingsIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ width: '100%', minHeight: '600px', overflowX: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">№</StyledTableCell>
                {columns
                  .filter((col) => col.show)
                  .map((col) => (
                    <StyledTableCell align="center" key={col.id}>
                      {col.prettyName}
                    </StyledTableCell>
                  ))}
                <StyledTableCell align="right">Управление</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locationsListData.locations.map((loc, i) => (
                <CardLocation
                  key={loc._id}
                  loc={loc}
                  number={(locationsListData.page - 1) * locationsListData.perPage + i + 1}
                  onClose={() => setIsOpen(true)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Pagination
        size="small"
        sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}
        disabled={locationsListLoading}
        count={locationsListData.pages}
        page={locationsListData.page}
        onChange={(event, page) => dispatch(setCurrentPage(page))}
      />
      <ModalBody isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Редактировать
      </ModalBody>
      <LocationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Box>
  );
};

export default LocationList;
