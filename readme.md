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
  const event = "create-chat";
  const body = {
    chat: {
      id: 'user-id',
      name: 'chat-name',
      users: ['user-id'],
      created_at: 'DATETIME',
      modified_at: 'DATETIME',
    }
  };
  ```

## Get all chats

- Request

```js
  const event = "list-chats";
  const body = {
    user: {
      id: "user-id",
    }
  };
```

- Response

  ```js
  const event = "list-chats";
  const body = {
    chats: [
      {
        id: 'user-id',
        name: 'chat-name',
        users: ['user-id'],
        created_at: 'DATETIME',
        modified_at: 'DATETIME',
      }
    ]
  };
  ```

## Get all messages

- Request

```js
  const event = "list-messages";
  const body = {
    query: {
      from: 'DATETIME',
      to: 'DATETIME',
    },
    chat: {
      id: "chat-id",
    }
  };
```

- Response

  ```js
  const event = "list-messages";
  const body = {
    messages: [
      {
        id: 'message-id',
        msg: 'chat-name',
        type: 'text',
        user_id: 'user-id',
        created_at: 'DATETIME',
        modified_at: 'DATETIME',
      }
    ]
  };
  ```

## New message in a chat

- Response

```js
  const room = "chat_id";
  const body = {
    id: 'message-id',
    msg: 'chat-name',
    type: 'text',
    user_id: 'user-id,
    created_at: 'DATETIME',
    modified_at: 'DATETIME',
  };
```