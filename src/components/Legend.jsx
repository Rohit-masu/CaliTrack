import React from 'react'

const Legend = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="font-semibold mb-3">Color Legend</h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-orange-400 rounded-full mr-3"></div>
          <span>Vender 1 only</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-purple-500 rounded-full mr-3"></div>
          <span>Vender 2 only</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-purple-500 rounded-full mr-3"></div>
          <span>Both venders</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 border border-green-200 bg-green-50 rounded-full mr-3"></div>
          <span>Paid month (cannot edit)</span>
        </div>
      </div>
    </div>
  )
}

export default Legend