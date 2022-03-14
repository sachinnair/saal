# Outline
1. [Project setup](#project-setup)
2. [About the application](#about-the-application)
3. [Code structure](#code-structure)
4. [Requirement clarity](#requirement-clarity)
5. [Scope of improvements](#scope-of-improvements)

## Project Setup

It is an application that was bootstrapped using Create-React-App with typescript template.

One can git clone

```
 git clone git@github.com:sachinnair/saal.git
```

and then run following commands:

```
npm install
npm start
```
This would start project locally. Usually, accessible at http://localhost:3000/

## About the Application
<p align="center"><img src="https://user-images.githubusercontent.com/1617638/158178119-1d38366d-cd25-46c5-84ab-9a36769e1020.png" width="300" />
<img src="https://user-images.githubusercontent.com/1617638/158178228-d1be82f5-2785-4289-aa9c-33b7c3434f0c.png" width="300" />
 </p>

This application is used to populate random list of users from https://randomuser.me/

List of users are populated across pages. For navigation across different pages one may click <i>'Prev'</i> or <i>'Next'</i>.

There is a Search box where users are supposed to enter only valid names including Arabic Characters. It is not functional to search users but can be used to send out as a parameter to API calls. The entered input text is encoded in the URL for reference.

When you click on a Name of the user, additional information about the user will be shown in a Popup. Desktop and Mobile popups are different based on screen width.

When an image is clicked you would be able to view the image in a Lightbox style.

Refreshing the Page would retain the Page and the listing that you are present in. The API calls are cached and so, navigation across already accessed pages with the same URL would not trigger network calls.

## Code Structure

```
src
 - common           // Reusable code
    - app           // App specific common code
    - components    // Components that could be used across different projects
    - helpers       // Utility functions 
    - hooks         // Hooks that could be used across Projects
 - features
        // Feature-wise segregation of components           
 - pages
        // Page focused components which are composed of Components from /feature
 "
 "
 App.tsx
 "
 "
```

## Requirement Clarity:
1. Referring to task (2), was light box as a library expected to be implemented? or a similar implementation was expected?
   Current Implementation: A centrally aligned image is loaded which overlays the application, similar to loader implementation
2. Referring to task (4) - was there an expectation to load all the request data to context Object? 
   Current Implementation: Context is only used to pass the selected user's filtered data. It could be modified to be used as per expectation.
3. Referring to task (5) - Searching by username ideally should be sending it as a parameter to API call, was there an intention to search it from the list of 10 users fetched in a page?  
   Current Implementation: When user input is received in the input box and <i>Search Name</i> is clicked. The search text is encoded and added to the url. 
4. Referring to task (6) - Unclear with the intention of the question.
   Current Implementation - Made use of Query param to save the state of the application.  

## Scope of Improvements

Due to time constraints following areas were missed:
- CSS clutter needs implementation of best practices.
- Readability of the code could be improved.
  

