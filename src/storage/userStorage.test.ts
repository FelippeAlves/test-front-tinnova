import { saveUsersToStorage, getUsersFromStorage } from "@/storage/userStorage";
import { UserList } from "@/types/UserList";

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
});
