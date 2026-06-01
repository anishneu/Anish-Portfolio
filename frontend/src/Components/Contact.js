import React, { useState, useCallback } from 'react';
import { Container, Typography, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Phone, Email, LocationOn, SendRounded } from '@mui/icons-material';
import { brandColors } from '../context/ThemeContext';
import { CONTACT_EMAIL_ENDPOINT } from '../config';

const SNACKBAR_AUTO_HIDE_MS = 4500;

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (617) 581-5833',
    href: 'tel:+16175815833',
  },
  {
    icon: Email,
    label: 'Email',
    value: 'kuila.a@northeastern.edu',
    href: 'mailto:kuila.a@northeastern.edu',
  },
  {
    icon: LocationOn,
    label: 'Location',
    value: 'Boston, MA',
    href: null,
  },
];

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  multiline = false,
  isDark,
  className = '',
}) {
  const [focused, setFocused] = useState(false);
  const controlClass = multiline
    ? 'contact-field__control contact-field__control--area'
    : 'contact-field__control';

  const fieldStyle = {
    color: isDark ? brandColors.mist : brandColors.charcoal,
    backgroundColor: isDark ? 'rgba(0,0,0,0.28)' : 'rgba(255, 255, 255, 0.98)',
    ...(isDark && {
      boxShadow: focused
        ? `inset 0 0 0 1px ${brandColors.accent}, 0 0 0 3px ${brandColors.accentSoft}`
        : 'inset 0 0 0 1px rgba(255,255,255,0.1)',
    }),
  };

  const controlClasses = [
    controlClass,
    focused ? 'contact-field__control--focused' : '',
    !isDark ? 'contact-field__control--light' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const sharedProps = {
    id: name,
    name,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    required,
    className: controlClasses,
    style: fieldStyle,
    autoComplete: name === 'email' ? 'email' : name === 'fullName' ? 'name' : 'off',
  };

  return (
    <Box className={`contact-field ${className}${focused ? ' contact-field--focused' : ''}`}>
      <Typography
        component="label"
        htmlFor={name}
        className="contact-field__label"
        sx={{
          color: focused && !isDark ? brandColors.chocolate : 'text.secondary',
        }}
      >
        {label}
        {required ? ' *' : ''}
      </Typography>
      {multiline ? <textarea {...sharedProps} rows={5} /> : <input type={type} {...sharedProps} />}
    </Box>
  );
}

function ContactChannel({ icon: Icon, label, value, href }) {
  const inner = (
    <>
      <span className="contact-channel__icon" aria-hidden>
        <Icon sx={{ fontSize: 18 }} />
      </span>
      <span>
        <span className="contact-channel__label">{label}</span>
        <span className="contact-channel__value">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a className="contact-channel" href={href}>
        {inner}
      </a>
    );
  }

  return <div className="contact-channel">{inner}</div>;
}

const Contact = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const primary = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;

  const railBg = isDark ? brandColors.surface : brandColors.paperLight;
  // Light mode needs stronger separation between outer shell and the form panel.
  const formZoneBg = isDark ? brandColors.surfaceRaised : brandColors.mist;
  const shellBg = isDark ? brandColors.surface : brandColors.surfaceLight;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const closeSnackbar = useCallback((_event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      showSnackbar('Please fill in full name, email, and your message.', 'error');
      return;
    }

    setSending(true);

    try {
      const res = await fetch(CONTACT_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          senderEmail: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Send failed');
      setForm({ fullName: '', email: '', message: '' });
      showSnackbar('Message sent — thank you!', 'success');
    } catch (err) {
      showSnackbar(
        err.message && err.message !== 'Send failed'
          ? err.message
          : 'Could not send. Email kuila.a@northeastern.edu directly.',
        'error'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="section contact-section"
      style={{ backgroundColor: 'transparent', padding: '5rem 0' }}
    >
      <Container maxWidth="lg" className="contact-page">
        <motion.header
          className="contact-page__header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
        >
          <Typography component="span" className="section-eyebrow">
            Contact
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: 'primary.main',
              textAlign: 'center',
              mb: 1,
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              maxWidth: 640,
              mx: 'auto',
              mb: 3,
              lineHeight: 1.6,
              fontSize: { xs: '0.95rem', sm: '1rem' },
            }}
          >
            Open to opportunities — send a message or reach out directly.
          </Typography>
        </motion.header>

        <motion.div
          className="contact-page__shell"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: shellBg }}
        >
          <Box className="contact-page__body">
            <Box
              className="contact-page__rail"
              sx={{
                backgroundColor: railBg,
                color: 'text.primary',
                borderRight: (t) =>
                  t.palette.mode === 'dark' ? '1px solid rgba(193,193,193,0.12)' : '1px solid rgba(79,79,79,0.08)',
              }}
            >
              <span className="contact-page__rail-glow" aria-hidden />
              <span className="contact-page__rail-tag" style={{ color: isDark ? brandColors.fog : brandColors.slate }}>
                Contact
              </span>
              <h2 className="contact-page__rail-title">Let&apos;s build something together.</h2>
              <p className="contact-page__rail-note" style={{ color: isDark ? brandColors.fog : brandColors.slate }}>
                Full-time &amp; intern roles · Boston, MA
              </p>
              <div className="contact-page__channels">
                {CONTACT_ITEMS.map((item) => (
                  <ContactChannel key={item.label} {...item} />
                ))}
              </div>
            </Box>

            <Box className="contact-page__divider" aria-hidden />

            <Box className="contact-page__form-zone" sx={{ backgroundColor: formZoneBg }}>
              <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
                <div className="contact-page__form-grid contact-page__form-grid--compact">
                  <FormField
                    label="Full Name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    required
                    isDark={isDark}
                  />
                  <FormField
                    label="Email ID"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    required
                    isDark={isDark}
                  />
                  <FormField
                    label="Your Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange('message')}
                    required
                    multiline
                    isDark={isDark}
                    className="contact-field--message"
                  />
                </div>
                <div className="contact-page__form-footer">
                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="contact-form-submit"
                    whileHover={sending ? {} : { scale: 1.02 }}
                    whileTap={sending ? {} : { scale: 0.98 }}
                    style={{
                      background: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)`,
                      color: isDark ? brandColors.night : brandColors.whisper,
                      boxShadow: isDark
                        ? `0 4px 20px ${primary}40`
                        : `0 6px 18px ${primary}35`,
                    }}
                  >
                    {sending ? (
                      <>
                        <CircularProgress size={16} sx={{ color: 'inherit' }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        <SendRounded sx={{ fontSize: 20 }} />
                        Send message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </Box>
          </Box>
        </motion.div>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={SNACKBAR_AUTO_HIDE_MS}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ zIndex: 10001 }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: '100%',
            maxWidth: 420,
            borderRadius: 2,
            fontWeight: 500,
            boxShadow: (t) =>
              t.palette.mode === 'dark'
                ? '0 12px 40px rgba(0,0,0,0.45)'
                : '0 12px 32px rgba(28,25,23,0.18)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Contact;
