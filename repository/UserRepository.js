import { Op } from "sequelize";
import { User } from "../sequelize.js";

class UserRepository {
  async findByUsernameOrEmail(name, email) {
    return User.findOne({
      where: {
        [Op.or]: [{ name }, { email }],
      },
    });
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async createUser(userData) {
    return User.create(userData);
  }

  async saveVerificationToken(email, verificationToken) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    user.verificationToken = verificationToken;
    await user.save();

    return user;
  }

  async findAllUsers() {
    return User.findAll();
  }

  async findUserById(id) {
    const user = await User.findByPk(id);
    return user;
  }
}

export default new UserRepository();
