# Session One React Project

A simple React learning project that builds a blog-style layout with a header, repeated post cards, and a tag sidebar. The app is designed to practice component composition, layout styling, and basic UI structure in React.

## Overview

This project was created as a beginner exercise to explore:

- React component structure
- JSX rendering
- reusable UI sections
- CSS-based page styling
- layout composition in a single-page app

## Features

- Top banner header with project branding
- Multiple post entries displayed in a vertical list
- Sidebar with tag buttons
- Responsive layout using custom CSS
- Clean Create React App setup for quick development

## Tech Stack

- React
- React DOM
- Create React App
- CSS

## Project Structure

```bash
session-one/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── components/
│   │   ├── Button.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Post.js
│   │   ├── Posts.js
│   │   └── Tag.js
│   ├── index.js
│   └── style/
│       ├── button.css
│       ├── headerStyle.css
│       ├── post.css
│       ├── postTagCont.css
│       ├── posts.css
│       └── tag.css
├── package.json
├── README.md
├── .gitignore
└── package-lock.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app locally

```bash
npm start
```

This will start the development server and open the app in your browser at:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm start
```

Runs the app in development mode.

```bash
npm test
```

Launches the test runner.

```bash
npm run build
```

Creates a production build in the `build` folder.

```bash
npm run eject
```

Removes the default build tool configuration if you want full control over the app setup.

## Notes

- This is a static front-end learning project.
- The post content and tags are hardcoded for demonstration purposes.
- Styling is defined in separate CSS files under the `src/style` folder.

## Future Improvements

- Replace hardcoded content with real data
- Add dynamic tag filtering
- Add a post detail page
- Introduce routing and state management
- Connect the app to an API or backend

## Author

This project is a beginner React practice app created for learning frontend development fundamentals.
