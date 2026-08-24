import { CargoOptimizationResult, ShippingItem } from '../../types/shipping.types';

/**
 * Otomotiv parçalarının (ağır fren diskleri, amortisörler veya hafif filtre/ampuller)
 * sepet bazında en verimli koli ve desi hesaplamasını yapan optimizasyon motoru.
 */
export function optimizeAutomotiveCargo(
  items: ShippingItem[],
  orderTotalAmountTRY: number = 0
): CargoOptimizationResult {
  if (!items || items.length === 0) {
    return {
      totalWeightKg: 0.5,
      totalVolumetricWeight: 1,
      chargeableWeight: 1,
      recommendedPackageType: 'SMALL_BOX',
      estimatedCostTRY: 0,
      estimatedDeliveryDays: 1,
      isFreeShipping: true,
    };
  }

  let totalWeight = 0;
  let totalVolumeCm3 = 0;

  items.forEach((item) => {
    const qty = item.quantity || 1;
    totalWeight += (item.weightKg || 1) * qty;

    const dims = item.dimensionsCm || { length: 20, width: 15, height: 10 };
    const itemVolume = dims.length * dims.width * dims.height;
    totalVolumeCm3 += itemVolume * qty;
  });

  // IATA Standart Desi Formülü: Hacim (cm³) / 5000
  // Güvenlik ve ambalaj payı için %15 eklenir
  const volumetricWeight = Math.ceil((totalVolumeCm3 * 1.15) / 5000);
  const chargeableWeight = Math.max(Math.ceil(totalWeight), volumetricWeight);

  // Koli Tipi Seçimi
  let packageType: CargoOptimizationResult['recommendedPackageType'] = 'SMALL_BOX';
  if (chargeableWeight > 35) {
    packageType = 'PALLET';
  } else if (chargeableWeight > 15 || totalWeight > 20) {
    packageType = 'HEAVY_DUTY_CRATE';
  } else if (chargeableWeight > 4) {
    packageType = 'MEDIUM_BOX';
  }

  // DHL Fiyat Algoritması (TL Bazlı)
  // Taban ücret 85 TL + her ek desi/kg için 12 TL
  let estimatedCost = 85 + Math.max(0, chargeableWeight - 1) * 12;

  // Ağır metal parça paketleme ve kırılabilir koruma ek ücreti
  if (packageType === 'HEAVY_DUTY_CRATE') {
    estimatedCost += 45;
  }

  // 1500 TL Üzeri Ücretsiz Kargo Kuralı
  const isFreeShipping = orderTotalAmountTRY >= 1500;

  return {
    totalWeightKg: Number(totalWeight.toFixed(2)),
    totalVolumetricWeight: volumetricWeight,
    chargeableWeight,
    recommendedPackageType: packageType,
    estimatedCostTRY: isFreeShipping ? 0 : Math.round(estimatedCost),
    estimatedDeliveryDays: chargeableWeight > 30 ? 2 : 1, // Şehir içi / yakın illere ertesi gün teslimat
    isFreeShipping,
  };
}
