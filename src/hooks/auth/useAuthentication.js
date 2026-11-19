import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      return user;
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          setError("A senha deve ter pelo menos 6 caracteres.");
          break;
        case "auth/email-already-in-use":
          setError("Este email já está cadastrado.");
          break;
        case "auth/invalid-email":
          setError("Informe um endereço de email válido.");
          break;
        default:
          setError("Ocorreu um erro ao criar sua conta. Tente novamente.");
          break;
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    checkIfIsCancelled();
    await signOut(auth);
  };

  const loginUser = async (data) => {
    setLoading(true);
    checkIfIsCancelled();
    setError(null);

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      return user;
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          setError("E-mail ou senha incorretos.");
          break;
        default:
          setError("Ocorreu um erro ao entrar. Tente novamente.");
          break;
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    loginUser,
  };
};
