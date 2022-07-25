# Frontend Coding Challenge

## Project's Title

Address Book

## Description

If the address book is empty, the user should be able to lookup address by postcode or enter address manually.

The user should be able to switch between 2 modes (lookup or manual entry). Once the address is selected or manually entered, it should be saved to the address book.

When searching for address by postcode, the user should be presented with results and be able to select an address.The address should include line1-3, postcode, town and country. When entering the address manually, line1, postcode, town and country are mandatory fields.

Country should be a combobox with autosuggestion from a drop down list. When searching by postcode, use [https://getaddress.io/](https://getaddress.io/) API (sign up with an email to get free trial).You should handle different error cases and display relevant error messages, e.g. wrong postcode.

The style should match Bequest's branding as closely as you can replicate.How to submit:

### What does the application do

This app allows you to add addresses to your address book, either manually or by searching by postcode (UK only)

### Technologies I use in the App

- React
- Typescript
- Style-Components
- React testing library
- React-query
- Mui for UI https://mui.com/

### Some challenge that I have faced

The first challenge I have had to face is whether to make a typical architecture or a hexagonal architecture. After evaluating it, I have been thinking about making it hexagonal, since in my point of view it has quite a few positive points such as:

- Abstraction of calls to apis: If you want to modify something in the call, you have to go directly to its file without having to touch anything in the first instance in the UI.
- If in the future, you want to migrate to another framework (such as vue or others) you just have to uninstall react, install vue and go to the ui directory and modify the template
- The classes that are at the Entity level are those that define the business and then, you create them only once and they are used for calls to the apis, their response, and in the UI and we do not have to create several interfaces and make them cross.

Another challenge is knowing whether to pass the information through a context (such as useContext) or create a mini api to send the information and then read it.
I have thought it more appropriate, with the help of json-server, to create a server that accepts http requests and thus be able to demonstrate that I have the knowledge to make different get, post ... requests.

Another thing that I have enjoyed has been the handling of the data with react-query, with this library you forget to do the data handling and you delegate it to the library.

The solution is that the components look the same as in your UI, I have rewritten them, but the ideal would be to create a UI library with a storybook and from there be able to customize them and then import them into the base project to be able to build blocks.

Then what costs me the most is testing, but even so I continue to training and read a lot on the internet, in forums and especially watching tutorials.

## How to use the App

1.- Install all packages with `npm i`
2.- `npm run server`
3.- `npm run start`

A browser window will open and you will be able to see the app:

you can see on the right, that you can search by zip code. To search by zip code you have to write at least 3 characters and then hit search and you can also introduce yourself through a registration form

## Install

Please to install use `npm`:

```
npm install
```

## Run the application

```
npm run server
```

```
npm run start
```

## For testing

```
yarn testing
```

## Bibliography

- [React-query](https://react-query-v3.tanstack.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [react-hooks-testing-library](https://www.npmjs.com/package/@testing-library/react-hooks)
- [Axios](https://axios-http.com/)
- [Hexagonal architecture frontend github](https://github.com/juanm4/hexagonal-architecture-frontend)
- [Comparison | React Query vs SWR vs Apollo vs RTK Query vs React Router](https://react-query-v3.tanstack.com/comparison)
