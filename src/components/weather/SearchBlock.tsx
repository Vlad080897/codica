import React from 'react';

import { styled, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getError } from '../../redux/selectors/weatherSelectors';

type Props = {
  handleSearch: (city: string) => void;
};

const SearchBlock: React.FC<Props> = ({ handleSearch }) => {
  const [cityName, setCityName] = useState('');

  const error = useSelector(getError);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCityName(e.target.value);

  const handleSearchClick = () => cityName && handleSearch(cityName);

  return (
    <Container>
      <div>
        <Input
          placeholder="City name"
          value={cityName}
          onChange={handleInputChange}
        />
        {error && error.message}
      </div>
      <Button
        variant="contained"
        sx={{ padding: '3px', height: '34px' }}
        onClick={handleSearchClick}
      >
        Get Weather
      </Button>
    </Container>
  );
};

export default SearchBlock;

const Input = styled(TextField)`
  & input {
    padding: 5px;
    margin: 0;
  }
`;

const Container = styled(Box)`
  display: flex;
  gap: 10px;
  width: 100vw;
  justify-content: center;

  & > div {
    display: flex;
    flex-direction: column;
    color: red;
  }
`;
