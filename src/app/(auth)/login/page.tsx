import React from 'react';
import { AuthForm } from '../../components/auth/AuthForm';

export default function LoginPage() {
  return (
    <div className="py-16 px-4">
      <AuthForm initialMode="login" />
    </div>
  );
}
