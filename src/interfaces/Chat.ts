export interface IUserData {
  user: {
    externalUserId: string
  }
}

export interface ICreateChatData {
  chat: {
    name: string;
    users: string[];
  };
}

export interface INewMessage {
  chat: {
    id: string;
  };
  user: {
    id: string;
  };
  message: {
    value: string;
    type: "img" | "text" | "file";
  };
}
