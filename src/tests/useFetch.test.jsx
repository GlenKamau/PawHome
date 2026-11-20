import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useFetch } from "../hooks/useFetch";

describe("useFetch", () => {
  it("starts with loading true and resolves with data", async () => {
    const mockPets = [
      { id: "1", name: "Buddy", breed: "Beagle" },
      { id: "2", name: "Milo", breed: "Tabby" },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockPets,
    });

    const { result } = renderHook(() =>
      useFetch("http://localhost:3000/pets", []),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockPets);
    expect(result.current.error).toBeNull();
  });

  it("sets an error when the HTTP response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const { result } = renderHook(() =>
      useFetch("http://localhost:3000/pets/999", null),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toContain("404");
  });

  it("supports manual refetching", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: "1", name: "Buddy" }],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { id: "1", name: "Buddy" },
          { id: "2", name: "Luna" },
        ],
      });

    const { result } = renderHook(() =>
      useFetch("http://localhost:3000/pets", []),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toHaveLength(1);

    await act(async () => {
      await result.current.refetch();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.current.data).toHaveLength(2);
  });
});
