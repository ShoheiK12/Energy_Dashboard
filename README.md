# Energy Dashboard

## Overview

Energy Dashboard is a responsive web application that allows users to track and visualize their daily energy consumption.

Users can add, update, and delete energy records, view consumption trends through an interactive chart, and monitor key statistics with KPI cards. All data is stored locally using the browser's LocalStorage, allowing records to persist after page refreshes.

---

## Features

* Create, update, and delete energy consumption records (CRUD)
* Visualize energy usage trends using Chart.js
* Display key metrics with KPI cards:

  * Total energy consumption
  * Average daily consumption
  * Highest consumption
  * Total number of records
* Filter data by:

  * All records
  * Last 7 days
  * Last 30 days
* Store data persistently using LocalStorage
* Input validation with user-friendly error messages
* Toast notifications for successful actions
* Responsive dashboard design for mobile and desktop devices

---

## Technologies Used

* React
* JavaScript (ES6+)
* Vite
* Chart.js
* React Chart.js 2
* HTML5
* CSS3
* LocalStorage

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/Energy_Dashboard.git
```

2. Navigate to the project folder:

```bash
cd Energy_Dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

---

## How to Use

1. Select a date and enter the energy usage in kWh.
2. Click the **Add** button to save the record.
3. If a record for the same date already exists, the application automatically updates the existing data.
4. View energy trends in the interactive line chart.
5. Use the filter buttons to display all records, the last 7 days, or the last 30 days.
6. Remove unnecessary records using the Delete button.

---

## Future Improvements

Possible future enhancements include:

* Edit mode with dedicated update controls
* Data export as CSV files
* Dark mode support
* User authentication and cloud database integration
* Automated testing with Vitest and React Testing Library

---

## Learning Outcomes

Through this project, I gained experience with:

* React hooks (useState and useEffect)
* Component-based architecture
* State management
* CRUD operations
* LocalStorage data persistence
* Data visualization with Chart.js
* Form validation and user feedback
* Responsive UI design

---

## Author

Shohei Kotera

