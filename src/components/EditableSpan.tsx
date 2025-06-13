import React, { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface EditableSpanProps {
    name: string;
    onChange: (newName: string) => void;
}

const EditableSpan: React.FC<EditableSpanProps> = ({ name, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(name);
    const { theme } = useTheme();

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (value.trim() !== name) {
            onChange(value.trim());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return isEditing ? (
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="border rounded px-1 focus:outline-none transition-colors duration-200"
            style={{
                backgroundColor: theme.background.primary,
                color: theme.text.primary,
                borderColor: theme.todoList.border
            }}
        />
    ) : (
        <span
            onDoubleClick={handleDoubleClick}
            className="cursor-pointer transition-colors duration-200"
            style={{ color: theme.text.primary }}
        >
            {name}
        </span>
    );
};

export default EditableSpan;