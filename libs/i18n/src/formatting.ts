import { DateTimeFormatOptions, NumberFormatOptions } from './types';

// Date formatting utilities
export function formatDate(
  date: Date,
  locale: string,
  options?: DateTimeFormatOptions
): string {
  const formatOptions: Intl.DateTimeFormatOptions = {};

  switch (options?.format) {
    case 'short':
      formatOptions.dateStyle = 'short';
      break;
    case 'medium':
      formatOptions.dateStyle = 'medium';
      break;
    case 'long':
      formatOptions.dateStyle = 'long';
      break;
    case 'full':
      formatOptions.dateStyle = 'full';
      break;
    default:
      formatOptions.dateStyle = 'medium';
  }

  if (options?.timeZone) {
    formatOptions.timeZone = options.timeZone;
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}

// Time formatting utilities
export function formatTime(
  date: Date,
  locale: string,
  options?: DateTimeFormatOptions
): string {
  const formatOptions: Intl.DateTimeFormatOptions = {};

  switch (options?.format) {
    case 'short':
      formatOptions.timeStyle = 'short';
      break;
    case 'medium':
      formatOptions.timeStyle = 'medium';
      break;
    case 'long':
      formatOptions.timeStyle = 'long';
      break;
    case 'full':
      formatOptions.timeStyle = 'full';
      break;
    default:
      formatOptions.timeStyle = 'short';
  }

  if (options?.timeZone) {
    formatOptions.timeZone = options.timeZone;
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}

// Number formatting utilities
export function formatNumber(
  number: number,
  locale: string,
  options?: NumberFormatOptions
): string {
  const formatOptions: Intl.NumberFormatOptions = {
    style: options?.style || 'decimal',
    minimumFractionDigits: options?.minimumFractionDigits,
    maximumFractionDigits: options?.maximumFractionDigits,
  };

  if (options?.style === 'currency' && options?.currency) {
    formatOptions.currency = options.currency;
  }

  return new Intl.NumberFormat(locale, formatOptions).format(number);
}

// Currency formatting utilities
export function formatCurrency(
  amount: number,
  locale: string,
  currency: string = 'USD'
): string {
  return formatNumber(amount, locale, {
    style: 'currency',
    currency,
  });
}

// Relative time formatting
export function formatRelativeTime(
  date: Date,
  locale: string,
  baseDate: Date = new Date()
): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  const diffInSeconds = (date.getTime() - baseDate.getTime()) / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInWeeks = diffInDays / 7;
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInDays / 365;

  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(Math.round(diffInSeconds), 'second');
  } else if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(Math.round(diffInMinutes), 'minute');
  } else if (Math.abs(diffInHours) < 24) {
    return rtf.format(Math.round(diffInHours), 'hour');
  } else if (Math.abs(diffInDays) < 7) {
    return rtf.format(Math.round(diffInDays), 'day');
  } else if (Math.abs(diffInWeeks) < 4) {
    return rtf.format(Math.round(diffInWeeks), 'week');
  } else if (Math.abs(diffInMonths) < 12) {
    return rtf.format(Math.round(diffInMonths), 'month');
  } else {
    return rtf.format(Math.round(diffInYears), 'year');
  }
}

// List formatting
export function formatList(
  items: string[],
  locale: string,
  type: 'conjunction' | 'disjunction' = 'conjunction'
): string {
  // Fallback for browsers/environments that don't support Intl.ListFormat
  if (typeof (Intl as any).ListFormat !== 'undefined') {
    return new (Intl as any).ListFormat(locale, { style: 'long', type }).format(items);
  }
  
  // Simple fallback implementation
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  
  const separator = type === 'conjunction' ? ' and ' : ' or ';
  return items.slice(0, -1).join(', ') + separator + items[items.length - 1];
}