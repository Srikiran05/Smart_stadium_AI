# SmartStadium AI: GenAI Command Center for FIFA World Cup 2026

## 🎯 Problem Statement Alignment
This project directly addresses the challenge of optimizing stadium logistics, enhancing fan experience, and managing crowd intelligence for mega-events like the FIFA World Cup 2026. By integrating Google's Gemini Advanced Large Language Models (LLMs) into a unified operational dashboard, SmartStadium AI solves real-world bottlenecks in accessibility, language barriers, and crowd surges.

## 🚀 Key Features & Solutions

### 1. Fan Navigator (Multilingual LLM Assistant)
*Problem Solved*: Language barriers and complex stadium layouts confuse international fans.
*AI Solution*: A real-time, context-aware chatbot powered by **Google Gemini 3.5 Flash** that automatically detects the user's language and provides precise navigational instructions for seating, food, and facilities.

### 2. Crowd Intelligence (Predictive Load Balancing)
*Problem Solved*: Dangerous gate surges and uneven crowd distribution.
*AI Solution*: The system feeds live (mocked) stadium metrics into the AI model, which generates split-second operational reports and recommends precise crowd diversion tactics to prevent stampedes and reduce wait times.

### 3. Accessibility & Sustainability Advisor
*Problem Solved*: Fans with specific needs (wheelchair, sensory, dietary) struggle to plan their match day.
*AI Solution*: Users input their parameters, and the AI generates a personalized, highly accessible itinerary including quiet zones and sustainable transit options.

### 4. Transport Optimizer
*Problem Solved*: Post-match congestion and public transit bottlenecks.
*AI Solution*: AI-generated, multi-step optimal journey plans that calculate the most efficient transport modes (train, bus, walking) to ensure smooth ingress and egress.

## 🛠️ Technical Implementation & Code Quality
- **Framework**: React.js with Vite for lightning-fast HMR and optimized builds.
- **Security**: Strict Content Security Policy (CSP) headers and **DOMPurify** implemented across all AI outputs and user inputs to prevent XSS vulnerabilities.
- **Accessibility (a11y)**: Semantic HTML (`<main>`, `<section>`, `<nav>`), ARIA labels, `aria-live` regions, and keyboard-navigable components ensure WCAG compliance.
- **Testing**: Comprehensive unit test suite built with **Vitest** and **React Testing Library**, covering component rendering and DOM manipulation.
- **Documentation**: Extensive JSDoc comments for all utility functions and components to maintain high code quality and enterprise standards.

## 📦 Local Development
1. Clone the repository
2. Run `npm install`
3. Add your `VITE_GEMINI_API_KEY` to a `.env` file
4. Run `npm run dev`
5. Run `npm test` to execute the test suite

*Built for Hack2Skill.*
