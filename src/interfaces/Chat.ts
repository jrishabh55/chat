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
