'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DecodedVehicleInfo } from '../types/vin.types';
import { Product } from '../types/database.types';

export interface GarageVehicle {
  id: string;
  vin?: string;
  make: string;
  model: string;
  year: string;
  fuelType?: string;
  engine?: string;
  createdAt: string;
}

interface GarageContextType {
  savedVehicles: GarageVehicle[];
  activeVehicle: GarageVehicle | null;
  addVehicle: (vehicle: Omit<GarageVehicle, 'id' | 'createdAt'>) => GarageVehicle;
  removeVehicle: (id: string) => void;
  setActiveVehicle: (vehicle: GarageVehicle | null) => void;
  isProductCompatible: (product: Product) => { compatible: boolean; reason?: string };
  isGarageModalOpen: boolean;
  setIsGarageModalOpen: (open: boolean) => void;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

const STORAGE_KEY_VEHICLES = 'kemal_oto_garage_vehicles';
const STORAGE_KEY_ACTIVE = 'kemal_oto_active_vehicle';

export function GarageProvider({ children }: { children: React.ReactNode }) {
  const [savedVehicles, setSavedVehicles] = useState<GarageVehicle[]>([]);
  const [activeVehicle, setActiveVehicleState] = useState<GarageVehicle | null>(null);
  const [isGarageModalOpen, setIsGarageModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load saved vehicles and active vehicle from localStorage on mount
  useEffect(() => {
    try {
      const storedVehicles = localStorage.getItem(STORAGE_KEY_VEHICLES);
      const storedActive = localStorage.getItem(STORAGE_KEY_ACTIVE);

      if (storedVehicles) {
        const parsed = JSON.parse(storedVehicles);
        setSavedVehicles(parsed);

        if (storedActive) {
          const parsedActive = JSON.parse(storedActive);
          setActiveVehicleState(parsedActive);
        } else if (parsed.length > 0) {
          setActiveVehicleState(parsed[0]);
        }
      }
    } catch (e) {
      console.error('Garaj verileri yüklenirken hata:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(savedVehicles));
    } catch (e) {
      console.error('Garaj araçları kaydedilemedi:', e);
    }
  }, [savedVehicles, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (activeVehicle) {
        localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(activeVehicle));
      } else {
        localStorage.removeItem(STORAGE_KEY_ACTIVE);
      }
    } catch (e) {
      console.error('Aktif araç kaydedilemedi:', e);
    }
  }, [activeVehicle, isLoaded]);

  const addVehicle = (vehicleData: Omit<GarageVehicle, 'id' | 'createdAt'>): GarageVehicle => {
    // Check if vehicle already exists (by VIN or by make+model+year)
    const existing = savedVehicles.find(
      (v) =>
        (vehicleData.vin && v.vin && v.vin.toUpperCase() === vehicleData.vin.toUpperCase()) ||
        (v.make.toLowerCase() === vehicleData.make.toLowerCase() &&
          v.model.toLowerCase() === vehicleData.model.toLowerCase() &&
          v.year === vehicleData.year)
    );

    if (existing) {
      setActiveVehicleState(existing);
      return existing;
    }

    const newVehicle: GarageVehicle = {
      ...vehicleData,
      id: 'veh-' + Date.now(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newVehicle, ...savedVehicles];
    setSavedVehicles(updated);
    setActiveVehicleState(newVehicle);
    return newVehicle;
  };

  const removeVehicle = (id: string) => {
    const updated = savedVehicles.filter((v) => v.id !== id);
    setSavedVehicles(updated);

    if (activeVehicle && activeVehicle.id === id) {
      setActiveVehicleState(updated.length > 0 ? updated[0] : null);
    }
  };

  const setActiveVehicle = (vehicle: GarageVehicle | null) => {
    setActiveVehicleState(vehicle);
  };

  // Check product compatibility against currently active vehicle
  const isProductCompatible = (product: Product): { compatible: boolean; reason?: string } => {
    if (!activeVehicle) {
      return { compatible: true };
    }

    // Universal compatibility check
    const hasUniversal = product.vehicle_compatibility?.some((vc) =>
      vc.brand.toLowerCase().includes('evrensel')
    );
    if (hasUniversal) {
      return { compatible: true, reason: 'Evrensel Uyumlu Parça' };
    }

    const targetMake = activeVehicle.make.toLowerCase();
    const targetModel = activeVehicle.model.toLowerCase();

    const match = product.vehicle_compatibility?.find((vc) => {
      const brandMatch =
        vc.brand.toLowerCase().includes(targetMake) || targetMake.includes(vc.brand.toLowerCase());
      if (!brandMatch) return false;

      // If model specified, check model match
      if (targetModel && targetModel !== 'tüm modeller' && targetModel !== 'model') {
        const modelMatch =
          vc.model.toLowerCase().includes(targetModel) || targetModel.includes(vc.model.toLowerCase());
        return modelMatch;
      }

      return true;
    });

    if (match) {
      return {
        compatible: true,
        reason: `${match.brand} ${match.model} (${match.years}) ile %100 Uyumlu`,
      };
    }

    return {
      compatible: false,
      reason: `Seçili aracınız (${activeVehicle.make} ${activeVehicle.model}) ile uyumlu değildir.`,
    };
  };

  return (
    <GarageContext.Provider
      value={{
        savedVehicles,
        activeVehicle,
        addVehicle,
        removeVehicle,
        setActiveVehicle,
        isProductCompatible,
        isGarageModalOpen,
        setIsGarageModalOpen,
      }}
    >
      {children}
    </GarageContext.Provider>
  );
}

export function useGarage() {
  const context = useContext(GarageContext);
  if (!context) {
    throw new Error('useGarage must be used within a GarageProvider');
  }
  return context;
}
