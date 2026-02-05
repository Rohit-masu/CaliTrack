// Date formatting helper
export const getDateString = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Get month key for payment tracking
export const getMonthKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

// Marker colors
export const getMarkerColor = (status) => {
  switch(status) {
    case 'vender1':
      return 'bg-orange-400'
    case 'vender2':
      return 'bg-purple-500'
    case 'both':
      return 'bg-gradient-to-r from-orange-400 to-purple-500'
    default:
      return ''
  }
}

// Calculate bills for a specific month
export const calculateMonthBills = (billData, rates, targetDate, paidMonths = {}) => {
  const targetYear = targetDate.getFullYear()
  const targetMonth = targetDate.getMonth()
  
  // Check if month is paid
  const monthKey = getMonthKey(targetDate)
  if (paidMonths[monthKey]) {
    return {
      vender1: { days: 0, amount: 0 },
      vender2: { days: 0, amount: 0 },
      total: 0
    }
  }
  
  let vender1Days = 0
  let vender2Days = 0

  Object.entries(billData).forEach(([dateStr, status]) => {
    const date = new Date(dateStr)
    
    if (date.getFullYear() === targetYear && date.getMonth() === targetMonth) {
      if (status === 'vender1' || status === 'both') {
        vender1Days++
      }
      if (status === 'vender2' || status === 'both') {
        vender2Days++
      }
    }
  })

  return {
    vender1: {
      days: vender1Days,
      amount: vender1Days * rates.vender1
    },
    vender2: {
      days: vender2Days,
      amount: vender2Days * rates.vender2
    },
    total: (vender1Days * rates.vender1) + (vender2Days * rates.vender2)
  }
}