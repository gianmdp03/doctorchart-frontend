export interface DoctorSignature {
  id: number;
  name: string;
  stampText: string;
  isFavorite: boolean;
  width: number;
  height: number;
  sha256: string;
  createdAt: string;
  updatedAt: string;
}

export type SignatureChoice =
  | { mode: 'DEFAULT' }
  | { mode: 'NONE' }
  | { mode: 'SELECTED'; signatureId: number };

export interface CreateDoctorSignatureRequest {
  name: string;
  stampText: string;
  imageBase64: string;
  isFavorite?: boolean;
}

export interface UpdateDoctorSignatureRequest {
  name?: string;
  stampText?: string;
  imageBase64?: string;
  isFavorite?: boolean;
}
