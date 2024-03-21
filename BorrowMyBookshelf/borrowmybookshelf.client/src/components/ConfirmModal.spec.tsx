import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import ConfirmModal from "./ConfirmModal";

it("Makes a confirm modal", () => {
    const handleConfirm = jest.fn();
    const handleCancel = jest.fn();
    const { getByText } = render(
        <ConfirmModal message="This is a message"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            confirmText="Yes"
            cancelText="No"/>
    )

    expect(getByText(/This is a message/i)).toBeTruthy();
    expect(getByText(/no/i)).toBeTruthy();
    expect(getByText(/yes/i)).toBeTruthy();
    expect(handleConfirm).not.toHaveBeenCalled();
    expect(handleCancel).not.toHaveBeenCalled();
    fireEvent.click(getByText(/yes/i));
    expect(handleConfirm).toHaveBeenCalled();
    expect(handleCancel).not.toHaveBeenCalled();
    fireEvent.click(getByText(/no/i));
    expect(handleCancel).toHaveBeenCalled();
});