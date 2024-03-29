import { useReducer } from 'react'

export function IndigencyForm() {
    const [form, updateForm] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            name: "Certificate of Indigency",
            formId: null,
            status: 0,
            formType: "indigency",
            formTypeId: 3,
            profile: null,
            purpose: '',
            income: 'Below Php 10,000',
            uploaded_docs: null,
            pick_up: '',
            payment_method: 'Cash on pick-up'
        });

    return { form, updateForm };
}





