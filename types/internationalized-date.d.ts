declare module '@internationalized/date' {
  export class CalendarDate {
    constructor(year: number, month: number, day: number);
    year: number;
    month: number;
    day: number;
    add(duration: { years?: number; months?: number; days?: number }): CalendarDate;
    subtract(duration: { years?: number; months?: number; days?: number }): CalendarDate;
    toDate(timezone: string): Date;
  }

  export class DateFormatter {
    constructor(locale: string, options?: { dateStyle?: 'full' | 'long' | 'medium' | 'short' });
    format(date: Date): string;
  }

  export type DateValue = CalendarDate;

  export function getLocalTimeZone(): string;
}
