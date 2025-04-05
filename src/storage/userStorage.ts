import { User } from "@/interfaces/User";
import { UserList } from "@/types/UserList";

const STORAGE_KEY = "users";

export function saveUsersToStorage(users: UserList): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getUsersFromStorage(): UserList | null {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function addUserToStorage(newUser: User): void {
  const existingData = localStorage.getItem(STORAGE_KEY);
  const users: UserList = existingData ? JSON.parse(existingData) : [];

  users.push(newUser);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function updateUserInStorage(updatedUser: UserList[number]): void {
  const users = getUsersFromStorage();

  const userIndex = users!.findIndex((user) => user.id === updatedUser.id);

  if (userIndex === -1) {
    throw new Error("Usuário não encontrado para atualização.");
  }

  users![userIndex] = updatedUser;
  saveUsersToStorage(users!);
}
