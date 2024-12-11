import React, { useState, useMemo } from 'react';
import { Event } from '../../types/event';
import { TimeRangeSelector, TimeRange } from './charts/TimeRangeSelector';
import { calculateChartData } from '../../utils/chartUtils';

interface SalesChartProps {
  events: Event[];
}

const FIXED_MAX_REVENUE = 100000; // Fixed y-axis maximum at $100,000
const Y_AXIS_STEPS = 5; // Number of steps on y-axis

export function SalesChart({ events }: SalesChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('yearly');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const chartData = useMemo(() => calculateChartData(events, timeRange), [events, timeRange]);

  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
  const totalTickets = chartData.reduce((sum, d) => sum + d.ticketsSold, 0);
  const totalEvents = chartData.reduce((sum, d) => sum + d.eventCount, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Analysis</h3>
        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      </div>

      <div className="h-80">
        <div className="relative h-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-24 w-20 flex flex-col justify-between text-xs text-gray-500">
            {Array.from({ length: Y_AXIS_STEPS + 1 }).map((_, i) => (
              <div key={i} className="text-right pr-2">
                ${((FIXED_MAX_REVENUE * (Y_AXIS_STEPS - i)) / Y_AXIS_STEPS).toLocaleString()}
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div className="absolute left-20 right-0 top-0 bottom-24">
            {/* Grid lines */}
            <div className="absolute inset-0 border-l border-gray-200">
              {Array.from({ length: Y_AXIS_STEPS + 1 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-gray-100"
                  style={{ bottom: `${(i * 100) / Y_AXIS_STEPS}%` }}
                />
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-around">
              {chartData.map((item, index) => {
                const heightPercentage = (item.revenue / FIXED_MAX_REVENUE) * 100;
                return (
                  <div
                    key={index}
                    className="relative flex-1 mx-2"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <div
                      className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 rounded-t"
                      style={{
                        height: `${heightPercentage}%`,
                        minHeight: item.revenue > 0 ? '2px' : '0'
                      }}
                    />
                    
                    {/* Tooltip */}
                    {hoveredBar === index && (
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 z-10 w-48 text-sm">
                        <div className="font-semibold text-gray-900">
                          ${item.revenue.toLocaleString()}
                        </div>
                        <div className="text-gray-600 mt-1">
                          <div>Events: {item.eventCount}</div>
                          <div>Tickets: {item.ticketsSold}</div>
                        </div>
                      </div>
                    )}

                    {/* X-axis label */}
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-indigo-600">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Total Revenue</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">
            {totalTickets.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Total Tickets</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-orange-600">
            {totalEvents}
          </div>
          <div className="text-sm text-gray-500">Total Events</div>
        </div>
      </div>
    </div>
  );
}