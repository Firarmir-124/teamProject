import React, { useState } from 'react';
import { Avatar, Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useAppSelector } from '../../../../app/hooks';
import { LightingMutation } from '../../../../types';
import { selectLightingCreateLoading, selectLightingError } from '../lightingsSlice';

interface Props {
  onSubmit: (lighting: LightingMutation) => void;
}

const FormCreateLighting: React.FC<Props> = ({ onSubmit }) => {
  const createLoading = useAppSelector(selectLightingCreateLoading);
  const error = useAppSelector(selectLightingError);
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
      <Avatar sx={{ m: 1 }}>
        <LightModeOutlinedIcon color="success" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Создать тип освещения
      </Typography>
      <Box component="form" sx={{ mt: 3, width: '100%' }} onSubmit={onFormSubmit}>
        <Grid container sx={{ flexDirection: 'column' }} spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
              required
              fullWidth
              label="Освещение"
              type="text"
              name="name"
              autoComplete="off"
              error={Boolean(getFieldError('name'))}
              helperText={getFieldError('name')}
            />
          </Grid>
        </Grid>
        <Button
          disabled={createLoading}
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 3, mb: 2 }}
        >
          {!createLoading ? 'Создать освещение' : <CircularProgress />}
        </Button>
      </Box>
    </Box>
  );
};

export default FormCreateLighting;
