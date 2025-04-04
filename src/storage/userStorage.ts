import { UserList } from "@/types/UserList";

const STORAGE_KEY = "users";

export function saveUsersToStorage(users: UserList): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getUsersFromStorage(): UserList | null {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}
