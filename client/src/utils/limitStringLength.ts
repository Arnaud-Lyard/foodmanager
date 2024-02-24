export function limitStringLength(str: string, limit: number): string {
  return str.substring(0, limit) + '...';
}
