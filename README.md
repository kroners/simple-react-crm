# Leads & Prospects from CRM

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available scripts

- `npm run start`: run project
- `npm run test`: run test
- `npm run coverage`: run test with coverage

## Project details

Steps for project:

1. Create markup for solution
2. Add possible APIs -> json file
3. Apply logic to simulate lead to prospect behavior
4. Add styling
5. Apply test. Setup for jest

Assumptions for project:

- Set a couple of counters for leads and prospects
- External service will be unknown so I'll just apply a random value to get a conditional result
- Set external service as a promise to simulate a real scenario where user awaits for a response from an upstream
- Set a default list of prospects from mock data that will be turned to leads
- Mock data for leads is displayed in a table with a Validate CTA
- A lead that do not get a proper qualification remains as a lead
- The function for internal prospect qualification holds a conditional check from the two external services results. Once the user passes that conditional check, the service will call for the other service/function to get a random qualification value
- As the project does not request error handling, it will not be applied. There's some else statements with alert to show an error
- Once a user gets a proper qualification, the function will remove that user from the leads list and update the counters for both leads and prospects

Ideas to improve:

- Ask for a way to handle those users that do not get a proper qualification. Maybe set in the internal state of the app an additional flag for each user to disable the validate action
- Apply router logic to separate a view similar to a dashboard that holds the counter for leads and prospects, and a second view for a table of leads. Then when the validation for a user triggers, instead of removing the user from that list, we could just update a value for that user like a flag specifying that it is now a prospect, and then go back to the dashboard view to see the updated counter. This will allow to test for state management and routing logic.

WIP tasks:

- Test coverage for components
- Fix assertions to solve mock implementations
