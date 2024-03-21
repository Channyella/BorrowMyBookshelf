import React from 'react';

interface StarsDropdownInputProps {
    value: number;
    onChange: (value: number) => void;
}

const DropdownInput: React.FC<StarsDropdownInputProps> = ({ value, onChange }) => {
    // Generate options for the dropdown
    const options: JSX.Element[] = [];
    for (let i = 0; i <= 5; i += 0.5) {
        options.push(
            <option key={i} value={i * 10}>{i}</option>
        );
    }

    return (
        <div>
        <label htmlFor="star-rating" className="text-align-start">Select your star rating:</label>
        <select id="star-rating" value={value} className="form-select w-auto" onChange={(e) => onChange(parseFloat(e.target.value))}>
            {options}
            </select>
        </div>
    );
};

export default DropdownInput;
