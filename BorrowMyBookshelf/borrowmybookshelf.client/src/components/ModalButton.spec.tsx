import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import ModalButton, { ModalType } from './ModalButton';

it("Creates a modal on click", () => {
    const { getByText, queryByText } = render(<ModalButton
        message="Please press OK."
        modalType={ModalType.OKModal}
        buttonText="Press Me" />)

    const button = getByText("Press Me") as HTMLButtonElement;
    const noModalBeforeClick = queryByText("Please press OK.");
    expect(noModalBeforeClick).toBeFalsy();
    fireEvent.click(button);
    const modalAfterClick = queryByText("Please press OK.");
    expect(modalAfterClick).toBeTruthy();


})