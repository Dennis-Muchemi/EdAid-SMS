import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';  // Import Firestore functions
import { app } from '../firebase/firebase.config';  // Firebase app initialization
import useAxiosCommon from '../hooks/useAxiosCommon';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);  // Initialize Firestore

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setUser(null);
    setLoading(true);
    signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Function to save user data to Firestore
  const saveUserData = async (user) => {
    try {
      const userRef = doc(db, 'users', user.uid);  // Reference to user's document in 'users' collection
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
      });
      console.log('User data saved to Firestore');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  };

  // onAuthStateChanged Listener to handle user authentication state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        saveUserData(currentUser);  // Save user data to Firestore
        axiosCommon.post(`/jwt`, { email: currentUser.email }).then((res) => {
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, [axiosCommon, user]);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
