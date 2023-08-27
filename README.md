# Marvel App

## Description

This project has the premise of presenting the application created for the front-end selection process, where the challenge is to create a responsive web application that will consume the Marvel API to retrieve information related to its characters.

## Screenshots

### Home
![alt text](https://github.com/brenersrosa/marvel-app/blob/main/public/screenshots/home.png)

### Characters list
![alt text](https://github.com/brenersrosa/marvel-app/blob/main/public/screenshots/characters.png)

### Character details
![alt text](https://github.com/brenersrosa/marvel-app/blob/main/public/screenshots/character-details.png)

## Requirements

Before starting the installation and setup of the project, make sure your system meets the following requirements:

Node.js (version 18.16.0 or higher)
NPM (Node Package Manager) or Yarn

## Installation

Follow the steps below to install and set up the project on your local machine:

1. **Clone the repository**:

   ```shell
   git clone https://github.com/brenersrosa/marvel-app.git
   ```

2. **Navigate to the project directory**:

   ```shell
   cd marvel-app
   ```

3. **Install the dependencies**:

   ```shell
   npm install
   ```

   or, if you're using Yarn:

   ```shell
   yarn install
   ```

4. **Create a configuration file**:
    
    In the project's root directory, create a file named .env following the .env.example template and set the necessary environment variables for the project. For example:
    
    ```
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/<DATABASE_NAME>"
    
    NEXT_PUBLIC_API_BASE_URL=""
    NEXT_PUBLIC_API_PUBLIC_KEY=""
    NEXT_PUBLIC_API_PRIVATE_KEY=""

    GOOGLE_CLIENT_ID=""
    GOOGLE_CLIENT_SECRET=""
    NEXTAUTH_SECRET=""
    ```
    

5. **Create a database with Prisma**:

    After configuring the .env, you need to create the database using the following command:

    ```bash
    npx prisma migrate dev
    ```
    
    This command will create the database.

6. **View the database using Prisma**:

    After creating the database, you can view the data and tables using the following command:

    ```bash
    npx prisma studio
    ```

## Execução

After installing and configuring the project, you can run it using the following command:

```shell
npm run dev
```

or, if you're using Yarn:

```shell
yarn dev
```

This will start the server, and the project will be accessible in your browser at the address http://localhost:3000.

## Licença

This project is licensed under the **[MIT License](https://opensource.org/license/mit/).**