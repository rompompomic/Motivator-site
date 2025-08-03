# Project Overview

## Overview

This is a grunge/brutalist-inspired motivational website built as a full-stack application. The site aims to inspire users and provide ideas for self-realization through an integrated AI chat system. It features a dark aesthetic with green color schemes, glitch effects, and VHS-style visual elements. The main functionality centers around an AI-powered chat interface that uses OpenAI's GPT-4o-mini model to provide motivational guidance, project ideas, and life improvement suggestions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: TailwindCSS with custom grunge/brutalist design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for scroll-based animations and interactive effects
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **API Design**: RESTful API with a single chat endpoint (`/api/chat`)
- **Development Setup**: Hot reload with Vite integration in development mode
- **Error Handling**: Centralized error middleware with proper status codes
- **Request Logging**: Custom middleware for API request logging

### Database and Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL with Neon Database serverless connection
- **Schema Management**: Centralized schema definition in shared directory
- **Development Storage**: In-memory storage implementation for development
- **Migration System**: Drizzle Kit for database migrations

### Authentication and Authorization
- **Current State**: Basic user schema defined but no active authentication system
- **Schema**: Users table with username/password fields
- **Session Storage**: PostgreSQL session store configured (connect-pg-simple)

### Visual Design System
- **Color Palette**: Green-focused (matrix green, acid green, emerald) with dark backgrounds
- **Effects**: Noise backgrounds, VHS lines, glitch animations, floating elements
- **Typography**: Monospace fonts with glitch text effects
- **Layout**: Non-traditional, chaotic but readable brutalist design
- **Animations**: Mouse-responsive parallax effects, flickering text, floating motivational phrases

## External Dependencies

### AI Integration
- **OpenAI API**: GPT-4o-mini model for chat functionality
- **Configuration**: Environment variable-based API key management
- **Usage**: Motivational coaching with short, practical responses

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: Environment variable-based database URL configuration

### UI and Animation Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Framer Motion**: Production-ready motion library for React animations
- **TailwindCSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool with TypeScript support and hot reload
- **ESBuild**: JavaScript bundler for production builds
- **Drizzle Kit**: Database toolkit for schema management and migrations
- **TanStack Query**: Powerful data synchronization for React applications

### Third-party Assets
- **Unsplash**: Image hosting for profile pictures in quotes section
- **Custom Fonts**: Industrial/grunge typography for authentic aesthetic