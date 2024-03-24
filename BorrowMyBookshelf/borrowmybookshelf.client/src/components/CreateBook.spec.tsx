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


    const titleInput = getByLabelText("Title*:") as HTMLInputElement;
    const firstNameInput = getByLabelText("First Name*:") as HTMLInputElement;
    const middleNameInput = getByLabelText("Middle Name:") as HTMLInputElement;
    const lastNameInput = getByLabelText("Last Name*:") as HTMLInputElement;
    const optionHardcover = getByLabelText("Hardcover") as HTMLInputElement;
    const pageCountInput = getByLabelText("Page Count:") as HTMLInputElement;
    const hoursInput = getByLabelText("Hours:") as HTMLInputElement;
    const minutesInput = getByLabelText("Minutes:") as HTMLInputElement;
    const summaryInput = getByLabelText("Summary:") as HTMLInputElement;
    const genresInput = getByLabelText("Genres:") as HTMLInputElement;

    testTypeInInput(titleInput, "Family Family", button);
    testTypeInInput(firstNameInput, "Laurie", button);
    testTypeInInput(middleNameInput, "", button);
    testTypeInInput(lastNameInput, "Frankel", button);
    expect(optionHardcover.checked).toBe(false);
    fireEvent.click(optionHardcover);
    expect(optionHardcover.checked).toBe(true);
    expect(button).not.toBeDisabled();
    const expectValidForm = true;
    testTypeInInput(pageCountInput, "400", button, expectValidForm);
    testTypeInInput(hoursInput, "14", button, expectValidForm);
    testTypeInInput(minutesInput, "57", button, expectValidForm);
    testTypeInInput(summaryInput, "“Not all stories of adoption are stories of pain and regret. Not even most of them. Why don’t we ever get that movie?” India Allwood grew up wanting to be an actor. Armed with a stack of index cards (for research/line memorization/make-shift confetti), she goes from awkward sixteen-year-old to Broadway ingenue to TV superhero. Her new movie is a prestige picture about adoption, but its spin is the same old tired story of tragedy. India is an adoptive mom in real life though. She wants everyone to know there’s more to her family than pain and regret. So she does something you should never do—she tells a journalist the truth: it’s a bad movie. Soon she’s at the center of a media storm, battling accusations from the press and the paparazzi, from protesters on the right and advocates on the left. Her twin ten-year-olds know they need help–and who better to call than family? But that’s where it gets really messy because India’s not just an adoptive mother… The one thing she knows for sure is what makes a family isn’t blood. And it isn’t love. No matter how they’re formed, the truth about family is this: it's complicated.", button, expectValidForm);
    testTypeInInput(genresInput, "Fiction, Contemporary, Family", button, expectValidForm);


});