import React from 'react';
import { AuthForm } from '../../components/auth/AuthForm';

export default function SignupPage() {
  return (
    <div className="py-16 px-4">
      <AuthForm initialMode="signup" />
    </div>
  );
}
