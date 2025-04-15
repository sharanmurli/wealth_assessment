#  Wealth.com Frontend Take-Home Assessment

This project is a React + TypeScript frontend application built to fetch and display a user's asset data using GraphQL. The interface presents grouped asset categories, supports collapsible tables and features a responsive design using MUI components.

---

## 📎 GitHub Repository

🔗 GitHub Link: [https://github.com/sharanmurli/wealth_assessment](https://github.com/sharanmurli/wealth_assessment)  


---

## 🚀 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sharanmurli/wealth_assessment.git
cd wealth_assessment
```

### 2. Install Dependencies

```bash
npm install
# or with yarn
yarn install

```


### 3. Configure Environment Variables

Create a `.env` file at the root of the project and add:

```
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
VITE_WID=ae0df17e-514e-4f52-a0b5-5bfb1adf84c9
```

You can use the second `wid` if needed:
```
VITE_WID=de364d7d-3313-4efe-aae8-99208793a66c
```

### 4. Run the App

Start the frontend dev server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## ⚙️ Tech Stack

- **React 19 + TypeScript**
- **MUI (Material UI)** – for component styling and responsiveness
- **Apollo Client** – for GraphQL API integration
- **Vite** – for fast builds and dev server
- **ESLint + Prettier** – for code linting and formatting

---

## 🧠 Design Decisions

- **MUI as Component Library**: I Chose this for its rich set of accessible and responsive UI components, speeding up development and aligning with modern design principles.
- **Apollo Client**: Used for declarative data fetching and caching, simplifying the integration with GraphQL APIs.
- **Collapsible Tables**: Enables better UX when viewing nested asset categories and subcategories.
- **Asset Modal**: Designed to display `Overview`, `Holdings`, and `Details` dynamically depending on asset structure.
- **Responsive Layout**: Uses MUI's grid and breakpoint system to ensure smooth experience across devices.

---

## 🧪 Features Implemented

- Group assets by `primaryAssetCategory` and `wealthAssetType`
- Show collapsible sub-tables for each subcategory
- Modal with tabs:
  - `Overview`: Value and Date
  - `Holdings`: Dynamic table with collapsible breakdown
  - `Details`: Parsed and formatted view of JSON-based asset metadata
- Fallback handling for missing fields
- Responsive and mobile-friendly layout
- Loading and error states for GraphQL

---

## ⚠️ Trade-Offs & Limitations

- **Hardcoded WID**: To simulate API usage, we use a hardcoded user ID via `.env`. In a full app, authentication and user context would handle this.
- **Basic Styling**: Focused on functionality and clarity over detailed pixel-perfect design due to time constraints.
- **Partial Data Mapping**: Only relevant assetInfo fields are shown in `Details`. A schema definition could improve robustness.

---

🔧 Future Enhancements
- Robust Error Handling
Improve user feedback by displaying detailed error messages for API failures, missing fields, and invalid data, along with appropriate UI fallbacks.

- Mobile-Friendly Asset Interaction
Optimize the UI for mobile devices by refining collapsible sections, improving touch targets, and ensuring smooth scrolling and responsiveness.

- Search and Filter Functionality
Allow users to quickly locate assets by implementing search and filtering options based on asset type, category, or keyword.

- Dark Mode Support
Add a toggle for light/dark themes using MUI's theme customization features, enhancing accessibility and user preference.

---

## 🔌 API Integration

### Backend Setup

Follow the steps provided in `TROUBLESHOOTING.md` and backend `index.ts` to spin up the GraphQL server.

### Sample GraphQL Query:

```graphql
query GetAssets($wid: String!) {
  getAssets(wid: $wid) {
    assetId
    nickname
    wealthAssetType
    primaryAssetCategory
    balanceCurrent
    balanceAsOf
    assetInfo
    holdings {
      majorAssetClasses {
        majorClass
        assetClasses {
          minorAssetClass
          value
        }
      }
    }
  }
}
```

---



- Ensure that the backend GraphQL server is running on `http://localhost:4000/graphql`


---

