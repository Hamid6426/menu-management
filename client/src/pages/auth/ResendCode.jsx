import React from 'react';
import axiosInstance from '../../utils/axiosConfig';

const ResendCode = ({ email }) => {
  const handleResend = async () => {
    try {
      await axiosInstance.post('/api/auth/resend-code', { email });
      alert('Verification code resent. Please check your email.');
    } catch (error) {
      console.error('Error resending code:', error);
      alert('Resend failed. Please try again.');
    }
  };

  return <button onClick={handleResend}>Resend Code</button>;
};

export default ResendCode;
