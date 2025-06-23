export type ByteUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';

export interface ByteConversionResult {
  value: number;
  unit: ByteUnit;
  formatted: string;
}

export interface ByteConverterOptions {
  precision?: number;
  binary?: boolean; // true for binary (1024), false for decimal (1000)
}

const BYTE_UNITS: ByteUnit[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

const DECIMAL_BASE = 1000;
const BINARY_BASE = 1024;

/**
 * Converts bytes to the most appropriate unit
 * @param bytes - Number of bytes to convert
 * @param options - Conversion options
 * @returns Object containing value, unit, and formatted string
 */
export function convertBytes(
  bytes: number,
  options: ByteConverterOptions = {}
): ByteConversionResult {
  const { precision = 2, binary = false } = options;

  if (bytes === 0) {
    return {
      value: 0,
      unit: 'B',
      formatted: '0 B',
    };
  }

  if (bytes < 0) {
    throw new Error('Bytes cannot be negative');
  }

  const base = binary ? BINARY_BASE : DECIMAL_BASE;
  const exponent = Math.floor(Math.log(bytes) / Math.log(base));
  const unitIndex = Math.min(exponent, BYTE_UNITS.length - 1);
  const unit = BYTE_UNITS[unitIndex] as ByteUnit;
  const value = bytes / Math.pow(base, unitIndex);

  return {
    value: Number(value.toFixed(precision)),
    unit,
    formatted: `${trimTrailingZeros(value.toFixed(precision))} ${unit}`,
  };
}

/**
 * Converts a value from one unit to another
 * @param value - The value to convert
 * @param fromUnit - The source unit
 * @param toUnit - The target unit
 * @param options - Conversion options
 * @returns Object containing value, unit, and formatted string
 */
export function convertByteUnit(
  value: number,
  fromUnit: ByteUnit,
  toUnit: ByteUnit,
  options: ByteConverterOptions = {}
): ByteConversionResult {
  const { precision = 2, binary = false } = options;

  if (value < 0) {
    throw new Error('Value cannot be negative');
  }

  if (!BYTE_UNITS.includes(fromUnit)) {
    throw new Error(`Invalid source unit: ${fromUnit}`);
  }

  if (!BYTE_UNITS.includes(toUnit)) {
    throw new Error(`Invalid target unit: ${toUnit}`);
  }

  const base = binary ? BINARY_BASE : DECIMAL_BASE;

  // Convert to bytes first
  const fromIndex = BYTE_UNITS.indexOf(fromUnit);
  const bytes = value * Math.pow(base, fromIndex);

  // Convert from bytes to target unit
  const toIndex = BYTE_UNITS.indexOf(toUnit);
  const resultValue = bytes / Math.pow(base, toIndex);

  return {
    value: Number(resultValue.toFixed(precision)),
    unit: toUnit,
    formatted: `${trimTrailingZeros(resultValue.toFixed(precision))} ${toUnit}`,
  };
}

/**
 * Converts a value to bytes
 * @param value - The value to convert
 * @param unit - The source unit
 * @param options - Conversion options
 * @returns Number of bytes
 */
export function toBytes(value: number, unit: ByteUnit, options: ByteConverterOptions = {}): number {
  const { binary = false } = options;

  if (value < 0) {
    throw new Error('Value cannot be negative');
  }

  if (!BYTE_UNITS.includes(unit)) {
    throw new Error(`Invalid unit: ${unit}`);
  }

  const base = binary ? BINARY_BASE : DECIMAL_BASE;
  const unitIndex = BYTE_UNITS.indexOf(unit);

  return value * Math.pow(base, unitIndex);
}

/**
 * Converts bytes to a specific unit
 * @param bytes - Number of bytes to convert
 * @param unit - The target unit
 * @param options - Conversion options
 * @returns Object containing value, unit, and formatted string
 */
export function fromBytes(
  bytes: number,
  unit: ByteUnit,
  options: ByteConverterOptions = {}
): ByteConversionResult {
  const { precision = 2, binary = false } = options;

  if (bytes < 0) {
    throw new Error('Bytes cannot be negative');
  }

  if (!BYTE_UNITS.includes(unit)) {
    throw new Error(`Invalid unit: ${unit}`);
  }

  const base = binary ? BINARY_BASE : DECIMAL_BASE;
  const unitIndex = BYTE_UNITS.indexOf(unit);
  const value = bytes / Math.pow(base, unitIndex);

  return {
    value: Number(value.toFixed(precision)),
    unit,
    formatted: `${trimTrailingZeros(value.toFixed(precision))} ${unit}`,
  };
}

/**
 * Formats a byte value with the most appropriate unit
 * @param bytes - Number of bytes to format
 * @param options - Conversion options
 * @returns Formatted string
 */
export function formatBytes(bytes: number, options: ByteConverterOptions = {}): string {
  return convertBytes(bytes, options).formatted;
}

/**
 * Parses a string containing a byte value and unit
 * @param input - String like "1.5 MB" or "1024KB"
 * @param options - Conversion options
 * @returns Number of bytes
 */
export function parseBytes(input: string, options: ByteConverterOptions = {}): number {
  const trimmed = input.trim();
  const match = trimmed.match(/^([\d.]+)\s*([KMGT]?B|[KMGT]?iB)$/i);

  if (!match || !match[1] || !match[2]) {
    throw new Error(`Invalid byte format: ${input}`);
  }

  const value = parseFloat(match[1]);
  const unitStr = match[2].toUpperCase();

  // Map common unit variations
  const unitMap: Record<string, ByteUnit> = {
    B: 'B',
    KB: 'KB',
    KIB: 'KB',
    MB: 'MB',
    MIB: 'MB',
    GB: 'GB',
    GIB: 'GB',
    TB: 'TB',
    TIB: 'TB',
    PB: 'PB',
    PIB: 'PB',
  };

  const unit = unitMap[unitStr];
  if (!unit) {
    throw new Error(`Unknown unit: ${unitStr}`);
  }

  // Use binary base for units ending with 'IB'
  const binary = unitStr.endsWith('IB');

  return toBytes(value, unit, { ...options, binary });
}

function trimTrailingZeros(numStr: string): string {
  return numStr.replace(/\.0+$|\.(\d*?[1-9])0+$/, '.$1').replace(/\.$/, '');
}
