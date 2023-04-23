import React, { useState } from 'react';
import { Avatar, Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import { CityMutation } from '../../../../types';
import { useAppSelector } from '../../../../app/hooks';
import { selectCityError, selectCreateCityLoading } from '../citySlice';

interface Props {
  onSubmit: (city: CityMutation) => void;
}

const FormCreateCity: React.FC<Props> = ({ onSubmit }) => {
  const createLoading = useAppSelector(selectCreateCityLoading);
  const error = useAppSelector(selectCityError);
  const [value, setValue] = useState('');

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: value });
    setValue('');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };
  return (
    <Box
      sx={{
        mt: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
        <SouthAmericaIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Создать город
      </Typography>
      <Box component="form" sx={{ mt: 3, width: '100%' }} onSubmit={onFormSubmit}>
        <Grid container sx={{ flexDirection: 'column' }} spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
              required
              fullWidth
              label="Название города"
              type="text"
              name="name"
              autoComplete="off"
              error={Boolean(getFieldError('name'))}
              helperText={getFieldError('name')}
            />
          </Grid>
        </Grid>
        <Button disabled={createLoading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {!createLoading ? 'Создать город' : <CircularProgress />}
        </Button>
      </Box>
    </Box>
  );
};

export default FormCreateCity;
