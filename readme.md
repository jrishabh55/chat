# Chat

## Create / Fetch User

- Request

-- Whenever create user is called. `name`, `photo` is mandatory, One of both `external_id` and `id` is required as well.

  ```js
  const event = "create-user";
  const body = {
    user: {
      external_id: 'some-id-to-map-in-your-db',
      id: 'chat-id',
      name: 'Name',
      photo: 'Photo',
    }
  };
  ```

- Response

  ```js
  const event = "create-user";
  const body = {
    user: {
      external_id: 'external_id',
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
    chat {
      name: 'chat-name',
    },
    users: [
      'id-received-in-create-user'
    ]
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

- Request

  ```js
    const room = "chat-id";
    const event = "new-message",

    const body = {
      chat: {
        id: string,
      },
      user: {
        id: string,
      },
      message: {
        value: 'message',
        type: 'img or text or file'
      },
    };
  ```

- Response

```js
  const room = "chat-id";
  const event = "new-message";
  const body = {
    id: 'message-id',
    msg: 'chat-name',
    type: 'text',
    user_id: 'user-id,
    created_at: 'DATETIME',
    modified_at: 'DATETIME',
  };
```
