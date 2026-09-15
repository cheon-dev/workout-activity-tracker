import {
  ref,
  push,
  set,
  update,
  remove,
  onValue
} from 'firebase/database';

import { db } from '../firebase';

export interface Workout {
  id?: string;
  exerciseName: string;
  exerciseType: string;
  duration: number;
  repetitions: number;
  date: string;
  notes: string;
}

// CREATE
export const addWorkout = async (
  workout: Omit<Workout, 'id'>
) => {
  const workoutsRef = ref(db, 'workouts');
  const newWorkoutRef = push(workoutsRef);

  await set(newWorkoutRef, workout);
};

// READ
export const getWorkouts = (
  callback: (workouts: Workout[]) => void
) => {
  const workoutsRef = ref(db, 'workouts');

  return onValue(workoutsRef, (snapshot) => {
    const data = snapshot.val();
    const workouts: Workout[] = [];

    if (data) {
      Object.keys(data).forEach((id) => {
        workouts.push({
          id,
          ...data[id]
        });
      });
    }

    callback(workouts);
  });
};

// UPDATE
export const updateWorkout = async (
  id: string,
  workout: Omit<Workout, 'id'>
) => {
  const workoutRef = ref(db, `workouts/${id}`);

  await update(workoutRef, workout);
};

// DELETE
export const deleteWorkout = async (id: string) => {
  const workoutRef = ref(db, `workouts/${id}`);

  await remove(workoutRef);
};