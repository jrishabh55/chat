export interface IUserData {
  user: {
    id?: string;
    external_id?: string
    name: string;
    photo: string;
  };
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
