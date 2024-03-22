import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import CreateBook from './CreateBook';

const testTypeInInput = (input: HTMLInputElement, newValue: string, button: HTMLButtonElement, expectValid: boolean = false) => {
    fireEvent.change(input, { target: { value: newValue } });
    expect(input.value).toBe(newValue);
    if (expectValid) {
        expect(button).not.toBeDisabled();
    } else {
        expect(button).toBeDisabled();
    }
}

it("Validates the form for making a new book", () => {
    const { getByText, getByLabelText } = render(<CreateBook />);

    expect(getByText(/Create New Book/i)).toBeTruthy();

    const button = getByText(/Create Book/i) as HTMLButtonElement;
    expect(button).toBeDisabled();


    const titleInput = getByLabelText(/Title:/i) as HTMLInputElement;

    testTypeInInput(titleInput, "Family Family", button);

    //When you type into last input
    //testTypeInInput(titleInput, "Family Family", button, true);

});