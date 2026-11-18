Project Overview

The PawHome Adoption Form is a React component developed as part of the PawHome pet adoption platform. It allows people interested in adopting a pet to submit an adoption application by providing their personal information, details about their home, and reasons for wanting to adopt.

The form also displays information about the selected pet, helping ensure that the application is connected to the correct animal.

The project uses React and Tailwind CSS to provide a responsive, user-friendly interface that matches PawHome's design.


### Testing
Run:

npm test


AddForm Component -PawHome

Overview

The AddForm component allows users to add new pets to the PawHome adoption platform. It provides a form where users can enter a pet's details and submit Athem to the application's database.

Features

Add a pet's name and breed.

Enter the pet's age and gender.

Specify the adoption fee.

Provide a URL for the pet's image.

Add a description of the pet.

Validate required fields before submission.

Display success and error messages.

Show a loading state while the pet is being submitted.

Send new pet details to the JSON Server API using a POST request.

How It Works

The user fills in the pet information.

The component validates the required fields.

The adoption fee is converted into a number.

The form sends the pet information to the API using a POST request.

When successful, the form displays a success message and clears the fields.

If an error occurs, an error message is displayed.

API Endpoint

POST http://localhost:3001/pets

The component expects JSON Server to be running on port 3001.







