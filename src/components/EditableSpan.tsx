import React, { useState, useRef, useEffect } from "react";

interface EditableSpanProps {
    name: string;
    onChange?: (newValue: string) => void;
}

const EditableSpan: React.FC<EditableSpanProps> = ({ name, onChange }) => {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(name);
    const inputRef = useRef<HTMLInputElement>(null);

    // Активация режима редактирования
    const activateEditMode = () => {
        setEditMode(true);
    };

    // Деактивация режима редактирования с сохранением изменений
    const deactivateEditMode = () => {
        setEditMode(false);
        
        // Вызываем функцию onChange, если она передана, для сохранения изменений
        if (onChange && value !== name) {
            onChange(value);
        }
    };

    // Обработка нажатия Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            deactivateEditMode();
        }
    };

    // Обработка клика вне input
    const handleClickOutside = (event: MouseEvent) => {
        if (
            inputRef.current && 
            !inputRef.current.contains(event.target as Node) && 
            editMode
        ) {
            deactivateEditMode();
        }
    };

    // Устанавливаем слушатель событий для клика вне элемента
    useEffect(() => {
        // Добавляем обработчик только когда input активен
        if (editMode) {
            document.addEventListener('mousedown', handleClickOutside);
            
            // Фокусируем input и устанавливаем курсор в конец текста
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(value.length, value.length);
            }
        }
        
        // Очищаем обработчик при размонтировании или деактивации режима редактирования
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editMode]);

    // Синхронизируем локальное состояние, если prop name изменился
    useEffect(() => {
        setValue(name);
    }, [name]);

    return (
        <span>
            {!editMode ? (
                <span 
                    onDoubleClick={activateEditMode}
                    className="cursor-pointer hover:bg-gray-100 px-1 py-0.5 rounded"
                >
                    {value}
                </span>
            ) : (
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:border-blue-500"
                    style={{ width: `${Math.max(value.length * 8 + 20, 100)}px` }}
                />
            )}
        </span>
    );
};

export default EditableSpan;