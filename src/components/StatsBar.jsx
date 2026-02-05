import React from 'react'
import { calculateMonthBills } from '../utils/helpers'

const StatsBar = ({ selectedDate, billData, rates, paidMonths }) => {
  const currentBills = calculateMonthBills(billData, rates, selectedDate, paidMonths)
  
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <div className="text-2xl font-bold text-orange-500">{currentBills.vender1.days}</div>
        <div className="text-sm text-gray-600">Vender 1 Days</div>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <div className="text-2xl font-bold text-purple-500">{currentBills.vender2.days}</div>
        <div className="text-sm text-gray-600">Vender 2 Days</div>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <div className="text-2xl font-bold text-amber-400">{currentBills.vender1.days + currentBills.vender2.days}</div>
        <div className="text-sm text-gray-600">Total Delivery Days</div>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <div className="text-2xl font-bold text-green-700">
          {Object.keys(paidMonths).length}
        </div>
        <div className="text-sm text-gray-600">Paid Months</div>
      </div>
    </div>
  )
}

export default StatsBar