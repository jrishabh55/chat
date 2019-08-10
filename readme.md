# Chat

## Create / Fetch User

- Request

  ```js
  const event = "create-user";
  const body = {
    user: {
      externalUserId: 'some-id-to-map-in-your-db'
    }
  };
  ```

- Response

  ```js
  const event = "create-user";
  const body = {
    user: {
      id: 'user-id',
      created_at: 'DATETIME',
      modified_at: 'DATETIME',
    }
  };
  ```

## Create new chat

- Request

  ```js
  const event = "create-chat";
  const body = {
    name: 'chat-name',
    user: {
      id: 'id-received-in-create-user'
    }
  };
  ```

- Response

  ```js
  const event = "create-user";
  const body = {
    user: {
      id: 'user-id',
      created_at: 'DATETIME',
      modified_at: 'DATETIME',
    }
  };
  ```
