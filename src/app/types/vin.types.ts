export interface DecodedVehicleInfo {
  vin: string;
  make: string;
  model: string;
  modelYear: string;
  bodyClass?: string;
  engineCylinders?: string;
  displacementL?: string;
  fuelType?: string;
  driveType?: string;
  plantCountry?: string;
  manufacturer?: string;
  isVerified: boolean;
}

export interface VinDecodeResult {
  success: boolean;
  message?: string;
  vehicle?: DecodedVehicleInfo;
  error?: string;
}

export interface VinValidationResult {
  isValid: boolean;
  message?: string;
}
