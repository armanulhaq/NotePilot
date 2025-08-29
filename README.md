# NotePilot

NotePilot is a full-stack note-taking application that allows users to create, manage, and store their notes securely. It features a modern, user-friendly interface and a robust backend to ensure a seamless user experience.

## Features

-   **User Authentication:** Secure sign-up and login functionality using Firebase.
-   **Rich Text Editor:** A powerful and intuitive editor for creating and formatting notes, built with Tiptap.
-   **CRUD Functionality:** Create, read, update, and delete notes with ease.
-   **Responsive Design:** A clean and responsive UI built with React, TypeScript, and Tailwind CSS.

## Tech Stack

**Client:**

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   Firebase
-   Tiptap

**Server:**

-   Node.js
-   Express
-   Prisma

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js
-   npm
-   A PostgreSQL database (NeonDB in this case)

### Installation

1.  **Clone the repo**

    ```sh
    git clone https://github.com/armanulhaq/NotePilot.git
    ```

2.  **Install NPM packages for the client**

    ```sh
    cd client
    npm i
    ```

3.  **Install NPM packages for the server**

    ```sh
    cd ../server
    npm i
    ```

4.  **Set up environment variables**

    -   Create a `.env` file in the `client` directory and add your Firebase configuration keys.
    -   Create a `.env` file in the `server` directory and add your `DATABASE_URL`.

5.  **Start the development servers**

    -   For the client, run:

        ```sh
        npm run dev
        ```

    -   For the server, run:

        ```sh
        npm run start
        ```
