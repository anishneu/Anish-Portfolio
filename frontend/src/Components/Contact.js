import React from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';

const Contact = () => {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#1c1c1c',
        padding: '5rem 0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: 'orange', textAlign: 'center', mb: 6 }}
        >
          Contact Me
        </Typography>

        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
          {/* Form Section */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: 3,
                p: 3,
                width: '100%',
                maxWidth: '700px',
                mx: 'auto',
                boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
              }}
            >
              <Box>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: '#000' } }}
                  InputProps={{ style: { color: '#555' } }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: '#000' } }}
                  InputProps={{ style: { color: '#555' } }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Mobile Number"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: '#000' } }}
                  InputProps={{ style: { color: '#555' } }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email ID"
                  type="email"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: '#000' } }}
                  InputProps={{ style: { color: '#555' } }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  InputLabelProps={{ style: { color: '#000' } }}
                  InputProps={{ style: { color: '#555' } }}
                />
              </Box>

              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: 'orange',
                  color: '#000',
                  fontWeight: 'bold',
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  borderRadius: 2,
                  display: 'block',
                  mx: 'auto',
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

          {/* Divider */}
          <Grid
            item
            md={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: '#ccc' }}
            />
          </Grid>

          {/* Let’s Connect Section */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                color: '#fff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: 'orange' }}>
                Let’s Connect
              </Typography>

              <Box display="flex" alignItems="center" mb={2}>
                <Phone sx={{ mr: 2, color: 'orange' }} />
                <Typography>+1 (123) 456-7890</Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Email sx={{ mr: 2, color: 'orange' }} />
                <Typography>kuila.a@northeastern.edu</Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <LocationOn sx={{ mr: 2, color: 'orange' }} />
                <Typography>Boston, MA, USA</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Contact;
