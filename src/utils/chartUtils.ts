import { Event } from '../types/event';
import {
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachYearOfInterval,
  isSameMonth,
  isSameQuarter,
  isSameYear,
  subMonths,
  subYears,
  format
} from 'date-fns';
import { TimeRange } from '../components/admin/charts/TimeRangeSelector';

interface ChartDataPoint {
  label: string;
  revenue: number;
  ticketsSold: number;
  eventCount: number;
}

export function calculateChartData(events: Event[], timeRange: TimeRange): ChartDataPoint[] {
  const now = new Date();
  let intervals: Date[];
  let formatStr: string;
  let filterFn: (date: Date, interval: Date) => boolean;

  switch (timeRange) {
    case 'last6months':
      intervals = eachMonthOfInterval({
        start: subMonths(now, 5),
        end: now
      });
      formatStr = 'MMM';
      filterFn = isSameMonth;
      break;

    case 'monthly':
      intervals = eachMonthOfInterval({
        start: subMonths(now, 11),
        end: now
      });
      formatStr = 'MMM';
      filterFn = isSameMonth;
      break;

    case 'quarterly':
      intervals = eachQuarterOfInterval({
        start: subYears(now, 1),
        end: now
      });
      formatStr = 'QQQ yyyy';
      filterFn = isSameQuarter;
      break;

    case 'yearly':
      intervals = eachYearOfInterval({
        start: subYears(now, 4),
        end: now
      });
      formatStr = 'yyyy';
      filterFn = isSameYear;
      break;

    default:
      return [];
  }

  return intervals.map(interval => {
    const periodEvents = events.filter(event => 
      filterFn(new Date(event.date), interval)
    );

    return {
      label: format(interval, formatStr),
      revenue: periodEvents.reduce((sum, event) => 
        sum + (event.capacity - event.remainingSpots) * event.price, 0
      ),
      ticketsSold: periodEvents.reduce((sum, event) => 
        sum + (event.capacity - event.remainingSpots), 0
      ),
      eventCount: periodEvents.length
    };
  });
}