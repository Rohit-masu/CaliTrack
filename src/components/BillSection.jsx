import React from 'react'
import { calculateMonthBills, getMonthKey } from '../utils/helpers'

const BillSection = ({
  selectedDate,
  rates,
  setRates,
  billData,
  paidMonths,
  resetVendor,
  isMonthPaid,
  markAsPaid
}) => {
  const currentBills = calculateMonthBills(billData, rates, selectedDate, paidMonths)
  const isCurrentMonthPaid = isMonthPaid(selectedDate)
  
  // Calculate previous month
  const prevDate = new Date(selectedDate)
  prevDate.setMonth(prevDate.getMonth() - 1)
  const previousBills = calculateMonthBills(billData, rates, prevDate, paidMonths)
  const hasPreviousMonthData = previousBills.total > 0

  return (
    <div className="space-y-6">
      {/* Current Month Bill */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {selectedDate.toLocaleString('default', { month: 'long' })} Bill
          </h2>
          {isCurrentMonthPaid && (
            <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
              ✅ Paid
            </span>
          )}
        </div>
        
        <div className="space-y-4">
          {/* Rate Inputs */}
          <div className="space-y-3">
            <h3 className="font-medium">Set Rates (per day)</h3>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Vender 1</label>
                <div className="flex items-center">
                  <span className="mr-2">₹</span>
                  <input
                    type="number"
                    value={rates.vender1}
                    onChange={(e) => setRates(prev => ({...prev, vender1: Number(e.target.value) || 0}))}
                    className="w-full border rounded px-3 py-2"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Vender 2</label>
                <div className="flex items-center">
                  <span className="mr-2">₹</span>
                  <input
                    type="number"
                    value={rates.vender2}
                    onChange={(e) => setRates(prev => ({...prev, vender2: Number(e.target.value) || 0}))}
                    className="w-full border rounded px-3 py-2"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="border-t pt-4">
            <div className="space-y-3">
              <div className={`p-3 rounded border ${isCurrentMonthPaid ? 'bg-gray-50' : 'bg-orange-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">Vender 1</span>
                    <div className="text-sm text-gray-600">
                      {currentBills.vender1.days} days × ₹{rates.vender1}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-lg font-semibold">₹{currentBills.vender1.amount}</div>
                    {!isCurrentMonthPaid && (
                      <button
                        onClick={() => resetVendor('vender1')}
                        className="text-sm bg-orange-100 text-orange-700 hover:bg-orange-200 px-2 py-1 rounded"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className={`p-3 rounded border ${isCurrentMonthPaid ? 'bg-gray-50' : 'bg-purple-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">Vender 2</span>
                    <div className="text-sm text-gray-600">
                      {currentBills.vender2.days} days × ₹{rates.vender2}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-lg font-semibold">₹{currentBills.vender2.amount}</div>
                    {!isCurrentMonthPaid && (
                      <button
                        onClick={() => resetVendor('vender2')}
                        className="text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 px-2 py-1 rounded"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className={`flex justify-between items-center p-3 rounded border-t ${
                isCurrentMonthPaid ? 'bg-gray-100' : 'bg-green-50'
              }`}>
                <span className="font-bold">Total</span>
                <div className={`text-xl font-bold ${
                  isCurrentMonthPaid ? 'text-gray-600' : 'text-green-600'
                }`}>
                  ₹{currentBills.total}
                </div>
              </div>
              
              {/* Mark as Paid Button */}
              <button
                onClick={markAsPaid}
                disabled={isCurrentMonthPaid || currentBills.total === 0}
                className={`w-full py-3 rounded font-medium transition ${
                  isCurrentMonthPaid
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : currentBills.total > 0
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isCurrentMonthPaid ? 'Month Already Paid' : '✅ Mark as Paid'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Month Unpaid Bill */}
      {hasPreviousMonthData && (
        <div className="bg-white rounded-xl shadow-md p-4 border border-orange-200">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">
            Previous Month Pending
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2">
              <div>
                <span className="font-medium">Vender 1</span>
                <div className="text-sm text-gray-600">
                  {previousBills.vender1.days} days × ₹{rates.vender1}
                </div>
              </div>
              <div className="text-lg font-semibold">₹{previousBills.vender1.amount}</div>
            </div>
            
            <div className="flex justify-between items-center p-2">
              <div>
                <span className="font-medium">Vender 2</span>
                <div className="text-sm text-gray-600">
                  {previousBills.vender2.days} days × ₹{rates.vender2}
                </div>
              </div>
              <div className="text-lg font-semibold">₹{previousBills.vender2.amount}</div>
            </div>
            
            <div className="flex justify-between items-center p-2 border-t">
              <span className="font-bold">Total Pending</span>
              <div className="text-xl font-bold text-orange-600">₹{previousBills.total}</div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Status */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="font-semibold mb-3">Payment Status</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Current Month:</span>
            <span className={isCurrentMonthPaid ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
              {isCurrentMonthPaid ? '✅ Paid' : '🔄 Unpaid'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Paid Months:</span>
            <span className="font-bold">{Object.keys(paidMonths).length}</span>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Data is preserved forever. "Mark as Paid" only changes payment status.
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillSection