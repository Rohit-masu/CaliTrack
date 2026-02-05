import React, { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import { getDateString, getMonthKey } from './utils/helpers'
import CalendarSection from './components/CalendarSection'
import BillSection from './components/BillSection'
import StatsBar from './components/StatsBar'
import Legend from './components/Legend'

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [billData, setBillData] = useLocalStorage('caliTrackData', {})
  const [rates, setRates] = useLocalStorage('caliTrackRates', {
    vender1: 25,
    vender2: 30
  })
  const [paidMonths, setPaidMonths] = useLocalStorage('caliTrackPaidMonths', {})

  // Check if month is paid
  const isMonthPaid = (date) => {
    const monthKey = getMonthKey(date)
    return paidMonths[monthKey] || false
  }

  // Handle day click
  const handleDayClick = (date) => {
    if (isMonthPaid(date)) return
    
    const dateStr = getDateString(date)
    const currentStatus = billData[dateStr] || 'none'
    
    let nextStatus
    switch(currentStatus) {
      case 'none':
        nextStatus = 'vender1'
        break
      case 'vender1':
        nextStatus = 'vender2'
        break
      case 'vender2':
        nextStatus = 'both'
        break
      case 'both':
        nextStatus = 'none'
        break
      default:
        nextStatus = 'none'
    }

    setBillData(prev => ({
      ...prev,
      [dateStr]: nextStatus
    }))
  }

  // Reset specific vendor
  const resetVendor = (vendorToReset) => {
    if (isMonthPaid(selectedDate)) return
    
    const currentYear = selectedDate.getFullYear()
    const currentMonth = selectedDate.getMonth()
    
    const newBillData = { ...billData }
    
    Object.keys(newBillData).forEach(dateStr => {
      const date = new Date(dateStr)
      if (date.getFullYear() === currentYear && date.getMonth() === currentMonth) {
        const currentStatus = newBillData[dateStr]
        
        if (vendorToReset === 'vender1') {
          if (currentStatus === 'vender1') {
            delete newBillData[dateStr]
          } else if (currentStatus === 'both') {
            newBillData[dateStr] = 'vender2'
          }
        } else if (vendorToReset === 'vender2') {
          if (currentStatus === 'vender2') {
            delete newBillData[dateStr]
          } else if (currentStatus === 'both') {
            newBillData[dateStr] = 'vender1'
          }
        }
      }
    })
    
    // Clean up
    Object.keys(newBillData).forEach(key => {
      if (!newBillData[key]) {
        delete newBillData[key]
      }
    })
    
    setBillData(newBillData)
  }

  // Mark current month as paid
  const markAsPaid = () => {
    if (isMonthPaid(selectedDate)) return
    
    const monthKey = getMonthKey(selectedDate)
    
    setPaidMonths(prev => ({
      ...prev,
      [monthKey]: true
    }))

    // Move to next month
    const nextMonth = new Date(selectedDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setSelectedDate(nextMonth)
    
    alert('✅ Month marked as paid! You can now start tracking next month.')
  }

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('Clear ALL data including payment history? This cannot be undone!')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🥛 CaliTrack - Milk Bill Tracker
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CalendarSection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            billData={billData}
            paidMonths={paidMonths}
            handleDayClick={handleDayClick}
            isMonthPaid={isMonthPaid}
          />

          <BillSection
            selectedDate={selectedDate}
            rates={rates}
            setRates={setRates}
            billData={billData}
            paidMonths={paidMonths}
            resetVendor={resetVendor}
            isMonthPaid={isMonthPaid}
            markAsPaid={markAsPaid}
          />

          <Legend />
        </div>

        <StatsBar
          selectedDate={selectedDate}
          billData={billData}
          rates={rates}
          paidMonths={paidMonths}
        />

        {/* Danger Zone */}
        <div className="mt-6 bg-white rounded-xl shadow p-4 border border-red-200">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-red-700">⚠️ Danger Zone</h4>
              <p className="text-sm text-gray-600">This will delete ALL data permanently</p>
            </div>
            <button
              onClick={clearAllData}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
            >
              Clear ALL Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App