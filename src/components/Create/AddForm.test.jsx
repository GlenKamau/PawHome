

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AddForm from "./AddForm";

describe("AddForm Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  // Test 1: Render all form fields
  it("renders all pet form fields", () => {
    render(
      <MemoryRouter>
        <AddForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/pet name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/breed/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adoption fee/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pet image url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  // Test 2: Reject empty required fields
  it("shows an error when required fields are empty", () => {
    render(
      <MemoryRouter>
        <AddForm />
      </MemoryRouter>
    );

    const form = screen.getByRole("button", {
      name: /add pet/i,
    }).closest("form");

    fireEvent.submit(form);

    expect(
      screen.getByText("Please fill in all the fields.")
    ).toBeInTheDocument();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  // Test 3: Reject negative adoption fee
  it("rejects a negative adoption fee", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AddForm />
      </MemoryRouter>
    );

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

    const form = screen.getByRole("button", {
      name: /add pet/i,
    }).closest("form");

    fireEvent.submit(form);

    expect(
      screen.getByText("Please enter a valid adoption fee.")
    ).toBeInTheDocument();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  // Test 4: Submit a new pet successfully
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
        status: "available",
      }),
    });

    const onPetAdded = vi.fn();

    render(
      <MemoryRouter>
        <AddForm onPetAdded={onPetAdded} />
      </MemoryRouter>
    );

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

    await user.click(
      screen.getByRole("button", { name: /add pet/i })
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/pets",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );

      expect(onPetAdded).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Buddy",
          breed: "Labrador",
          adoptionFee: 100,
        })
      );
    });
  });

  // Test 5: Handle network errors
  it("displays an error when the API request fails", async () => {
    const user = userEvent.setup();

    global.fetch.mockRejectedValue(new Error("Network error"));

    render(
      <MemoryRouter>
        <AddForm />
      </MemoryRouter>
    );

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

    await user.click(
      screen.getByRole("button", { name: /add pet/i })
    );

    expect(
      await screen.findByText("Network error")
    ).toBeInTheDocument();
  });

  // Test 6: Reject whitespace-only pet name
  it("rejects fields containing only spaces", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AddForm />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/pet name/i), "   ");
    await user.type(screen.getByLabelText(/breed/i), "Labrador");
    await user.type(screen.getByLabelText("Age"), "2 years");
    await user.selectOptions(screen.getByLabelText(/gender/i), "Male");
    await user.type(screen.getByLabelText(/adoption fee/i), "100");
    await user.type(
      screen.getByLabelText(/pet image url/i),
      "https://example.com/buddy.jpg"
    );
    await user.type(screen.getByLabelText(/description/i), "Friendly dog");

    const form = screen.getByRole("button", {
      name: /add pet/i,
    }).closest("form");

    fireEvent.submit(form);

    expect(
      screen.getByText("Please fill in all the fields.")
    ).toBeInTheDocument();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  // Test 7: Check the exact pet data sent to the API
  it("sends the correct pet information to the API", async () => {
    const user = userEvent.setup();

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "123",
        name: "Buddy",
        breed: "Labrador",
      }),
    });

    render(
      <MemoryRouter>
        <AddForm />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/pet name/i), " Buddy ");
    await user.type(screen.getByLabelText(/breed/i), " Labrador ");
    await user.type(screen.getByLabelText("Age"), "2 years");
    await user.selectOptions(screen.getByLabelText(/gender/i), "Male");
    await user.type(screen.getByLabelText(/adoption fee/i), "100");
    await user.type(
      screen.getByLabelText(/pet image url/i),
      "https://example.com/buddy.jpg"
    );
    await user.type(screen.getByLabelText(/description/i), "Friendly dog");

    await user.click(
      screen.getByRole("button", { name: /add pet/i })
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const requestBody = JSON.parse(global.fetch.mock.calls[0][1].body);

    expect(requestBody).toEqual(
      expect.objectContaining({
        name: "Buddy",
        breed: "Labrador",
        age: "2 years",
        gender: "Male",
        adoptionFee: 100,
        image: "https://example.com/buddy.jpg",
        description: "Friendly dog",
        status: "available",
      })
    );
  });

  // Test 8: Handle unsuccessful server responses
  it("displays an error when the server returns an unsuccessful response", async () => {
    const user = userEvent.setup();

    global.fetch.mockResolvedValue({
      ok: false,
    });

    render(
      <MemoryRouter>
        <AddForm />
      </MemoryRouter>
    );

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

    await user.click(
      screen.getByRole("button", { name: /add pet/i })
    );

    expect(
      await screen.findByText(
        "Failed to add pet. Please try again."
      )
    ).toBeInTheDocument();
  });
});
