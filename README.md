# Tinder for Movies - recruitment task for Rumble Fish

This app allows users to either accept or reject a movie recommendation. To accept a recommendation, the user swipes the movie card to the left; to reject it, they swipe it to the right (or click on the appropriate button)

## Installation

To run the code locally first clone this github repository. Inside code editor run

```bash
npm install
```
and then
```bash
npm run dev
```

### Using backend for this application
Additionally I prepared a mock backend for this application which you can find following this [link](https://github.com/Slowikxx/backend_tinder_for_movies).

After cloning the backend repository and running 
```bash
npm install
```
run
```bash
node index.js
```
to run the backend server on port 8080  _(port can be changed by changing PORT_NUMBER variable value in the index.js file)_

After completing these steps the app should work locally on your machine.

## Answers to Additional Questions:

1. **Usage of Context Provider to Decouple Data Fetching from Presentation Layer**:  
   I created a `MoviesProvider` component that handles data fetching from the backend. By using React's context hook, `App.tsx` can easily access the fetched movies, keeping data management separate from the presentation layer.

2. **Testing the Logic for Data Fetching**:  
   I used Postman Agent to test data-fetching logic. By creating GET and PUT requests, I verified the responses that the browser would receive when making these API calls, ensuring that data fetching worked as expected.

   - **Successful call to the GET endpoint, retrieved all movies**:  
     ![SUCCESSFUL_GET](https://github.com/user-attachments/assets/3319d3f4-29c9-4b99-8759-fdbe9b62fb29)

   - **Successful call to the PUT endpoint, accepted a movie**:  
     ![SUCCESSFUL_ACCEPT](https://github.com/user-attachments/assets/ac3427b6-58e7-4c4b-8434-922136e69ab9)

   - **Successful call to the PUT endpoint, rejected a movie**:  
     ![SUCCESSFUL_REJECT](https://github.com/user-attachments/assets/a750ee38-2aea-4026-9f76-b7d025c5d80f)

   - **Updated status of the data after rejecting**:  
     ![status_updated_after_put_call](https://github.com/user-attachments/assets/0cc82829-1949-4b4b-b012-7aa460a14056)

   - **404 Not Found response after providing a non-existent movie ID**:  
     - ![NOT_FOUND_ACCEPT](https://github.com/user-attachments/assets/1e38703e-e755-452b-b532-87e1433d7606)
     - ![NOT_FOUND_REJECTED](https://github.com/user-attachments/assets/01ff9a09-378d-4157-8e99-94b6e01a4eb8)
