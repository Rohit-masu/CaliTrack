import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { getDateString, getMarkerColor, getMonthKey } from '../utils/helpers'

const CalendarSection = ({
  selectedDate,
  setSelectedDate,
  billData,
  paidMonths,
  handleDayClick,
  isMonthPaid
}) => {
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = getDateString(date)
      const status = billData[dateStr]
      
      if (!isMonthPaid(date) && status && status !== 'none') {
        return (
          <div className="flex justify-center mt-1">
            <div className={`w-3 h-3 rounded-full ${getMarkerColor(status)}`}></div>
          </div>
        )
      }
    }
    return null
  }

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isMonthPaid(date)) {
        return 'bg-green-50 opacity-70'
      }
    }
    return ''
  }

  const currentMonthPaid = isMonthPaid(selectedDate)

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          {currentMonthPaid && (
            <div className="text-sm text-green-600 font-medium flex items-center mt-1">
              <span className="mr-1">✅</span> Month Paid
            </div>
          )}
        </div>
      </div>

      <Calendar
        onClickDay={handleDayClick}
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={tileContent}
        tileClassName={tileClassName}
        className="w-full border-0"
      />
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
  <h3 className="font-semibold mb-2">How CaliTrack works:</h3>
  <ul className="text-sm text-gray-600 space-y-1">
    <li>• Click a date to mark milk delivery for that day</li>
    <li>• Multiple vendors on the same day are shown using mixed colors</li>
    <li>• Monthly bill is calculated automatically based on marked days</li>
    <li>• Mark a month as paid once the bill is settled</li>
    <li>• Paid months are locked and visually marked with ✅</li>
    <li>• Your data is saved locally and never gets deleted</li>
  </ul>
</div>

    </div>
  )
}

export default CalendarSection