/** These are declared account data, not a credential verification or digital signature. */
export function accountText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}
export function doctorPrintIdentity(metadata: Record<string, unknown> | undefined) {
  return {
    fullName: accountText(metadata?.['full_name']),
    license: accountText(metadata?.['license']),
    clinic: {
      name: accountText(metadata?.['clinic_name']),
      address: accountText(metadata?.['clinic_address']),
      phone: accountText(metadata?.['clinic_phone']),
    },
  };
}
