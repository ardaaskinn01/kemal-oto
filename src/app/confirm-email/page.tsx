'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle2, AlertCircle, Loader2, Mail, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';

function ConfirmEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type') as any;

        // URL'de token_hash varsa (E-postadaki linke tıklandığında)
        if (token_hash && (type === 'signup' || type === 'email')) {
          const { error: confirmError } = await supabase.auth.verifyOtp({
            token_hash,
            type: type || 'signup',
          });

          if (confirmError) {
            if (confirmError.message.includes('already confirmed')) {
              setSuccess('E-posta adresiniz zaten onaylanmış.');
              setConfirmed(true);
            } else if (confirmError.message.includes('expired')) {
              setError('Onay bağlantısının süresi dolmuş. Lütfen yeni bir onay maili talep edin.');
            } else {
              setError('Geçersiz onay bağlantısı veya süresi dolmuş.');
            }
          } else {
            setSuccess('E-posta adresiniz başarıyla onaylandı! Yönlendiriliyorsunuz...');
            setConfirmed(true);
            setTimeout(() => {
              router.push('/');
            }, 2500);
          }
        } else {
          // Eğer kullanıcı zaten giriş yapmışsa ve email onaylıysa
          if (user) {
            const isEmailConfirmed = !!user.email_confirmed_at;
            if (isEmailConfirmed) {
              setConfirmed(true);
              setSuccess('E-posta adresiniz onaylı durumdadır.');
            } else {
              setError('E-posta adresiniz henüz onaylanmamış. Lütfen gelen kutunuzu kontrol edin.');
            }
          }
        }
      } catch (err: any) {
        setError(err?.message || 'Onay işlemi sırasında bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    handleEmailConfirmation();
  }, [searchParams, router, user]);

  const handleResendConfirmation = async () => {
    setResending(true);
    setError(null);
    try {
      if (!user?.email) {
        throw new Error('Kullanıcı e-posta adresi bulunamadı.');
      }

      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });

      if (resendError) throw resendError;
      setSuccess('Yeni onay e-postası gönderildi! Lütfen gelen kutunuzu ve spam klasörünü kontrol edin.');
    } catch (err: any) {
      setError(err?.message || 'Onay e-postası gönderilemedi.');
    } finally {
      setResending(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-xl dark:shadow-2xl">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">E-posta Doğrulanıyor...</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Lütfen bekleyiniz</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-xl dark:shadow-2xl transition-colors">
      <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto">
        <Mail className="w-7 h-7" />
      </div>

      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          {confirmed ? 'Hesabınız Aktif Edildi!' : 'E-Posta Doğrulama'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {confirmed
            ? 'Tebrikler, hesabınız doğrulandı. Artık güvenle alışveriş yapabilirsiniz.'
            : 'Kemal Oto hesabınızı aktifleştirmek için e-postanıza gönderilen bağlantıya tıklayın.'}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-2xl text-xs text-red-700 dark:text-red-300 text-left space-y-3">
          <div className="flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
          {user && !confirmed && (
            <button
              onClick={handleResendConfirmation}
              disabled={resending}
              className="w-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-orange-600 dark:text-orange-400 text-xs font-bold py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
              <span>{resending ? 'Gönderiliyor...' : 'Tekrar Onay Maili Gönder'}</span>
            </button>
          )}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{success}</span>
        </div>
      )}

      {confirmed ? (
        <Link
          href="/"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20"
        >
          <span>Alışverişe Başla</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="space-y-3">
          <Link
            href="/login"
            className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold py-3 px-4 rounded-xl block transition-all"
          >
            Giriş Ekranına Git
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      }
    >
      <ConfirmEmailContent />
    </Suspense>
  );
}
