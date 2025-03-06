import { useState } from 'react';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const token = new URLSearchParams(window.location.search).get('token');

      const response = await fetch(`/api/users/reset-password?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: formData.password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password reset successful. You can now log in.');
        setError('');
      } else {
        setError(data.message || 'Failed to reset password.');
        setMessage('');
      }
    } catch (err) {
      setError(`An error occurred. Please try again. ${err}`);
      setMessage('');
    }
  };

  return (
    <div className="mx-auto bg-white my-8 py-6 px-12 rounded-xl shadow-2xl drop-shadow-2xl">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-[280px]">
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-[#ff0] focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Reset Password
        </button>
      </form>

      {message && <p className="text-green-600 text-sm mt-4">{message}</p>}

      <div className="mt-4 text-center">
        <p className="text-black text-sm">
          Didn&apos;t get the reset email?&nbsp;
          <a href="/auth/forgot-password" className="text-red-600 font-semibold hover:underline">
            Resend password reset email
          </a>
        </p>
      </div>

    </div>
  );
};

export default ResetPassword;
