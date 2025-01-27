# MediCamp

## Overview

MediCamp is a Medical Camp Management System (MCMS) built with the MERN stack. It is designed to help organizers and participants seamlessly manage medical camps. The platform provides tools for registration, payment, feedback collection, and detailed camp analytics, ensuring a smooth and efficient experience for all users.

## Live Site

[Visit MediCamp Live Site](https://medi-camp-435d0.web.app)

## Organizer Credentials

- **Username**: organizer@gmail.com
- **Password**: Organizer@123

## Features

1. **User Authentication**: Secure login and registration with support for email/password and social logins.
2. **Home Page**: A vibrant banner section showcasing impactful camp success stories, popular camps, and feedback from participants.
3. **Popular Camps Section**: Displays the top six camps based on participant counts, with detailed information and a "See All Camps" button.
4. **Available Camps Page**: Allows users to view all camps, search by keywords, and sort based on criteria such as participant count, fees, and alphabetical order.
5. **Organizer Dashboard**:
   - **Add A Camp**: Organizers can add camps with details like name, date, fees, location, and description.
   - **Manage Camps**: View, edit, or delete camps using intuitive controls.
   - **Manage Registered Camps**: View participants' details, confirm payments, and cancel registrations.
6. **Participant Dashboard**:
   - **Analytics**: Interactive charts (using Recharts) showcasing the participant's lifetime camp data.
   - **Registered Camps**: Displays registered camp details, feedback options, and payment history.
7. **Camp Details Page**: Offers comprehensive information about each camp and facilitates participant registration through a modal.
8. **Feedback & Ratings**: Participants can provide feedback after successful payment, and these are displayed on the home page.
9. **Payment Integration**: Secure payment processing with Stripe, including transaction ID documentation.
10. **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.

## Technologies Used

- **Frontend**: React, TailwindCSS, DaisyUI, TanStack Query, Axios, React Hook Form, Recharts
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Firebase, JWT
- **Other Libraries**: Stripe for payments, SweetAlert2 for notifications

## Key Features Breakdown

### Authentication

- Fully secure login and registration with Firebase.
- JWT-based authentication for protecting private routes.

### Organizer Functionalities

- Add, update, or delete camps effortlessly.
- Manage participants with detailed information and controls.

### Participant Functionalities

- Easy camp registration and payment process.
- Feedback and rating submission post-camp experience.
- Detailed analytics and payment history.

### Additional Features

- Pagination and search for all tables.
- 404 page for unmatched routes.
- Customizable dashboard layouts for both organizers and participants.

## Project Setup

### Prerequisites

- Node.js (v18+)
- MongoDB
