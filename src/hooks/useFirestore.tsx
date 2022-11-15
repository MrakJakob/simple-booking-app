import { appFirestore } from "../firebase/config";
import { SalonType } from "../types/SalonType";
import { UserType } from "../types/UserType";
import { arrayRemove, updateDoc, doc } from "firebase/firestore";

export const useFirestore = (collection: string) => {};

export const createUserDocument = async (
  user: { uid?: any; email?: any },
  additionalData: { name: string }
) => {
  // console.log("createUserDocument");
  if (!user) return;

  // console.log(user.uid);
  const userRef = appFirestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { name } = additionalData;

    try {
      await userRef.set({
        name,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log("Firestore: Error creating user", error);
    }
  }
};

export const getUserDocument = async (uid: any) => {
  if (!uid) return null;
  // console.log("get user document");

  try {
    const userDocument = await appFirestore.doc(`users/${uid}`).get();
    // console.log("Firestore user document: " + userDocument);
    const user: UserType = {
      uid: uid,
      email: userDocument.data()?.email,
      name: userDocument.data()?.name,
      createdAt: userDocument.data()?.createdAt,
      apointments: userDocument.data()?.apointments,
      salons: userDocument.data()?.salons,
    };
    return user;
  } catch (error) {
    console.log("Firestore: Error getting user", error);
  }
};

export const createSalonDocument = async (salon: any) => {
  if (!salon) return null;

  try {
    const res = await appFirestore.collection("salons").add(salon);
    return res.id;
  } catch (error) {
    console.log("Firestore: Error creating salon", error);
  }
  // console.log("createSalonDocument");
};

export const getUsersSalons = async (uid: string) => {
  if (!uid) return null;

  try {
    const res = await appFirestore
      .collection("salons")
      .where("ownerId", "==", uid)
      .get();

    const salons = res.docs.map((doc) => {
      const salon: SalonType = {
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        ownerId: doc.data().ownerId,
        services: doc.data().services,
        timetable: doc.data().timetable,
      };
      return salon;
    });

    return salons;
  } catch (error) {
    console.log("Firestore: Error getting users salons", error);
  }
};

export const getAllSalons = async () => {
  try {
    const res = await appFirestore.collection("salons").get();
    const salons = res.docs.map((doc) => {
      const salon: SalonType = {
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        ownerId: doc.data().ownerId,
        services: doc.data().services,
        timetable: doc.data().timetable,
      };
      return salon;
    });
    return salons;
  } catch (error) {
    console.log("Firestore: Error getting all salons", error);
  }
};

export const getSalonDocument = async (id: string) => {
  if (!id) return null;

  try {
    const res = await appFirestore.collection("salons").doc(id).get();
    const salon: SalonType = {
      id: res.id,
      name: res.data()?.name,
      email: res.data()?.email,
      ownerId: res.data()?.ownerId,
      services: res.data()?.services,
      timetable: res.data()?.timetable,
    };
    return salon;
  } catch (error) {
    console.log("Firestore: Error getting salon", error);
  }
};

export const updateSalonsTimeTable = async (
  salonId: string,
  termin: string
) => {
  if (!salonId || !termin) return null;

  try {
    const salonRef = doc(appFirestore, "salons", salonId);

    const res = await updateDoc(salonRef, {
      timetable: arrayRemove(termin),
    });

    return res;
  } catch (error) {
    console.log("Firestore: Error updating salon", error);
  }
};

export const createAnApointment = async (
  uid: string,
  salonId: string,
  termin: string
) => {
  if (!uid || !salonId || !termin) return null;

  try {
    const res = await appFirestore.collection("apointments").add({
      userId: uid,
      salonId: salonId,
      termin: termin,
    });

    return res;
  } catch (error) {
    console.log("Firestore: Error creating apointment", error);
  }
};

export const getUserApointments = async (uid: string) => {
  if (!uid) return null;

  try {
    const res = await appFirestore
      .collection("apointments")
      .where("userId", "==", uid)
      .get();

    const apointments = res.docs.map((doc) => {
      const apointment = {
        id: doc.id,
        userId: doc.data().userId,
        salonId: doc.data().salonId,
        termin: doc.data().termin,
      };
      return apointment;
    });
    return apointments;
  } catch (error) {
    console.log("Firestore: Error getting users apointments", error);
  }
};

export const getSalonApointments = async (salonId: string) => {
  if (!salonId) return null;

  try {
    const res = await appFirestore
      .collection("apointments")
      .where("salonId", "==", salonId)
      .get();

    const apointments = res.docs.map((doc) => {
      const apointment = {
        id: doc.id,
        userId: doc.data().userId,
        salonId: doc.data().salonId,
        termin: doc.data().termin,
      };
      return apointment;
    });
    return apointments;
  } catch (error) {
    console.log("Firestore: Error getting salon apointments", error);
  }
};
