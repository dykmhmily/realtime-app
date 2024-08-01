#### Diagram

```
          +-------------+     +----------------+     +---------+
          |   Frontend  | <-> |  Backend API   | <-> | CoinAPI |
          +-------------+     +----------------+     +---------+
                |                    |
                |                    |
                v                    v
              +--------------------------+
              |       Cache Layer        |
              +--------------------------+
```

#### Components

1. **Frontend**

   - React + `requestAnimationFrame`
   - Fetches data from the Backend API.
   - Displays real-time cryptocurrency prices.
   - Implements responsive design to ensure a great user experience on various devices.

2. **Backend**

   - Node.js + Express
   - Acts as a proxy between the frontend and CoinAPI.
   - Fetches data from CoinAPI and stores it in the cache.
   - Serves cached data to the frontend to minimize API calls and reduce costs.

3. **Cache Layer**
   - Node-Cache
   - Stores the latest cryptocurrency prices to reduce the number of API calls to CoinAPI.
   - Ensures that the data is updated at regular intervals.

## Backend Configuration

1. Environment Files: Navigate to the backend folder and create `.env` file. Add the following contents to file:

```
COIN_API_KEY=
```

2. CoinAPI Setup:

- Add your CoinAPI API key to the `COIN_API_KEY` variable in .env files

## Frontend Configuration

1. Environment Files: Navigate to the frontend folder and create a file: `.env`:

```
VITE_API_BASE_URL=
```

2. VITE_API_BASE_URL:

- The VITE_API_BASE_URL should point to the URL where your backend application is running.
