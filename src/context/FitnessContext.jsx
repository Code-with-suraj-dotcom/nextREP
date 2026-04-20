import { useEffect, useState } from 'react';
import { FitnessContext } from './FitnessContext.js';
import { useAuth } from './AuthContext';
import {
  subscribeToSavedExerciseIds,
  saveExercise,
  unsaveExercise,
} from '../services/firebase';

export const FitnessProvider = ({ children }) => {
  const [allExercises, setAllExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedList, setSavedList] = useState([]);

  const [selectedBodyPart, setSelectedBodyPart] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setSavedList([]);
      return undefined;
    }
    return subscribeToSavedExerciseIds(currentUser.uid, setSavedList);
  }, [currentUser]);

  const toggleSaved = async (exerciseId) => {
    if (!currentUser) return false;
    if (savedList.includes(exerciseId)) {
      await unsaveExercise(currentUser.uid, exerciseId);
    } else {
      await saveExercise(currentUser.uid, exerciseId);
    }
    return true;
  };

  return (
    <FitnessContext.Provider
      value={{
        allExercises,
        setAllExercises,
        exercises,
        setExercises,
        loading,
        setLoading,
        savedList,
        toggleSaved,
        selectedBodyPart,
        setSelectedBodyPart,
        selectedEquipment,
        setSelectedEquipment,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};
