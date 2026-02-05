# 🥛 CaliTrack - Milk Bill Tracker

A simple React application to track monthly milk bills from different vendors with visual calendar marking and automated bill calculation.

## Features

- 📅 Interactive calendar with color-coded delivery markers
- 🎯 Click dates to cycle through delivery options (Vender 1, Vender 2, Both, None)
- 💰 Automatic bill calculation with separate vendor tracking
- 💾 Local storage persistence - data saved in browser
- ✅ Mark months as paid (preserves data, changes status only)
- 🔄 Individual vendor reset options
- 📊 Stats dashboard with delivery day counts
- 🎨 Clean, responsive UI with Tailwind CSS

## Color Coding

- **Orange** = Vender 1 only
- **Purple** = Vender 2 only
- **Gradient** = Both vendors
- **Light Green** = Paid month (cannot edit)

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/caliTrack.git

# Navigate to project
cd caliTrack

# Install dependencies
npm install

# Start development server
npm start
