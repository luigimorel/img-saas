"use client";

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export default function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
  rows = 1,
}: TextInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder={placeholder}
        />
      )}
    </div>
  );
} 