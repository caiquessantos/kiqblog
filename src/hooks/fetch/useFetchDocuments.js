import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    let unsubscribe;

    async function loadData() {
      setLoading(true);
      setError(null);

      const collectionRef = collection(db, docCollection);

      try {
        let q;

        if (search && uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            where("tagsArray", "array-contains", search.toLowerCase()),
            orderBy("createdAt", "desc"),
          );
        } else if (search && !uid) {
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", search.toLowerCase()),
            orderBy("createdAt", "desc"),
          );
        } else if (!search && uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc"),
          );
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"));
        }

        unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            if (!cancelled.current) {
              setDocuments(
                querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                })),
              );
              setLoading(false);
            }
          },
          (err) => {
            console.log(err);
            if (!cancelled.current) {
              setError(err.message);
              setLoading(false);
            }
          },
        );
      } catch (error) {
        console.log(error);
        if (!cancelled.current) {
          setError(error.message);
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled.current = true;
      if (unsubscribe) unsubscribe();
    };
  }, [docCollection, search, uid]);

  return { documents, loading, error };
};
