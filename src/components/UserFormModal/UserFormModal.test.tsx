import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserForm from "./UserFormModal";
import { UserModel } from "../../models/userManagementModels";

describe("UserForm", () => {
  const mockOnSave = jest.fn((user: UserModel): void => {});
  const mockOnCancel = jest.fn((): void => {});

  const defaultProps = {
    onSave: mockOnSave,
    onCancel: mockOnCancel,
  };

  const user: UserModel = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    nationality: "American",
    phoneNumber: "1234567890",
    lastMonthBill: "100",
    address: "123 Main St",
    servicesSubscribed: 2,
    age: 30,
  };

  it("renders form fields correctly", () => {
    render(<UserForm user={user} {...defaultProps} />);
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("nationality")).toBeInTheDocument();
    expect(screen.getByTestId("phoneNumber")).toBeInTheDocument();
    expect(screen.getByTestId("lastMonthBill")).toBeInTheDocument();
    expect(screen.getByTestId("address")).toBeInTheDocument();
    expect(screen.getByTestId("servicesSubscribed")).toBeInTheDocument();
    expect(screen.getByTestId("age")).toBeInTheDocument();
  });

  it("calls onSave with form data when Save button is clicked", async () => {
    render(<UserForm user={user} {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: user.firstName },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: user.lastName },
    });
    fireEvent.change(screen.getByLabelText("Nationality"), {
      target: { value: user.nationality },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: user.phoneNumber },
    });
    fireEvent.change(screen.getByLabelText("Last Month's Bill"), {
      target: { value: user.lastMonthBill },
    });
    fireEvent.change(screen.getByLabelText("Address"), {
      target: { value: user.address },
    });
    fireEvent.change(screen.getByLabelText("Services Subscribed"), {
      target: { value: user.servicesSubscribed },
    });
    fireEvent.change(screen.getByLabelText("Age"), {
      target: { value: user.age },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(user);
    });
  });

  it("calls onCancel when Cancel button is clicked", () => {
    render(<UserForm user={user} {...defaultProps} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
