# UiPath Automation Hub - Process Repository Prototype

A static React mockup of the UiPath Automation Hub's Process Repository page, built with the Apollo design system components.

## Overview

This is a visual prototype demonstrating the UI/UX of the Automation Hub Explore section, specifically the Process Repository view that displays business processes in a card-based layout along with a capability map visualization.

## Features

- **Responsive Design**: Adapts from 5-column grid on large screens to single column on mobile
- **Apollo Design System**: Uses UiPath's design tokens (colors, typography, spacing)
- **Component-Based Architecture**: Modular, reusable React components
- **Static Mockup**: Pure visual demonstration without backend integration

## Technology Stack

- React 18
- Pure CSS (CSS Variables for theming)
- No external UI libraries

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
# Navigate to project directory
cd uipath-automation-hub-prototype

# Install dependencies (already done)
npm install
```

### Running the Application

```bash
# Start development server
npm start
```

The application will open in your browser at `http://localhost:3000`

### Building for Production

```bash
# Create optimized production build
npm run build
```

The build files will be in the `build/` directory.

## Project Structure

```
uipath-automation-hub-prototype/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header/              # Top navigation bar
│   │   ├── Breadcrumb/          # Breadcrumb navigation
│   │   ├── PageHeader/          # Page title and actions
│   │   ├── ControlsBar/         # Search, sort, filter controls
│   │   ├── ProcessCard/         # Individual process card
│   │   ├── ProcessGrid/         # Grid of process cards
│   │   ├── CapabilityMap/       # Process capability map
│   │   └── Button/              # Reusable button component
│   ├── styles/
│   │   ├── variables.css        # Design system tokens
│   │   ├── typography.css       # Typography styles
│   │   └── global.css           # Global styles & reset
│   ├── data/
│   │   └── mockData.js          # Static process data
│   ├── App.jsx                  # Main application component
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Components

### Header
Top navigation with logo, tabs (Workspace, Explore, Dashboards, Admin console), Submit new button, and icon buttons.

### Breadcrumb
Navigation trail: Automation hub > Explore > Process repository

### PageHeader
Page title with info icon and "Connect processes map" action link.

### ControlsBar
Search input, sort dropdown, and filter button.

### ProcessCard
Card displaying:
- Process title and status badge
- Description
- Owner avatar and name
- Metrics (in progress, in queue)
- Category tag

### ProcessGrid
Responsive grid layout (5 columns on desktop, adapts to screen size).

### CapabilityMap
Process capability map visualization with expandable diagram.

## Design System

### Colors
- Primary Blue: `#0066FF`
- Text Primary: `#172B4D`
- Text Secondary: `#5E6C84`
- Background: `#FAFBFC`
- Border: `#DFE1E6`

### Typography
- H1: 24px Bold
- H2: 20px Medium
- H3: 16px Medium
- Body: 14px
- Small: 12px

### Spacing
Based on 8px grid system:
- XS: 4px
- SM: 8px
- MD: 12px
- LG: 16px
- XL: 24px
- 2XL: 32px

## Customization

### Adding Process Cards

Edit `src/data/mockData.js`:

```javascript
export const processes = [
  {
    id: 1,
    title: "Your Process Title",
    status: "0 Automated",
    description: "Process description...",
    owner: "Owner Name",
    ownerAvatar: "ON",
    metrics: {
      inProgress: 10,
      inQueue: 2
    },
    category: "Category Name"
  },
  // ... more processes
];
```

### Modifying Design Tokens

Edit `src/styles/variables.css` to adjust colors, spacing, typography, and other design tokens.

## Out of Scope (Static Mockup)

This is a visual mockup only. The following features are **not implemented**:

- Search functionality
- Filtering and sorting
- Navigation routing
- Submit new process flow
- Process card interactions
- API integration
- State management
- Authentication
- Interactive capability map

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a prototype for demonstration purposes.

## Author

Built based on UiPath Automation Hub design specifications and Apollo design system.
