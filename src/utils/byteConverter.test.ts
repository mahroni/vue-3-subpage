import { describe, expect, it } from 'vitest';

import {
  type ByteUnit,
  convertByteUnit,
  convertBytes,
  formatBytes,
  fromBytes,
  parseBytes,
  toBytes,
} from './byteConverter';

describe('Byte Converter Utils', () => {
  describe('convertBytes', () => {
    it('should convert bytes to appropriate units (decimal)', () => {
      expect(convertBytes(0)).toEqual({
        value: 0,
        unit: 'B',
        formatted: '0 B',
      });

      expect(convertBytes(500)).toEqual({
        value: 500,
        unit: 'B',
        formatted: '500 B',
      });

      expect(convertBytes(1024)).toEqual({
        value: 1.02,
        unit: 'KB',
        formatted: '1.02 KB',
      });

      expect(convertBytes(1500000)).toEqual({
        value: 1.5,
        unit: 'MB',
        formatted: '1.5 MB',
      });

      expect(convertBytes(2147483648)).toEqual({
        value: 2.15,
        unit: 'GB',
        formatted: '2.15 GB',
      });
    });

    it('should convert bytes to appropriate units (binary)', () => {
      expect(convertBytes(1024, { binary: true })).toEqual({
        value: 1,
        unit: 'KB',
        formatted: '1 KB',
      });

      expect(convertBytes(1048576, { binary: true })).toEqual({
        value: 1,
        unit: 'MB',
        formatted: '1 MB',
      });

      expect(convertBytes(1073741824, { binary: true })).toEqual({
        value: 1,
        unit: 'GB',
        formatted: '1 GB',
      });
    });

    it('should respect precision option', () => {
      expect(convertBytes(1234, { precision: 0 })).toEqual({
        value: 1,
        unit: 'KB',
        formatted: '1 KB',
      });

      expect(convertBytes(1234, { precision: 4 })).toEqual({
        value: 1.234,
        unit: 'KB',
        formatted: '1.234 KB',
      });
    });

    it('should throw error for negative values', () => {
      expect(() => convertBytes(-100)).toThrow('Bytes cannot be negative');
    });
  });

  describe('convertByteUnit', () => {
    it('should convert between different units (decimal)', () => {
      expect(convertByteUnit(1, 'KB', 'B')).toEqual({
        value: 1000,
        unit: 'B',
        formatted: '1000 B',
      });

      expect(convertByteUnit(1, 'MB', 'KB')).toEqual({
        value: 1000,
        unit: 'KB',
        formatted: '1000 KB',
      });

      expect(convertByteUnit(2.5, 'GB', 'MB')).toEqual({
        value: 2500,
        unit: 'MB',
        formatted: '2500 MB',
      });
    });

    it('should convert between different units (binary)', () => {
      expect(convertByteUnit(1, 'KB', 'B', { binary: true })).toEqual({
        value: 1024,
        unit: 'B',
        formatted: '1024 B',
      });

      expect(convertByteUnit(1, 'MB', 'KB', { binary: true })).toEqual({
        value: 1024,
        unit: 'KB',
        formatted: '1024 KB',
      });
    });

    it('should handle same unit conversion', () => {
      expect(convertByteUnit(5, 'MB', 'MB')).toEqual({
        value: 5,
        unit: 'MB',
        formatted: '5 MB',
      });
    });

    it('should respect precision option', () => {
      expect(convertByteUnit(1.234567, 'MB', 'KB', { precision: 3 })).toEqual({
        value: 1234.567,
        unit: 'KB',
        formatted: '1234.567 KB',
      });
    });

    it('should throw error for negative values', () => {
      expect(() => convertByteUnit(-1, 'KB', 'MB')).toThrow('Value cannot be negative');
    });

    it('should throw error for invalid units', () => {
      expect(() => convertByteUnit(1, 'INVALID' as ByteUnit, 'MB')).toThrow(
        'Invalid source unit: INVALID'
      );
      expect(() => convertByteUnit(1, 'KB', 'INVALID' as ByteUnit)).toThrow(
        'Invalid target unit: INVALID'
      );
    });
  });

  describe('toBytes', () => {
    it('should convert to bytes (decimal)', () => {
      expect(toBytes(1, 'B')).toBe(1);
      expect(toBytes(1, 'KB')).toBe(1000);
      expect(toBytes(1, 'MB')).toBe(1000000);
      expect(toBytes(1, 'GB')).toBe(1000000000);
      expect(toBytes(1, 'TB')).toBe(1000000000000);
      expect(toBytes(1, 'PB')).toBe(1000000000000000);
    });

    it('should convert to bytes (binary)', () => {
      expect(toBytes(1, 'B', { binary: true })).toBe(1);
      expect(toBytes(1, 'KB', { binary: true })).toBe(1024);
      expect(toBytes(1, 'MB', { binary: true })).toBe(1048576);
      expect(toBytes(1, 'GB', { binary: true })).toBe(1073741824);
      expect(toBytes(1, 'TB', { binary: true })).toBe(1099511627776);
      expect(toBytes(1, 'PB', { binary: true })).toBe(1125899906842624);
    });

    it('should handle fractional values', () => {
      expect(toBytes(0.5, 'KB')).toBe(500);
      expect(toBytes(2.5, 'MB')).toBe(2500000);
    });

    it('should throw error for negative values', () => {
      expect(() => toBytes(-1, 'KB')).toThrow('Value cannot be negative');
    });

    it('should throw error for invalid units', () => {
      expect(() => toBytes(1, 'INVALID' as ByteUnit)).toThrow('Invalid unit: INVALID');
    });
  });

  describe('fromBytes', () => {
    it('should convert from bytes to specific unit (decimal)', () => {
      expect(fromBytes(1000, 'B')).toEqual({
        value: 1000,
        unit: 'B',
        formatted: '1000 B',
      });

      expect(fromBytes(1000, 'KB')).toEqual({
        value: 1,
        unit: 'KB',
        formatted: '1 KB',
      });

      expect(fromBytes(1500000, 'MB')).toEqual({
        value: 1.5,
        unit: 'MB',
        formatted: '1.5 MB',
      });
    });

    it('should convert from bytes to specific unit (binary)', () => {
      expect(fromBytes(1024, 'KB', { binary: true })).toEqual({
        value: 1,
        unit: 'KB',
        formatted: '1 KB',
      });

      expect(fromBytes(1048576, 'MB', { binary: true })).toEqual({
        value: 1,
        unit: 'MB',
        formatted: '1 MB',
      });
    });

    it('should respect precision option', () => {
      expect(fromBytes(1234, 'KB', { precision: 4 })).toEqual({
        value: 1.234,
        unit: 'KB',
        formatted: '1.234 KB',
      });
    });

    it('should throw error for negative values', () => {
      expect(() => fromBytes(-1000, 'KB')).toThrow('Bytes cannot be negative');
    });

    it('should throw error for invalid units', () => {
      expect(() => fromBytes(1000, 'INVALID' as ByteUnit)).toThrow('Invalid unit: INVALID');
    });
  });

  describe('formatBytes', () => {
    it('should format bytes with appropriate unit', () => {
      expect(formatBytes(0)).toBe('0 B');
      expect(formatBytes(500)).toBe('500 B');
      expect(formatBytes(1024)).toBe('1.02 KB');
      expect(formatBytes(1500000)).toBe('1.5 MB');
    });

    it('should respect options', () => {
      expect(formatBytes(1024, { binary: true })).toBe('1 KB');
      expect(formatBytes(1234, { precision: 3 })).toBe('1.234 KB');
    });
  });

  describe('parseBytes', () => {
    it('should parse valid byte strings (decimal)', () => {
      expect(parseBytes('0 B')).toBe(0);
      expect(parseBytes('500 B')).toBe(500);
      expect(parseBytes('1 KB')).toBe(1000);
      expect(parseBytes('1.5 MB')).toBe(1500000);
      expect(parseBytes('2 GB')).toBe(2000000000);
    });

    it('should parse valid byte strings (binary)', () => {
      expect(parseBytes('1 KiB')).toBe(1024);
      expect(parseBytes('1 MiB')).toBe(1048576);
      expect(parseBytes('1 GiB')).toBe(1073741824);
    });

    it('should handle various formats', () => {
      expect(parseBytes('1KB')).toBe(1000);
      expect(parseBytes('1.5MB')).toBe(1500000);
      expect(parseBytes('  2 GB  ')).toBe(2000000000);
    });

    it('should throw error for invalid formats', () => {
      expect(() => parseBytes('invalid')).toThrow('Invalid byte format: invalid');
      expect(() => parseBytes('1.5')).toThrow('Invalid byte format: 1.5');
      expect(() => parseBytes('1.5 INVALID')).toThrow('Invalid byte format: 1.5 INVALID');
      expect(() => parseBytes('')).toThrow('Invalid byte format: ');
    });

    it('should throw error for unknown units', () => {
      expect(() => parseBytes('1.5 ZB')).toThrow('Invalid byte format: 1.5 ZB');
    });
  });

  describe('Edge cases and integration', () => {
    it('should handle very large numbers', () => {
      const largeBytes = 1e15; // 1 PB
      const result = convertBytes(largeBytes);
      expect(result.unit).toBe('PB');
      expect(result.value).toBe(1);
    });

    it('should handle very small numbers', () => {
      const smallBytes = 1;
      const result = convertBytes(smallBytes);
      expect(result.unit).toBe('B');
      expect(result.value).toBe(1);
    });

    it('should maintain consistency in round-trip conversions', () => {
      const originalBytes = 1234567;
      const converted = convertBytes(originalBytes);
      const backToBytes = toBytes(converted.value, converted.unit);
      expect(Math.abs(backToBytes - originalBytes)).toBeLessThanOrEqual(10000);
    });

    it('should handle precision edge cases', () => {
      expect(convertBytes(999, { precision: 0 })).toEqual({
        value: 999,
        unit: 'B',
        formatted: '999 B',
      });

      expect(convertBytes(1000, { precision: 0 })).toEqual({
        value: 1,
        unit: 'KB',
        formatted: '1 KB',
      });
    });
  });
});
