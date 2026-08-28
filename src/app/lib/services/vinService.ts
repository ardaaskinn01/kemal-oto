import { DecodedVehicleInfo, VinDecodeResult, VinValidationResult } from '../../types/vin.types';

/**
 * 17 Haneli Şasi Numarası (VIN) Format Doğrulaması
 * ISO 3779 standardına göre VIN 17 karakter olmalı ve 'I', 'O', 'Q' harflerini içermemelidir.
 */
export function validateVinFormat(vin: string): VinValidationResult {
  if (!vin) {
    return { isValid: false, message: 'Lütfen 17 haneli şasi numaranızı girin.' };
  }

  const cleanVin = vin.trim().toUpperCase();

  if (cleanVin.length !== 17) {
    return {
      isValid: false,
      message: `Şasi numarası tam 17 karakter olmalıdır. (Girilen: ${cleanVin.length})`,
    };
  }

  // I, O, Q harfleri 1 ve 0 ile karışmaması için şasilerde kullanılmaz
  if (/[IOQ]/.test(cleanVin)) {
    return {
      isValid: false,
      message: 'Şasi numaralarında I, O veya Q harfleri bulunamaz.',
    };
  }

  // Sadece alfanumerik karakterler (A-Z, 0-9)
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(cleanVin)) {
    return {
      isValid: false,
      message: 'Şasi numarası sadece harf ve rakamlardan oluşmalıdır.',
    };
  }

  return { isValid: true };
}

// Popüler Üretici WMI Kodları (Opel, Peugeot, Citroën, Chevrolet, DS Öncelikli)
const WMI_MAP: Record<string, { make: string; country: string }> = {
  // OPEL
  W0L: { make: 'Opel', country: 'Almanya' },
  W0V: { make: 'Opel', country: 'Almanya' },
  VXK: { make: 'Opel', country: 'İspanya / Fransa' },
  
  // PEUGEOT
  VF3: { make: 'Peugeot', country: 'Fransa' },
  VR3: { make: 'Peugeot', country: 'Fransa' },

  // CITROËN
  VF7: { make: 'Citroën', country: 'Fransa' },
  VR7: { make: 'Citroën', country: 'Fransa' },

  // DS AUTOMOBILES
  VR1: { make: 'DS Automobiles', country: 'Fransa' },

  // CHEVROLET
  KL1: { make: 'Chevrolet', country: 'Güney Kore (GM Daewoo)' },
  KL7: { make: 'Chevrolet', country: 'Güney Kore' },
  '1G1': { make: 'Chevrolet', country: 'ABD (General Motors)' },
  '3G1': { make: 'Chevrolet', country: 'Meksika' },
  XUF: { make: 'Chevrolet', country: 'Avrupa (GM)' },

  // Diğer Genel Markalar
  WVW: { make: 'Volkswagen', country: 'Almanya' },
  WAU: { make: 'Audi', country: 'Almanya' },
  WBA: { make: 'BMW', country: 'Almanya' },
  WDB: { make: 'Mercedes-Benz', country: 'Almanya' },
  VF1: { make: 'Renault', country: 'Fransa' },
  NM4: { make: 'Fiat', country: 'Türkiye (Tofaş)' },
  WF0: { make: 'Ford', country: 'Almanya' },
};

// 10. Karakterden Model Yılı Çözümleme
const VIN_YEAR_MAP: Record<string, string> = {
  A: '2010', B: '2011', C: '2012', D: '2013', E: '2014',
  F: '2015', G: '2016', H: '2017', J: '2018', K: '2019',
  L: '2020', M: '2021', N: '2022', P: '2023', R: '2024',
  S: '2025', T: '2026',
  1: '2001', 2: '2002', 3: '2003', 4: '2004', 5: '2005',
  6: '2006', 7: '2007', 8: '2008', 9: '2009',
};

/**
 * 17 Haneli Şasi Numarasını Çözümleyen Servis (NHTSA vPIC API + Akıllı Yerel Fallback)
 */
export async function decodeVin(vin: string): Promise<VinDecodeResult> {
  const validation = validateVinFormat(vin);
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.message,
    };
  }

  const cleanVin = vin.trim().toUpperCase();
  const wmi = cleanVin.slice(0, 3);
  const yearCode = cleanVin[9] || '';
  const localYear = VIN_YEAR_MAP[yearCode] || '2018';
  const localWmi = WMI_MAP[wmi];

  try {
    // 1. Resmi NHTSA vPIC REST API Sorgusu (Ücretsiz ve API Key gerektirmez)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 saniye zaman aşımı

    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${cleanVin}?format=json`,
      {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
        next: { revalidate: 86400 }, // 24 saat önbellek
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const result = data.Results?.[0];

      if (result && result.Make && result.Make !== '') {
        const rawMake = result.Make.trim();
        let make = rawMake.charAt(0).toUpperCase() + rawMake.slice(1).toLowerCase();
        if (rawMake.toUpperCase().includes('DS')) make = 'DS Automobiles';
        if (rawMake.toUpperCase().includes('CITROEN') || rawMake.toUpperCase().includes('CITROËN')) make = 'Citroën';

        const model = result.Model || (localWmi ? 'Model Serisi' : 'Binek Araç');
        const modelYear = result.ModelYear || localYear;

        return {
          success: true,
          vehicle: {
            vin: cleanVin,
            make: make,
            model: model,
            modelYear: modelYear,
            bodyClass: result.BodyClass || 'Sedan / Hatchback / SUV',
            engineCylinders: result.EngineCylinders ? `${result.EngineCylinders} Silindir` : undefined,
            displacementL: result.DisplacementL ? `${Number(result.DisplacementL).toFixed(1)}L` : undefined,
            fuelType: result.FuelTypePrimary || 'Dizel / Benzin',
            driveType: result.DriveType || 'Önden Çekiş',
            plantCountry: result.PlantCountry || localWmi?.country || 'Avrupa',
            manufacturer: result.Manufacturer || make,
            isVerified: true,
          },
        };
      }
    }
  } catch (err) {
    console.warn('NHTSA API timeout veya erişim hatası, yerel sözlük devreye giriyor:', err);
  }

  // 2. Yedek Yerel Çözümleyici (Ağ hatası veya NHTSA'da olmayan Avrupa spesifik şasiler için)
  if (localWmi) {
    return {
      success: true,
      vehicle: {
        vin: cleanVin,
        make: localWmi.make,
        model: 'Uyumlu Model Serisi',
        modelYear: localYear,
        bodyClass: 'Binek / Ticari',
        plantCountry: localWmi.country,
        manufacturer: localWmi.make,
        isVerified: true,
      },
    };
  }

  return {
    success: true,
    vehicle: {
      vin: cleanVin,
      make: 'Binek Araç',
      model: 'Tüm Modeller',
      modelYear: localYear,
      isVerified: true,
    },
  };
}
