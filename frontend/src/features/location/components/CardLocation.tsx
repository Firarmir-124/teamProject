import React from 'react';
import { Button, ButtonGroup, TableCell, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ILocation } from '../../../types';
import { StyledTableRow } from '../../../constants';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../app/hooks';
import { selectLocationsColumnSettings } from '../locationsSlice';

interface Props {
  onClose: React.MouseEventHandler;
  loc: ILocation;
  number: number;
}

const CardLocation: React.FC<Props> = ({ loc, onClose, number }) => {
  const columns = useAppSelector(selectLocationsColumnSettings);

  const cells: Record<string, React.ReactNode> = {
    address: (
      <>
        {`${loc.city} ${loc.street}, ${loc.direction}`}
        {loc.addressNote && (
          <Typography color="gray" fontSize=".85em">
            ({loc.addressNote})
          </Typography>
        )}
      </>
    ),
    area: <>{loc.area}</>,
    city: <>{loc.city}</>,
    region: <>{loc.region}</>,
    street: <>{loc.street}</>,
    direction: <>{loc.direction}</>,
    legalEntity: <>{loc.legalEntity}</>,
    size: <>{loc.size}</>,
    format: <>{loc.format}</>,
    lighting: <>{loc.lighting}</>,
    placement: <>{loc.placement ? 'По направлению' : 'Не по направлению'}</>,
    price: <>{loc.price}</>,
    rent: (
      <>
        {loc.rent && (
          <>
            <Typography>{dayjs(loc.rent.start).format('DD.MM.YYYY')}</Typography>
            <Typography>{dayjs(loc.rent.end).format('DD.MM.YYYY')}</Typography>
          </>
        )}
      </>
    ),
    reserve: (
      <>
        {loc.reserve && (
          <>
            <Typography>{dayjs(loc.reserve.start).format('DD.MM.YYYY')}</Typography>
            <Typography>{dayjs(loc.reserve.end).format('DD.MM.YYYY')}</Typography>
          </>
        )}
      </>
    ),
  };

  return (
    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="center">{number}</TableCell>
      {columns
        .filter((col) => col.show)
        .map((col) => (
          <TableCell key={col.prettyName} align="center" sx={{ whiteSpace: 'nowrap' }}>
            {cells[col.name]}
          </TableCell>
        ))}
      <TableCell align="right">
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button size="small" color="error">
            <DeleteIcon />
          </Button>
          <Button size="small" color="success" onClick={onClose}>
            <EditIcon />
          </Button>
        </ButtonGroup>
      </TableCell>
    </StyledTableRow>
  );
};

export default CardLocation;
