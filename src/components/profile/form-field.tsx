import { forwardRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  multiline?: boolean;
  rows?: number;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, hint, multiline, rows = 3, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    const baseClass = `w-full px-4 py-2.5 text-sm text-gray-900 bg-white border rounded-xl
      placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
      transition-colors ${error ? "border-red-400" : "border-gray-200 hover:border-gray-300"}`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId} className="text-sm font-medium text-gray-700">
          {label}
        </label>

        {multiline ? (
          <textarea
            id={fieldId}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            className={`${baseClass} resize-none`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={fieldId}
            ref={ref as React.Ref<HTMLInputElement>}
            className={baseClass}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {hint && !error && (
          <p className="text-xs text-gray-400">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;