import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddForm from "./AddForm";

describe("AddForm Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("renders all pet form fields", () => {
    render(<AddForm />);

    expect(screen.getByLabelText(/pet name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/breed/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adoption fee/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pet image url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it("shows an error when required fields are empty", () => {
    render(<AddForm />);

    const form = screen.getByRole("button", { name: /add pet/i }).closest("form");

    fireEvent.submit(form);

    expect(
      screen.getByText("Please fill in all the fields.")
    ).toBeInTheDocument();
  });

  it("rejects a negative adoption fee", async () => {
    const user = userEvent.setup();
    render(<AddForm />);

    await user.type(screen.getByLabelText(/pet name/i), "Buddy");
    await user.type(screen.getByLabelText(/breed/i), "Labrador");
    await user.type(screen.getByLabelText("Age"), "2 years");
    await user.selectOptions(screen.getByLabelText(/gender/i), "Male");
    await user.type(screen.getByLabelText(/adoption fee/i), "-100");
    await user.type(
      screen.getByLabelText(/pet image url/i),
      "https://example.com/buddy.jpg"
    );
    await user.type(screen.getByLabelText(/description/i), "Friendly dog");

    const form = screen.getByRole("button", { name: /add pet/i }).closest("form");
    fireEvent.submit(form);

    expect(
      screen.getByText("Adoption fee cannot be negative.")
    ).toBeInTheDocument();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits a new pet successfully", async () => {
    const user = userEvent.setup();

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "123",
        name: "Buddy",
        breed: "Labrador",
        age: "2 years",
        gender: "Male",
        adoptionFee: 100,
        image: "https://example.com/buddy.jpg",
        description: "Friendly dog",
      }),
    });

    const onPetAdded = vi.fn();

    render(<AddForm onPetAdded={onPetAdded} />);

    await user.type(screen.getByLabelText(/pet name/i), "Buddy");
    await user.type(screen.getByLabelText(/breed/i), "Labrador");
    await user.type(screen.getByLabelText("Age"), "2 years");
    await user.selectOptions(screen.getByLabelText(/gender/i), "Male");
    await user.type(screen.getByLabelText(/adoption fee/i), "100");
    await user.type(
      screen.getByLabelText(/pet image url/i),
      "https://example.com/buddy.jpg"
    );
    await user.type(screen.getByLabelText(/description/i), "Friendly dog");

    await user.click(screen.getByRole("button", { name: /add pet/i }));

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/pets",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );

    expect(await screen.findByText("Pet added successfully!")).toBeInTheDocument();
    expect(onPetAdded).toHaveBeenCalled();
  });

  it("displays an error when the API request fails", async () => {
    const user = userEvent.setup();

    global.fetch.mockRejectedValue(new Error("Network error"));

    render(<AddForm />);

    await user.type(screen.getByLabelText(/pet name/i), "Buddy");
    await user.type(screen.getByLabelText(/breed/i), "Labrador");
    await user.type(screen.getByLabelText("Age"), "2 years");
    await user.selectOptions(screen.getByLabelText(/gender/i), "Male");
    await user.type(screen.getByLabelText(/adoption fee/i), "100");
    await user.type(
      screen.getByLabelText(/pet image url/i),
      "https://example.com/buddy.jpg"
    );
    await user.type(screen.getByLabelText(/description/i), "Friendly dog");

    await user.click(screen.getByRole("button", { name: /add pet/i }));

    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });
});
