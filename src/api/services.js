import {
    doc,
    collection,
    setDoc,
    addDoc,
    Timestamp,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
    getDocs,
    where,
    query,
    orderBy,
    onSnapshot
} from 'firebase/firestore';

import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

import { db, storage } from '../../firebase'

const addUserProfile = (userId, profile) => {

    return setDoc(doc(db, "profiles", userId), {
        profile
    });

}

const getUser = (userId) => {
    return getDoc(doc(db, "profiles", userId));
}

const getBarangay = () => {
    return getDoc(doc(db, "barangay", 'TSWkJ9nGq8dHy2aI4PyD'));
}

const setBarangay = (details) => {
    return setDoc(doc(db, "barangay", 'TSWkJ9nGq8dHy2aI4PyD'), { details });
}

const getContact = () => {
    return getDoc(doc(db, "contact", 'tNYjFWfr8epQ52f7AZwt'));
}

const setContact = (data) => {
    return setDoc(doc(db, "contact", 'tNYjFWfr8epQ52f7AZwt'), { data });
}

const requestForm = async (form) => {

    const notif = {
        from: form.profile,
        message: form.name,
        reason: null,
        status: form.status,
        createdAt: new Date(),
        read: false
    };

    await addNotification(notif);

    return addDoc(collection(db, "forms"), {
        "formType": form.formType,
        "formTypeId": form.formTypeId,
        "userId": form.profile.userId,
        "createdAt": Timestamp.now(),
        "status": 0,
        form
    });
}

const createNotification = async (form, status, reason) => {

    const notif = {
        from: form.profile,
        message: form.name,
        reason: reason,
        status: status,
        createdAt: new Date(),
        read: false
    };

    await addNotification(notif);
}

const addNotification = (notification) => {

    return addDoc(collection(db, "notifications"), {
        from: notification.from,
        status: notification.status,
        message: notification.message,
        reason: notification.reason,
        createdAt: notification.createdAt,
        read: notification.read
    });
}

const getNotifications = () => {
    const docRef = collection(db, "notifications");

    return query(docRef, where('status', '==', 0), orderBy('createdAt', 'desc'))
}

const getMyNotifications = (userId) => {
    const docRef = collection(db, "notifications");

    return query(docRef, where('from.userId', '==', userId), orderBy('createdAt', 'desc'))
}

const getAllRequestForms = () => {
    const formRef = collection(db, "forms");

    return formRef;
}

const getRequestForms = (userId) => {
    const formRef = collection(db, "forms");

    return query(formRef, where('userId', '==', userId), orderBy('createdAt', 'asc'))
}

const getDocuments = () => {
    const docRef = collection(db, "documents");

    return query(docRef)
}

const updateDocument = (documentId, update) => {

    return updateDoc(doc(db, "documents", documentId), {
        update
    });
}

const addDocument = (document) => {

    return addDoc(collection(db, "documents"), {
        name: document.name,
        description: document.description,
        id: document.id,
        price: document.price,
        fields: document.fields,
        createdAt: new Date()
    });
}

const updateFormStatus = (formId, status) => {

    return updateDoc(doc(db, "forms", formId), {
        status: status
    });

}

export {
    addUserProfile,
    getUser,
    requestForm,
    getRequestForms,
    getBarangay,
    setBarangay,
    getContact,
    setContact,
    getDocuments,
    updateDocument,
    addDocument,
    getAllRequestForms,
    addNotification,
    getNotifications,
    getMyNotifications,
    createNotification,
    updateFormStatus,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    storage,
    onSnapshot,
    Timestamp
}
