import { useEffect, useRef } from 'react';

interface DropdownOption {
    label: string;
    action: () => void;
}

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    options: DropdownOption[];
    title?: string;
    blockNextClickRef?: React.MutableRefObject<boolean>; // ← nueva prop opcional

}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, options, title = 'Opciones', blockNextClickRef }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                e.stopPropagation()
                onClose();
            }
            if (blockNextClickRef) {
                blockNextClickRef.current = true; // ← señalamos que el siguiente clic debe ignorarse
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 z-50 w-[240px] bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in"
        >
            {/* Header estilo modal */}
            <div className="bg-primary-400 text-white px-4 py-2 flex justify-between items-center">
                <h3 className="font-semibold text-sm">{title}</h3>
            </div>

            {/* Opciones */}
            <div className="flex flex-col divide-y divide-gray-200 bg-[#f7fbfa]">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            option.action();
                            setTimeout(onClose, 0);
                            // Cerrar el modal después de un breve retraso
                        }}
                        className="flex justify-between items-center px-4 py-3 text-sm hover:bg-gray-100 transition"
                    >
                        <span className="text-gray-800">{option.label}</span>
                    </button>
                ))}
            </div>

        </div>
    );
};

export default Dropdown;
