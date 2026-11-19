import { useEffect, useReducer, useRef } from "react";
import { db } from "../../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  const cancelled = useRef(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled.current) {
      dispatch(action);
    }
  };

  const updateDocument = async (uid, data) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const docRef = doc(db, docCollection, uid);

      const updatedDocument = await updateDoc(docRef, data);

      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument,
      });

      return true;
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });

      return false;
    }
  };

  useEffect(() => {
    cancelled.current = false;
    return () => {
      cancelled.current = true;
    };
  }, []);

  return { updateDocument, response };
};
