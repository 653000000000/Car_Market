import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import carData from '../data/taladrod-cars.json';

const HighlightedCars = () => {
  const [favorites, setFavorites] = useState([]);
  const [carDetails, setCarDetails] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    const selectedCars = carData.Cars.filter(car => storedFavorites.includes(car.Cid));
    setCarDetails(selectedCars);
  }, []);

  const handleRemoveFavorite = (carId) => {
    const updatedFavorites = favorites.filter(id => id !== carId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setCarDetails(carDetails.filter(car => car.Cid !== carId));
  };

  return (
    <Box p={3} display="flex" flexDirection="column" justifyContent="space-between" height="100vh">
      <Box mb={2}>
        <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#000' }}>
          <Typography variant="h6" component="span">Dashboard</Typography>
        </Link>
        <Link to="/highlighted" style={{ textDecoration: 'none', color: '#000' }}>
          <Typography variant="h6" component="span" style={{ borderBottom: '2px solid #000' }}>Highlighted</Typography>
        </Link>
      </Box>

      <Typography variant="h4" gutterBottom>Highlighted Cars</Typography>
      <Grid container spacing={3} flexGrow={1}>
        {carDetails.map(car => (
          <Grid item xs={12} sm={6} md={4} key={car.Cid}>
            <Card>
              <CardMedia
                component="img"
                image={car.Img300}
                alt={car.Model}
                style={{ height: 200, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {car.Model} - {car.Province}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {car.NameMMT}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  Year: {car.Yr}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  Price: {parseInt(car.Prc.replace(/,/g, '')).toLocaleString()} Baht
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => handleRemoveFavorite(car.Cid)}>
                  Remove from Favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HighlightedCars;
