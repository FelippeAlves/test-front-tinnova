import { fetchUsers } from "@/services/userService";

global.fetch = jest.fn();

Object.defineProperty(global, "crypto", {
  value: {
    randomUUID: jest.fn(() => "mocked-uuid"),
  },
});

describe("fetchUsers", () => {
  const mockResponse = [
    {
      name: "Felippe Alves",
      cpf: "12345678901",
      phone: "12912341234",
      email: "felippealves@example.com",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches users and adds random IDs", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchUsers();

    expect(fetch).toHaveBeenCalledWith(
      "https://private-9d65b3-tinnova.apiary-mock.com/users",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      ...mockResponse[0],
      id: "mocked-uuid",
    });
  });

  it("throws error when response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
    });

    await expect(fetchUsers()).rejects.toThrow(
      "Erro ao buscar usuários: Internal Server Error"
    );
  });
});
