import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useLocalStorage } from "../hooks/useLocalStorage";

describe("useLocalStorage", () => {
  const STORAGE_KEY = "pawhome:recentlyViewed";

  it("initializes with initialValue when key is absent", () => {
    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY, []));
    expect(result.current[0]).toEqual([]);
  });

  it("reads an existing value from localStorage on mount", () => {
    const existing = [{ id: "1", name: "Max" }];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY, []));
    expect(result.current[0]).toEqual(existing);
  });

  it("persists state updates to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY, []));

    act(() => {
      result.current[1]([{ id: "2", name: "Coco" }]);
    });

    expect(result.current[0]).toEqual([{ id: "2", name: "Coco" }]);
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY))).toEqual([
      { id: "2", name: "Coco" },
    ]);
  });

  it("removes the key and resets to initialValue via removeValue", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: "3", name: "Daisy" }])
    );

    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY, []));

    act(() => {
      result.current[2](); // removeValue
    });

    expect(result.current[0]).toEqual([]);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});