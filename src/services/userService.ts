import { UserList } from "@/types/UserList";

export async function fetchUsers(): Promise<UserList> {
  const res = await fetch(
    "https://private-9d65b3-tinnova.apiary-mock.com/users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar usuários: ${res.statusText}`);
  }

  const data = await res.json();
  const usersWithId: UserList = data.map((user: Omit<UserList, "id">) => ({
    ...user,
    id: crypto.randomUUID(),
  }));
  return usersWithId;
}
