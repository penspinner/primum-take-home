# Primum Take-home

This project is my solution for the [Interactive Comments Section](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9) on Frontend Mentor.

Tech stack:

- pnpm monorepo with Turborepo task runner
  - Web
    - Next.js with the new `app` directory
    - Tailwind CSS for styling
    - Playwright for testing
  - Native
    - Expo
    - React Native
- TypeScript
- Prettier for code formatting
- ESLint for code consistency and best practices

## Prerequisites

- This monorepo uses [pnpm](https://pnpm.io/).

- Web integration tests run on Playwright. Playwright browsers must be installed with the command:

  ```
  pnpx playwright install
  ```

- For the native app, you can install [Expo Go](https://expo.dev/client) to run the app on your phone.

## Installation

Node dependencies need to be installed for the project to run:

```
pnpm -r i
```

## Development

To start the web application, run:

```
pnpm dev:web
```

To start the native application, run:

```
pnpm dev:native
```

Note: currently the native application does not work. Being in a monorepo with pnpm, Expo has some problems starting up:

- https://github.com/facebook/react-native/issues/27712

- https://github.com/expo/expo/issues/18038

If I had more time, I would try switching to Yarn to see if the problem goes away.

## Testing

To run integration tests for web, run:

```
pnpm test:web
```
