export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  district: string;
  postalCode: string;
  countryCode: string;
}

export interface ShippingItem {
  id: string;
  title: string;
  partNumber: string;
  quantity: number;
  weightKg: number;
  dimensionsCm: {
    length: number;
    width: number;
    height: number;
  };
}

export interface CargoOptimizationResult {
  totalWeightKg: number;
  totalVolumetricWeight: number; // Desi: (L * W * H) / 5000 (IATA standard)
  chargeableWeight: number; // Max of actual weight vs volumetric weight
  recommendedPackageType: 'SMALL_BOX' | 'MEDIUM_BOX' | 'HEAVY_DUTY_CRATE' | 'PALLET';
  estimatedCostTRY: number;
  estimatedDeliveryDays: number;
  isFreeShipping: boolean;
}

export type DHLShipmentStatus = 
  | 'ORDER_PLACED'
  | 'LABEL_CREATED'
  | 'PICKED_UP_BY_DHL'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION';

export interface TrackingCheckpoint {
  id: string;
  timestamp: string;
  location: string;
  status: DHLShipmentStatus;
  description: string;
}

export interface DHLTrackingInfo {
  trackingNumber: string;
  orderId: string;
  carrier: 'DHL Express' | 'DHL eCommerce';
  status: DHLShipmentStatus;
  statusText: string;
  senderAddress: string;
  recipientAddress: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate?: string;
  packageDetails: {
    weightKg: number;
    desi: number;
    packageType: string;
    itemCount: number;
  };
  checkpoints: TrackingCheckpoint[];
  labelUrl?: string;
}

export interface CreateShipmentPayload {
  orderId: string;
  recipient: ShippingAddress;
  items: ShippingItem[];
  serviceType?: 'DHL_EXPRESS_DOMESTIC' | 'DHL_ECONOMY_DOMESTIC';
}

export interface CreateShipmentResponse {
  success: boolean;
  trackingNumber: string;
  carrier: string;
  labelUrl: string;
  estimatedDeliveryDate: string;
  optimizedCargo: CargoOptimizationResult;
  message?: string;
}
