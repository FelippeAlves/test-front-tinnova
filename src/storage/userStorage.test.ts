import {
  saveUsersToStorage,
  getUsersFromStorage,
  addUserToStorage,
  updateUserInStorage,
} from "@/storage/userStorage";
import { UserList } from "@/types/UserList";
import { User } from "@/interfaces/User";

describe("userStorage", () => {
  const mockUsers: UserList = [
    {
      id: "1",
      name: "Felippe Alves",
      cpf: "12345678901",
      phone: "12912341234",
      email: "felippealves@example.com",
    },
  ];

  const newUser: User = {
    id: "2",
    name: "João Silva",
    cpf: "98765432100",
    phone: "11999999999",
    email: "joao@email.com",
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("saves users to localStorage", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    saveUsersToStorage(mockUsers);

    expect(setItemSpy).toHaveBeenCalledWith("users", JSON.stringify(mockUsers));
  });

  it("retrieves users from localStorage", () => {
    localStorage.setItem("users", JSON.stringify(mockUsers));

    const users = getUsersFromStorage();
    expect(users).toEqual(mockUsers);
  });

  it("returns null if no users are found in localStorage", () => {
    const users = getUsersFromStorage();
    expect(users).toBeNull();
  });

  it("adds a user when no users exist in localStorage", () => {
    addUserToStorage(newUser);

    const users = JSON.parse(localStorage.getItem("users")!);
    expect(users).toEqual([newUser]);
  });

  it("adds a user to existing users in localStorage", () => {
    localStorage.setItem("users", JSON.stringify(mockUsers));
    addUserToStorage(newUser);

    const users = JSON.parse(localStorage.getItem("users")!);
    expect(users).toEqual([...mockUsers, newUser]);
  });

  it("updates an existing user in localStorage", () => {
    const updatedUser = {
      ...mockUsers[0],
      name: "Felippe Atualizado",
    };

    localStorage.setItem("users", JSON.stringify(mockUsers));
    updateUserInStorage(updatedUser);

    const users = JSON.parse(localStorage.getItem("users")!);
    expect(users[0].name).toBe("Felippe Atualizado");
  });

  it("throws an error if the user to update is not found", () => {
    localStorage.setItem("users", JSON.stringify(mockUsers));

    const nonExistentUser = {
      ...newUser,
      id: "999",
    };

    expect(() => updateUserInStorage(nonExistentUser)).toThrow(
      "Usuário não encontrado para atualização."
    );
  });
});
