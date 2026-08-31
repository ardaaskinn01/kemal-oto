'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  initialMode?: 'login' | 'signup' | 'forgot_password';
}

export function AuthForm({ initialMode = 'login' }: AuthFormProps) {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot_password'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [requiresEmailConfirmation, setRequiresEmailConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setRequiresEmailConfirmation(false);
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          if (error.toLowerCase().includes('email not confirmed')) {
            setErrorMessage('E-posta adresiniz henüz doğrulanmamış. Lütfen e-postanıza gönderilen onay linkine tıklayın.');
          } else {
            setErrorMessage(error === 'Invalid login credentials' ? 'E-posta veya şifre hatalı.' : error);
          }
        } else {
          router.push('/');
          router.refresh();
        }
      } else if (mode === 'signup') {
        const { error } = await signUpWithEmail(email, password, fullName);
        if (error) {
          setErrorMessage(error);
        } else {
          setRequiresEmailConfirmation(true);
          setSuccessMessage(`Kayıt başarılı! Lütfen ${email} adresine gönderilen onay linkine tıklayın.`);
        }
      } else if (mode === 'forgot_password') {
        const { error, success } = await resetPassword(email);
        if (error) {
          setErrorMessage(error);
        } else if (success) {
          setSuccessMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'İşlem sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMessage(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Google ile giriş başarısız oldu.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors">
      
      {/* Mode Switcher Tabs */}
      {mode !== 'forgot_password' && (
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Üye Ol (Müşteri)
          </button>
        </div>
      )}

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {mode === 'login' && 'Giriş Yap'}
          {mode === 'signup' && 'Müşteri Hesabı Oluştur'}
          {mode === 'forgot_password' && 'Şifrenizi Sıfırlayın'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {mode === 'login' && 'Aracınızı garaja ekleyin, siparişlerinizi ve kargolarınızı takip edin'}
          {mode === 'signup' && 'Tüm sipariş ve kargo bilgilendirmeleri e-posta adresinize iletilir'}
          {mode === 'forgot_password' && 'Kayıtlı e-posta adresinize sıfırlama bağlantısı gönderilecektir'}
        </p>
      </div>

      {/* Google OAuth Button */}
      {mode !== 'forgot_password' && !requiresEmailConfirmation && (
        <div className="space-y-3.5 mb-5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-white dark:hover:bg-slate-100 text-slate-800 dark:text-slate-900 font-bold py-2.5 px-4 rounded-lg shadow-sm border border-slate-200 dark:border-transparent flex items-center justify-center gap-2.5 text-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-700" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            )}
            <span>Google ile Giriş Yap / Kayıt Ol</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-[10px] text-slate-500 uppercase font-semibold">
              veya e-posta ile
            </span>
          </div>
        </div>
      )}

      {/* Messages */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 rounded-lg text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-500/40 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
          {requiresEmailConfirmation && (
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Gelen e-postadaki <strong>&quot;Hesabı Onayla&quot;</strong> butonuna tıkladıktan sonra hesabınız anında aktif olacaktır. (Spam klasörünü kontrol etmeyi unutmayın).
            </p>
          )}
        </div>
      )}

      {/* Form */}
      {!requiresEmailConfirmation && (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ad Soyad
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:border-orange-600"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              E-Posta Adresi
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:border-orange-600"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {mode !== 'forgot_password' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Şifre
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot_password')}
                    className="text-[11px] text-orange-600 hover:underline"
                  >
                    Şifremi Unuttum?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifreniz"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:border-orange-600"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Giriş Yap'}
                  {mode === 'signup' && 'Kayıt Ol ve Başla'}
                  {mode === 'forgot_password' && 'Sıfırlama Bağlantısı Gönder'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          {mode === 'forgot_password' && (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white pt-2 cursor-pointer"
            >
              ← Giriş Ekranına Geri Dön
            </button>
          )}
        </form>
      )}
    </div>
  );
}
