'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface ShippingSettings {
  cost: number; // 2500 TL altı kargo ücreti (varsayılan: 150 TL)
  freeThreshold: number; // Ücretsiz kargo limiti (varsayılan: 2500 TL)
  carrier: string; // 'DHL Express'
}

interface ShippingSettingsContextType {
  shippingSettings: ShippingSettings;
  updateShippingSettings: (newSettings: Partial<ShippingSettings>) => Promise<boolean>;
  calculateShipping: (cartTotal: number) => { shippingCost: number; isFree: boolean; remainingForFree: number };
  loading: boolean;
}

const DEFAULT_SETTINGS: ShippingSettings = {
  cost: 150,
  freeThreshold: 2500,
  carrier: 'DHL Express',
};

const STORAGE_KEY = 'kemal_oto_shipping_settings';

const ShippingSettingsContext = createContext<ShippingSettingsContextType | undefined>(undefined);

export function ShippingSettingsProvider({ children }: { children: React.ReactNode }) {
  const [shippingSettings, setShippingSettings] = useState<ShippingSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // 1. Load from Supabase (site_settings) or localStorage or fallback
  useEffect(() => {
    async function loadSettings() {
      try {
        // Try loading from localStorage first for instant hydration
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) {
          setShippingSettings(JSON.parse(local));
        }

        // Fetch from Supabase site_settings
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('key', 'shipping_settings')
          .single();

        if (data && !error && data.value) {
          const remoteSettings = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
          setShippingSettings(remoteSettings);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteSettings));
        }
      } catch (err) {
        console.warn('Kargo ayarları yüklenirken yerel ayarlar kullanıldı:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  const updateShippingSettings = async (newSettings: Partial<ShippingSettings>): Promise<boolean> => {
    try {
      const merged = { ...shippingSettings, ...newSettings };
      setShippingSettings(merged);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

      // Save to Supabase site_settings table
      await supabase.from('site_settings').upsert({
        key: 'shipping_settings',
        value: merged,
        updated_at: new Date().toISOString(),
      });

      return true;
    } catch (err) {
      console.error('Kargo ayarları kaydedilemedi:', err);
      return false;
    }
  };

  const calculateShipping = (cartTotal: number) => {
    const isFree = cartTotal >= shippingSettings.freeThreshold;
    const shippingCost = isFree ? 0 : shippingSettings.cost;
    const remainingForFree = Math.max(0, shippingSettings.freeThreshold - cartTotal);

    return { shippingCost, isFree, remainingForFree };
  };

  return (
    <ShippingSettingsContext.Provider
      value={{
        shippingSettings,
        updateShippingSettings,
        calculateShipping,
        loading,
      }}
    >
      {children}
    </ShippingSettingsContext.Provider>
  );
}

export function useShippingSettings() {
  const context = useContext(ShippingSettingsContext);
  if (!context) {
    throw new Error('useShippingSettings must be used within a ShippingSettingsProvider');
  }
  return context;
}
