#MAGIC MOVER V 1.0.0


1. **Install all required dependencies:**
    ```bash
    npm install
    ```
2. **Set up environment variables:**
- You can edit  a `.env` file in the root of the project To suit your project requirements

## Running the Application
1. **To run the application in development mode:**
    ```bash
    npm run dev
    ```
2. **Or to run the application in production mode:**
    ```bash
    npm run build
    npm run start 
    ```



## API Endpoints

### 1. Add a New MagicMover
- **Description**: Adds a new mover.
- **Route**: `POST /api/movers/add`
- **Required Payload**:
    ```json
    {
        "name": "Mover 3",
        "weightLimit": 100,
    }
    ```
- **Response**:
    ```json
    {
    "message": "Magic mover added successfully.",
    "mover": {
        "name": "mover 3",
        "weightLimit": 100,
        "questState": "resting",
        "missionsCompleted": 0,
        "loadedItems": [],
        "_id": "673667c9c687ebbc879fe944",
        "__v": 0
    }
    }
   ```
### 2. Add a New item
- **Description**: Adds a new item.
- **Route**: `POST /api/item/add`
- **Required Payload**:
    ```json
    {
        "name": "item 3",
        "weight": 25,
    }
    ```
- **Response**:
    ```json
    {
    "message": "Magic Item added successfully.",
    "item": {
        "name": "item 3",
        "weight": "25",
        "_id": "673668cdc687ebbc879fe946",
        "__v": 0
    }
    }
    ```
### 3. load item 
- **Description**: load items to mover.
- **Route**: `POST /api/mover/:moverId/load`
- **Required Payload**:
-Path Variables
  key :moverId
  value: 673667c9c687ebbc879fe944
    ```json
    {
        "itemIds": ["673668cdc687ebbc879fe946"]
    }
    ```
- **Response**:
    ```json
    {
    "message": "Items loaded successfully.",
    "updateMover": {
        "_id": "673667c9c687ebbc879fe944",
        "name": "mover 3",
        "weightLimit": 125,
        "questState": "loading",
        "missionsCompleted": 0,
        "loadedItems": [
            "673668cdc687ebbc879fe946"
        ],
        "__v": 0
    }
    }
     ```
### 4. start mission  
- **Description**: start mission for specific mover.
- **Route**: `POST /api/mover/:moverId/start-Mission`
- **Required Payload**:
-Path Variables
  key :moverId
  value: 673667c9c687ebbc879fe944
- **Response**:
    ```json
    {
    "message": "Mission started successfully.",
    "updateMover": {
        "_id": "673667c9c687ebbc879fe944",
        "name": "mover 3",
        "weightLimit": 125,
        "questState": "on-mission",
        "missionsCompleted": 0,
        "loadedItems": [
            "673668cdc687ebbc879fe946"
        ],
        "__v": 0
    }
    }

    ```   
### 5. end mission  
- **Description**: end mission for specific mover.
- **Route**: `POST /api/mover/:moverId/end-Mission`
- **Required Payload**:
-Path Variables
  key :moverId
  value: 673667c9c687ebbc879fe944
- **Response**:
    ```json
    {
    "message": "Mission ended successfully.",
    "updateMover": {
        "_id": "673667c9c687ebbc879fe944",
        "name": "mover 3",
        "weightLimit": 125,
        "questState": "resting",
        "missionsCompleted": 1,
        "loadedItems": [],
        "__v": 0
    }
    }

   ```
### 6. get top movers  
- **Description**: get top mover descending.
- **Route**: `GET /api/mover/topMovers`
- **Response**:
    ```json
    {
    "topMovers": [
        {
            "_id": "67364e6b73f8a0ae08d405a3",
            "name": "mover 2",
            "weightLimit": 75,
            "missionsCompleted": 3
        },
        {
            "_id": "673508ceca677337df54deab",
            "name": "mover 1",
            "weightLimit": 100,
            "missionsCompleted": 2
        },
        {
            "_id": "673667c9c687ebbc879fe944",
            "name": "mover 3",
            "weightLimit": 125,
            "missionsCompleted": 1
        }
    ]
    }


   ```       
