import { User } from '../models/User';
import { getUsers, saveUsers } from '../dal/userDAL.js';
import bcrypt from 'bcrypt';

export const createUser = async (userName: string, firstName: string, lastName: string, imgUrl: string, password: string): Promise<User> => {
  const users = await getUsers();
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: users.length + 1.toString(),
    userName,
    firstName,
    lastName,
    imgUrl,
    passwordHash,
  };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
};

export const authenticateUser = async (userName: string, password: string): Promise<User | null> => {
  const users = await getUsers();
  const user = users.find(u => u.userName === userName);
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    return user;
  }
  return null;
};



export  const getUserByToken = async (id: string ): Promise<User | null> => {

  const users = await getUsers();
  const user = users.find(u => u.id.toString() === id);
  if (user) {
    return user;
  }
  return null;
};
