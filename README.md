# RS Checkout Fields - Shopify App Extensions

This repository contains a collection of Shopify app extensions designed to enhance the checkout experience for merchants. Each extension is modular and focuses on specific functionalities, such as adding custom fields, managing bundles, and providing localized content.

## Overview

This project is built using Shopify's [extension-only app template](https://shopify.dev/docs/apps/build/app-extensions/build-extension-only-app). It includes multiple extensions, each serving a unique purpose to improve the checkout process for Shopify stores.

### Extensions

1. **Additional Note**  
   Adds a custom note field to the checkout process.  
   - Main file: `src/Checkout.jsx`  
   - Locales: `en.default.json`, `fr.json`

2. **Bundle Maker**  
   Allows merchants to create and manage product bundles directly in the checkout.  
   - Main file: `src/BlockExtension.jsx`  
   - Utilities: `utils.js`  
   - Hooks: `useBundleManager.js`  
   - Locales: `en.default.json`, `fr.json`

3. **Country Selector**  
   Provides a dropdown for customers to select their country during checkout.  
   - Main file: `src/BlockExtension.jsx`  
   - Utilities: `utils.js`  
   - Hooks: `useCountriesManager.js`  
   - Locales: `en.default.json`, `fr.json`

4. **Country Selector Draft**  
   A draft version of the Country Selector extension for testing and development purposes.  
   - Main file: `src/BlockExtension.jsx`  
   - Utilities: `utils.js`  
   - Hooks: `useCountriesManager.js`  
   - Locales: `en.default.json`, `fr.json`

5. **Date Field**  
   Adds a date picker field to the checkout process.  
   - Main file: `src/Checkout.jsx`  
   - Locales: `en.default.json`, `fr.json`

6. **Fields**  
   A generic extension for adding custom fields to the checkout.  
   - Main file: `src/Checkout.jsx`  
   - Locales: `en.default.json`, `fr.json`

## Getting Started

### Requirements

1. Install [Node.js](https://nodejs.org/en/download/).
2. Create a [Shopify partner account](https://partners.shopify.com/signup).
3. Set up a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

### Installation

Clone the repository and install dependencies using your preferred package manager:

Using yarn:
```shell
yarn install
```

Using npm:
```shell
npm install
```

Using pnpm:
```shell
pnpm install
```

### Local Development

Use the [Shopify CLI](https://shopify.dev/docs/apps/tools/cli) to connect to your app in the Shopify Partners dashboard. Run the following command to start local development:

Using yarn:
```shell
yarn dev
```

Using npm:
```shell
npm run dev
```

Using pnpm:
```shell
pnpm run dev
```

Open the URL generated in your console to preview the app extensions.

## Project Structure

```
extensions/
├── additional-note/
│   ├── src/
│   │   └── Checkout.jsx
│   ├── locales/
│   │   ├── en.default.json
│   │   └── fr.json
├── bundle-maker/
│   ├── src/
│   │   ├── BlockExtension.jsx
│   │   ├── utils.js
│   │   └── hooks/
│   │       └── useBundleManager.js
│   ├── locales/
│   │   ├── en.default.json
│   │   └── fr.json
├── country-selector/
│   ├── src/
│   │   ├── BlockExtension.jsx
│   │   ├── utils.js
│   │   └── hooks/
│   │       └── useCountriesManager.js
│   ├── locales/
│   │   ├── en.default.json
│   │   └── fr.json
├── country-selector-draft/
│   ├── src/
│   │   ├── BlockExtension.jsx
│   │   ├── utils.js
│   │   └── hooks/
│   │       └── useCountriesManager.js
│   ├── locales/
│   │   ├── en.default.json
│   │   └── fr.json
├── date-field/
│   ├── src/
│   │   └── Checkout.jsx
│   ├── locales/
│   │   ├── en.default.json
│   │   └── fr.json
├── fields/
│   ├── src/
│   │   └── Checkout.jsx
│   ├── locales/
│   │   ├── en.default.json
│   │   └── fr.json
```

## Developer Resources

- [Shopify App Development](https://shopify.dev/docs/apps/getting-started)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [App Extensions](https://shopify.dev/docs/apps/build/app-extensions)

## License

This project is licensed under the terms of the MIT license.
