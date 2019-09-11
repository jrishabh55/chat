import { Controller } from 'controllers/Controller';
import { autobind } from 'core-decorators';
import User, { IUser } from 'models/User';
import { IUserData } from 'interfaces/Chat';
import { events } from 'app';

@autobind
export class UserController extends Controller {

  public async createOrFindUser(chatData: IUserData) {
    const { user } = chatData;
    try {
      const $user = await this.create(user as any as IUser);
      this.emit(events.createUser, { status: 'ok', user: $user.toJSON() });
    } catch (err) {
      this.emit(events.createUser, { status: 'error', error: err });
    }
  }

  private async create(user: IUser) {
    const condition: any = {};
    if (user.id) {
      condition.id = user.id;
    } else {
      condition.external_id = user.external_id;
    }
    return User.findOneOrCreate(condition, user);
  }
}

const instance = new UserController();

export default instance;
