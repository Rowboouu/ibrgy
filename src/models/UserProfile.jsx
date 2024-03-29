import { useReducer } from 'react'

export function UserProfile() {
    const [profile, updateProfile] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            userId: null,
            userAvatar: null,
            lastname: '',
            firstname: '',
            mi: '',
            age: '',
            gender: '',
            birthdate: '',
            birthplace: '',
            zone: '',
            barangay: '',
            city: '',
            zip: '',
            national: '',
            civilstatus: '',
            occupation: '',
            phone: '',
            admin: false
        });

    return { profile, updateProfile };
}





