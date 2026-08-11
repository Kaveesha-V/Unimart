import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loginSuccess } from '../authSlice';

// Zod Schema for Student Auth
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Student email is required')
    .email('Must be a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'j.taylor@university.edu',
      password: 'password123',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Simulate auth API call
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: {
            id: 'usr-demo-99',
            name: 'Jordan Taylor',
            email: data.email,
            studentId: 'ST-2024-8842',
            campusLocation: 'North Dorm Towers',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            verifiedStudent: true,
          },
          token: 'mock-jwt-token-unimart-2026',
        })
      );
      navigate('/');
    }, 600);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper
        elevation={0}
        className="glow-card"
        sx={{
          p: { xs: 4, sm: 6 },
          borderRadius: 4,
          bgcolor: '#121829',
        }}
      >
        {/* Header Icon */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-rose-500 p-0.5 mx-auto mb-3 shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <StorefrontIcon className="text-cyan-400" sx={{ fontSize: 30 }} />
            </div>
          </div>
          <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800 }}>
            Student <span className="gradient-text-electric">Sign In</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Access your UniMart campus marketplace profile
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(255, 92, 122, 0.1)', color: '#FF5C7A' }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Student Email (.edu)"
              fullWidth
              variant="outlined"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="e.g. name@university.edu"
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              startIcon={<LockOutlinedIcon />}
              sx={{ py: 1.5, mt: 1, fontSize: '1rem', fontWeight: 700 }}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to UniMart'}
            </Button>
          </Box>
        </form>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Demo Student Account: <strong>j.taylor@university.edu</strong>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
