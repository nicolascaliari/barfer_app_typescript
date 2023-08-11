import { useState } from "react";

interface FormState {
    email: string;
    password: string;
}

interface FormProps {
    initialForm: FormState;
}

export const useForm = ({ initialForm }: FormProps) => {
    const [formState, setFormState] = useState<FormState>(initialForm);

    const onInputChange = (name: keyof FormState, value: string) => {
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return {
        formState,
        onInputChange,
    };
};
