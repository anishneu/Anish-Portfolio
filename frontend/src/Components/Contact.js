import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Phone, Email, LocationOn, SendRounded } from '@mui/icons-material';

const fieldSx = (fieldBg, fieldBorder, fieldBorderHover, labelColor, inputColor) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: fieldBg,
    '& fieldset': { borderColor: fieldBorder },
    '&:hover fieldset': { borderColor: fieldBorderHover },
    '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '1px' },
  },
  '& .MuiInputLabel-root': { color: labelColor },
  '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
  '& .MuiOutlinedInput-input': { color: inputColor },
});

const Contact = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const formBg = isLight ? '#ffffff' : '#252525';
  const fieldBg = isLight ? '#f2f2f2' : '#1e1e1e';
  const fieldBorder = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
  const fieldBorderHover = isLight ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)';
  const labelColor = isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)';
  const inputColor = isLight ? '#1a1a1a' : '#e8e8e8';

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (status.text) setStatus({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', text: 'Please fill in your name, email, and message.' });
      return;
    }

    setSending(true);
    setStatus({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: 'kuila.a@northeastern.edu',
          subject: `Portfolio message from ${form.firstName} ${form.lastName}`.trim(),
          text: `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone || '—'}\n\n${form.message}`,
        }),
      });

      if (!res.ok) throw new Error('Send failed');
      setStatus({ type: 'success', text: 'Message sent — thank you!' });
      setForm({ firstName: '', lastName: '', phone: '', email: '', message: '' });
    } catch {
      setStatus({
        type: 'error',
        text: 'Could not send right now. Email me directly at kuila.a@northeastern.edu',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      style={{
        backgroundColor: 'transparent',
        padding: '5rem 0 3rem 0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                backgroundColor: formBg,
                borderRadius: 3,
                p: 3,
                width: '100%',
                maxWidth: 700,
                mx: 'auto',
                boxShadow: isLight
                  ? '0 6px 18px rgba(0,0,0,0.1)'
                  : '0 12px 40px rgba(0,0,0,0.35)',
                border: isLight ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Box sx={fieldSx(fieldBg, fieldBorder, fieldBorderHover, labelColor, inputColor)}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={form.lastName}
                  onChange={handleChange('lastName')}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Mobile Number"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  value={form.phone}
                  onChange={handleChange('phone')}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  value={form.message}
                  onChange={handleChange('message')}
                />
              </Box>

              {status.text && (
                <Alert severity={status.type === 'success' ? 'success' : 'error'} sx={{ mt: 2 }}>
                  {status.text}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={sending}
                startIcon={sending ? <CircularProgress size={18} color="inherit" /> : <SendRounded />}
                sx={{
                  mt: 3,
                  bgcolor: 'primary.main',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: 'primary.dark', color: '#ffffff' },
                  px: 3,
                  py: 1.25,
                  textTransform: 'none',
                  borderRadius: 2,
                  display: 'flex',
                  mx: 'auto',
                }}
              >
                {sending ? 'Sending…' : 'Send Message'}
              </Button>
            </Box>
          </Grid>

          <Grid
            size={{ md: 1 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            <Divider orientation="vertical" flexItem sx={{ borderColor: 'divider' }} />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                color: 'text.primary',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                px: { xs: 0, md: 2 },
                pt: { xs: 2, md: 0 },
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: 'primary.main' }}>
                Let&apos;s Connect
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mb: 3, maxWidth: 360 }}
              >
                Get in touch — I&apos;d love to hear from you.
              </Typography>

              <Box display="flex" alignItems="flex-start" mb={2.5}>
                <Phone sx={{ mr: 2, mt: 0.25, color: 'primary.main' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    Phone
                  </Typography>
                  <Typography>+1 (617) 581-5833</Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="flex-start" mb={2.5}>
                <Email sx={{ mr: 2, mt: 0.25, color: 'primary.main' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    Email
                  </Typography>
                  <Typography>kuila.a@northeastern.edu</Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="flex-start">
                <LocationOn sx={{ mr: 2, mt: 0.25, color: 'primary.main' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    Location
                  </Typography>
                  <Typography>Boston, MA, USA</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Contact;
