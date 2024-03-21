import React, { useState, useEffect } from 'react';
import './style.css';


interface AudioLengthInputProps {
    setAudioLength: (length: number) => void;
    startingMinutes?: number;
}

const AudioLengthInput: React.FC<AudioLengthInputProps> = ({ setAudioLength, startingMinutes }) => {
    const [hours, setHours] = useState<number | undefined>(0);
    const [minutes, setMinutes] = useState<number | undefined>(0);

    useEffect(() => {
        if (startingMinutes !== undefined) {
            const hours = Math.floor(startingMinutes / 60);
            const minutes = startingMinutes % 60;
            setHours(hours);
            setMinutes(minutes);
        }
    }, [startingMinutes]);

    const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newHours = event.target.value ? parseInt(event.target.value) : undefined;
        setHours(newHours);
        const totalMinutes = (newHours ?? 0) * 60 + (minutes ?? 0);
        setAudioLength(totalMinutes);
    };

    const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMinutes = event.target.value ? parseInt(event.target.value) : undefined;
        setMinutes(newMinutes);
        const totalMinutes = (hours ?? 0) * 60 + (newMinutes ?? 0);
        setAudioLength(totalMinutes);
    };

    return (
        <div>
            <label className="audio-title" htmlFor="audioLength">Audio Length:</label>
        <div className="audio-length-container">
            <label htmlFor="hours">Hours:</label>
            <input
                type="number"
                    id="hours"
                    className='form-control'
                    
                value={hours}
                onChange={handleHoursChange}
                min={0}
            />
            <label className="ml-2" htmlFor="minutes">Minutes:</label>
            <input
                type="number"
                    id="minutes"
                    className='form-control'
                value={minutes}
                onChange={handleMinutesChange}
                min={0}
                max={59}
            />
            </div>
        </div>
    );
};

export default AudioLengthInput;
