import { Controller } from 'controllers/Controller';
import { autobind } from 'core-decorators';
import User, { IUser } from 'models/User';
import { IUserData } from 'interfaces/Chat';

@autobind
export class UserController extends Controller {

  public async createOrFindUser(chatData: IUserData) {
    const { user } = chatData;
    const $user = await this.create({ id: user.externalUserId });
    this.emit('new-user', { user: $user.toJSON() });
  }

  private async create(user: IUser | any) {
    return User.findOneOrCreate({ external_id: user.id }, { external_id: user.id });
  }
}

const instance = new UserController();

export default instance;
