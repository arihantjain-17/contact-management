
# Contact Management App

The Contact Management App allows users to manage their contact details efficiently. Users can add, edit, and delete contacts, with robust validation for data input. The app provides a user-friendly interface for seamless interaction and a reliable backend for secure and efficient CRUD operations


## Tech Stack

**Client:** React and Material-UI

**Server:** Node.js, Express.js

**Database:** MongoDB
## Features

- Add, edit, and delete contacts with validation.
- Field validations include:
   - Phone number must have 10 digits.
   - Email should follow the `@gmail.com` pattern.
- Alerts for errors and success messages.



## Setup Instructions

Clone the Repository

```bash
git clone https://github.com/arihantjain-17/contact-management.git
cd contact-managementt
```
Install Dependencies

Frontend
```bash
cd Frontend
npm install
```
Backend
```bash
cd Backend
npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=4000`

`mongodb_url=<Your MongoDB Connection String>`


## Start the Application

Start the Backend

```bash
cd Backend
npm run dev

```

Start the Frontend

```bash
cd Frontend
npm run dev

```
## How the App Works

- Frontend:
   - Users interact with forms and buttons to manage their contact data.
   - Validations are performed on the client side before sending data to the server.


- Backend:
   - APIs handle requests for creating, reading, updating, and deleting contacts.
   - Validation and error handling are implemented to ensure data integrity

- Database:
   - MongoDB stores the contact data. Queries are executed efficiently for CRUD operations.
   
## Challenges and Solutions

- Implementing real-time validation for phone numbers and email patterns.
   - Solution: Used regex patterns on both frontend and backend to ensure consistent validation.

- Challenge: Handling duplicate or invalid data.
   - Solution: Added backend checks for duplicate entries and returned descriptive error messages.


   