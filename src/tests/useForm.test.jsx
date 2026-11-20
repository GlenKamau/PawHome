import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useForm } from "../hooks/useForm";

describe("useForm", () => {
  const validate = (values) => {
    const errors = {};
    if (!values.name.trim()) {
      errors.name = "Pet name is required.";
    }
    if (values.adoptionFee !== "" && Number(values.adoptionFee) < 0) {
      errors.adoptionFee = "Fee cannot be negative.";
    }
    return errors;
  };

  it("updates field values with handleChange", () => {
    const { result } = renderHook(() =>
      useForm({ name: "", adoptionFee: "" }, validate),
    );

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Bella" },
      });
    });

    expect(result.current.values.name).toBe("Bella");
  });

  it("blocks submit and populates errors when validation fails", async () => {
    const { result } = renderHook(() =>
      useForm({ name: "", adoptionFee: "-10" }, validate),
    );
    const onSubmit = vi.fn();

    await act(async () => {
      await result.current.handleSubmit(onSubmit)({
        preventDefault: vi.fn(),
      });
    });

    expect(result.current.errors.name).toBe("Pet name is required.");
    expect(result.current.errors.adoptionFee).toBe("Fee cannot be negative.");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with valid values and supports resetForm", async () => {
    const { result } = renderHook(() =>
      useForm({ name: "", adoptionFee: "" }, validate),
    );
    const onSubmit = vi.fn();

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Charlie" },
      });
      result.current.handleChange({
        target: { name: "adoptionFee", value: "50" },
      });
    });

    await act(async () => {
      await result.current.handleSubmit(onSubmit)({
        preventDefault: vi.fn(),
      });
    });

    expect(onSubmit).toHaveBeenCalledWith(
      { name: "Charlie", adoptionFee: "50" },
      expect.objectContaining({ resetForm: expect.any(Function) }),
    );

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.values).toEqual({ name: "", adoptionFee: "" });
  });
});
