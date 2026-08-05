/// <reference types="react" />
export interface InputRadioGroupProps<T = unknown> {
    options: {
        label: string;
        value: T;
    }[];
    readOnly?: boolean;
    value?: T;
    notifyOnValueChange?: boolean;
    onChange: (value: T) => void;
}
export declare function InputRadioGroup<T>({ options, readOnly, value, notifyOnValueChange, onChange, }: InputRadioGroupProps<T>): import("react").JSX.Element;
//# sourceMappingURL=InputRadioGroup.d.ts.map