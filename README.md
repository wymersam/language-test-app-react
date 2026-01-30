# Carl-Schurz Haus English Language Test

A comprehensive English language assessment application designed for the Carl-Schurz Haus language school. This interactive test helps students determine their English proficiency level and provides personalized course recommendations.

## 🌐 Live Demo

**[Take the Test Now](https://language-test-app.netlify.app)**

## ✨ Features

- **Comprehensive Assessment**: Multi-level English language evaluation
- **Progressive Testing**: Basic tests (A1-B2) and Advanced tests (C1-C2)
- **Real-time Scoring**: Instant feedback and progress tracking
- **Personalized Results**: Custom recommendations based on performance
- **Contact Integration**: Direct course inquiry form with test results
- **Performance Optimized**: Lazy loading, code splitting, and optimized fonts
- **Accessibility Compliant**: ARIA labels and screen reader support
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🎯 Test Structure

### Pretest Questions

Initial assessment to understand student background and learning preferences

### Basic Tests (Questions 1-40)

- **LanguageTestOne**: Foundation vocabulary and grammar
- **LanguageTestTwo-Six**: Progressive difficulty covering A1-B2 levels

### Advanced Tests (Questions 41-60)

- **AdvancedTestOne-Three**: Advanced English for B2+ and C-level students

### Results & Recommendations

- Detailed score breakdown
- CEFR level classification (A1-C2)
- Personalized course recommendations
- Direct contact form for enrollment

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/wymersam/language-test-app-react.git

# Navigate to project directory
cd language-test-app-react

# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts

- **`npm start`** - Runs the app in development mode on [http://localhost:3000](http://localhost:3000)
- **`npm test`** - Launches the test runner with comprehensive score validation
- **`npm run build`** - Creates optimized production build
- **`npm run preview`** - Preview the production build locally

## 🏗️ Technical Architecture

### Built With

- **React 19.2.4** - Modern React with hooks and concurrent features
- **Vite 7.3.1** - Fast build tool with HMR and optimization
- **Vitest 2.1.0** - Lightning-fast testing framework
- **JavaScript ES2022** - Modern JavaScript features

### Key Components

```shell
src/
├── components/
│   ├── PretestQuestions.jsx     # Initial assessment
│   ├── LanguageTests/
│   │   ├── BasicTests/         # A1-B2 level tests
│   │   └── AdvancedTests/      # B2+ and C-level tests
│   ├── ResultsPages/           # Score calculation and display
│   └── ContactUs.jsx           # Course inquiry form
├── questions/                  # Test question data
└── utils/                     # Helper functions
```

## 🧪 Testing

Comprehensive test suite includes:

- Component rendering validation
- Score calculation accuracy
- User interaction flows
- Accessibility compliance
- Performance metrics

Run tests with detailed coverage:

```bash
npm test
```

## 🎨 Styling & Design

- **Custom CSS**: Responsive design with CSS variables
- **Typography**: Google Fonts (Rubik) with system fallbacks
- **Color Scheme**: Carl-Schurz Haus brand colors (Aubergine primary)
- **Accessibility**: High contrast ratios and screen reader support

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

Deployed on Netlify with automatic builds from the master branch:

- **Production URL**: [https://language-test-app.netlify.app](https://language-test-app.netlify.app)
- **Build Command**: `npm run build`
- **Output Directory**: `build/`

## 👤 Author

**Sammy-Jo Wymer**

- Developer & Designer
- Created for Carl-Schurz Haus, Freiburg

## 📄 License

This project is developed specifically for Carl-Schurz Haus educational purposes.

---

_Take your English language assessment and discover your perfect course match!_
