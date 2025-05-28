'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import styles from './page.module.css';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginForm, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[field as keyof LoginErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock authentication - in real app, this would be an API call
      if (formData.email === 'admin@insurevis.com' && formData.password === 'admin123') {        // Store authentication token/session
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userEmail', formData.email);
        
        // Redirect to admin dashboard
        router.push('/dashboard');
      } else {
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
      }    } catch {
      setErrors({
        general: 'Login failed. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would redirect to forgot password page
    alert('Forgot password functionality would be implemented here');
  };  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Header */}
        <div className={styles.loginHeader}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h1 className={styles.companyName}>InsureVis</h1>
            <p className={styles.tagline}>Insurance Claims Administration</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Sign In</h2>
            <p className={styles.formSubtitle}>
              Access your insurance claims dashboard
            </p>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className={styles.errorMessage}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              {errors.general}
            </div>
          )}

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <div className={styles.inputWrapper}>
              <div className={styles.inputIcon}>
                <i className="fa-regular fa-envelope"></i>
              </div>
              <input
                id="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && (
              <div id="email-error" className={styles.fieldError}>
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <div className={styles.inputIcon}>
                <i className="fa-regular fa-lock"></i>
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.password && (
              <div id="password-error" className={styles.fieldError}>
                {errors.password}
              </div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className={styles.formOptions}>
            <div className={styles.checkboxWrapper}>
              <input
                id="rememberMe"
                type="checkbox"
                className={styles.checkbox}
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              />
              <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                Remember me
              </label>
            </div>
            <button
              type="button"
              className={styles.forgotPassword}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Signing In...
              </>
            ) : (
              <>
                <i className="fa-regular fa-sign-in"></i>
                Sign In
              </>
            )}
          </Button>

          {/* Demo Credentials */}
          <div className={styles.demoInfo}>
            <h4>Demo Credentials</h4>
            <p><strong>Email:</strong> admin@insurevis.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </form>

        {/* Footer */}
        <div className={styles.loginFooter}>
          <p className={styles.footerText}>
            © 2024 InsureVis. All rights reserved.
          </p>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <span className={styles.separator}>•</span>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
            <span className={styles.separator}>•</span>
            <a href="#" className={styles.footerLink}>Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
