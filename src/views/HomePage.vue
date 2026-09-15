<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="topbar">
        <ion-title>
          <div class="brand">
            <span class="brand-small">WORKOUT</span>
            <span class="brand-main">Activity Tracker</span>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="page-content">
      <div class="container">

        <!-- HERO -->
        <section class="hero">
          <div>
            <p class="eyebrow">YOUR FITNESS JOURNEY</p>

            <h1>
              Keep moving.<br />
              Stay strong.
            </h1>

            <p class="hero-text">
              Record your exercises and keep track of every workout.
            </p>
          </div>

          <div class="hero-icon">
            <ion-icon :icon="barbellOutline"></ion-icon>
          </div>
        </section>

        <!-- SUMMARY -->
        <section class="summary-card">
          <div class="summary-icon">
            <ion-icon :icon="fitnessOutline"></ion-icon>
          </div>

          <div>
            <span class="summary-number">
              {{ workouts.length }}
            </span>

            <span class="summary-label">
              Total Workouts
            </span>
          </div>
        </section>

        <!-- SECTION HEADER -->
        <div class="section-heading">
          <div>
            <p class="section-small">HISTORY</p>
            <h2>Your Workouts</h2>
          </div>

          <ion-button
            class="add-button"
            router-link="/add-workout"
          >
            <ion-icon
              slot="start"
              :icon="addOutline"
            ></ion-icon>

            Add
          </ion-button>
        </div>

        <!-- EMPTY STATE -->
        <div
          v-if="workouts.length === 0"
          class="empty-state"
        >
          <div class="empty-icon">
            <ion-icon :icon="barbellOutline"></ion-icon>
          </div>

          <h3>No workouts yet</h3>

          <p>
            Start recording your workout activities.
          </p>

          <ion-button
            class="primary-button"
            router-link="/add-workout"
          >
            <ion-icon
              slot="start"
              :icon="addOutline"
            ></ion-icon>

            Add Your First Workout
          </ion-button>
        </div>

        <!-- WORKOUT CARDS -->
        <div
          v-for="workout in workouts"
          :key="workout.id"
          class="workout-card"
        >
          <div class="card-top">

            <div class="exercise-info">

              <div class="exercise-icon">
                <ion-icon :icon="barbellOutline"></ion-icon>
              </div>

              <div>
                <h3>
                  {{ workout.exerciseName }}
                </h3>

                <span class="type-badge">
                  {{ workout.exerciseType }}
                </span>
              </div>

            </div>

            <span class="date">
              {{ formatDate(workout.date) }}
            </span>

          </div>

          <!-- STATS -->
          <div class="stats">

            <div class="stat">
              <ion-icon :icon="timeOutline"></ion-icon>

              <div>
                <span class="stat-value">
                  {{ workout.duration }}
                </span>

                <span class="stat-label">
                  minutes
                </span>
              </div>
            </div>

            <div class="divider"></div>

            <div class="stat">
              <ion-icon :icon="repeatOutline"></ion-icon>

              <div>
                <span class="stat-value">
                  {{ workout.repetitions }}
                </span>

                <span class="stat-label">
                  repetitions
                </span>
              </div>
            </div>

          </div>

          <!-- NOTES -->
          <div
            v-if="workout.notes"
            class="notes"
          >
            <span>NOTES</span>

            <p>
              {{ workout.notes }}
            </p>
          </div>

          <!-- ACTIONS -->
          <div class="actions">

            <ion-button
              fill="clear"
              class="edit-button"
              :router-link="`/edit-workout/${workout.id}`"
            >
              <ion-icon
                slot="start"
                :icon="createOutline"
              ></ion-icon>

              Edit
            </ion-button>

            <ion-button
              fill="clear"
              class="delete-button"
              @click="confirmDelete(workout.id!)"
            >
              <ion-icon
                slot="start"
                :icon="trashOutline"
              ></ion-icon>

              Delete
            </ion-button>

          </div>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">

import {
  ref,
  onMounted
} from 'vue';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  alertController,
  toastController
} from '@ionic/vue';

import {
  barbellOutline,
  fitnessOutline,
  addOutline,
  timeOutline,
  repeatOutline,
  createOutline,
  trashOutline,
  checkmarkCircleOutline,
  closeCircleOutline
} from 'ionicons/icons';

import {
  getWorkouts,
  deleteWorkout,
  Workout
} from '../services/workoutService';


const workouts = ref<Workout[]>([]);


// READ WORKOUTS
onMounted(() => {

  getWorkouts((data) => {

    workouts.value = data;

  });

});


// TOAST MESSAGE
const showToast = async (
  message: string,
  color: string = 'success',
  icon = checkmarkCircleOutline
) => {

  const toast = await toastController.create({

    message: message,

    duration: 2000,

    position: 'top',

    color: color,

    icon: icon

  });

  await toast.present();

};


// DELETE CONFIRMATION
const confirmDelete = async (id: string) => {

  const alert = await alertController.create({

    header: 'Delete Workout',

    message:
      'Are you sure you want to delete this workout? This action cannot be undone.',

    buttons: [

      {
        text: 'Cancel',
        role: 'cancel'
      },

      {
        text: 'Delete',
        role: 'destructive',

        handler: () => {

          removeWorkout(id);

        }
      }

    ]

  });

  await alert.present();

};


// DELETE WORKOUT
const removeWorkout = async (id: string) => {

  try {

    await deleteWorkout(id);

    await showToast(
      'Workout deleted successfully!',
      'success',
      checkmarkCircleOutline
    );

  } catch (error) {

    console.error(error);

    await showToast(
      'Unable to delete workout.',
      'danger',
      closeCircleOutline
    );

  }

};


// FORMAT DATE
const formatDate = (date: string) => {

  if (!date) {
    return '';
  }

  const [
    year,
    month,
    day
  ] = date.split('-');

  const formattedDate = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  return formattedDate.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  );

};

</script>


<style scoped>

.page-content {
  --background: #0e1110;
}

.topbar {
  --background: #0e1110;
  --color: #ffffff;
  padding-top: 5px;
}

.brand {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
}

.brand-small {
  color: #b7ff3c;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 3px;
}

.brand-main {
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
}

.container {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 18px;
  padding-bottom: 50px;
}

.hero {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  min-height: 200px;
  padding: 26px;
  border: 1px solid #292e2b;
  border-radius: 25px;
  background: #171b18;
}

.eyebrow,
.section-small {
  margin: 0 0 8px;
  color: #b7ff3c;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
}

.hero h1 {
  margin: 0;
  color: #ffffff;
  font-size: 35px;
  line-height: 1.05;
  font-weight: 900;
}

.hero-text {
  max-width: 260px;
  margin-top: 15px;
  color: #9da49f;
  font-size: 14px;
  line-height: 1.5;
}

.hero-icon {
  position: absolute;
  right: -20px;
  bottom: -25px;
  color: #b7ff3c;
  opacity: 0.12;
  font-size: 150px;
  transform: rotate(-15deg);
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
  padding: 18px;
  border: 1px solid #292e2b;
  border-radius: 18px;
  background: #171b18;
}

.summary-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #b7ff3c;
  color: #10130f;
  font-size: 25px;
}

.summary-number {
  display: block;
  color: #ffffff;
  font-size: 25px;
  font-weight: 900;
}

.summary-label {
  color: #858d87;
  font-size: 12px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 32px 2px 15px;
}

.section-heading h2 {
  margin: 0;
  color: #ffffff;
  font-size: 24px;
  font-weight: 900;
}

.add-button,
.primary-button {
  --background: #b7ff3c;
  --color: #10130f;
  --border-radius: 12px;
  font-weight: 800;
}

.workout-card {
  margin-bottom: 15px;
  padding: 18px;
  border: 1px solid #292e2b;
  border-radius: 20px;
  background: #171b18;
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.exercise-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.exercise-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
  height: 45px;
  border-radius: 13px;
  background: #242a25;
  color: #b7ff3c;
  font-size: 23px;
}

.exercise-info h3 {
  margin: 0 0 5px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
}

.type-badge {
  color: #b7ff3c;
  font-size: 11px;
  font-weight: 700;
}

.date {
  color: #777f79;
  font-size: 11px;
  white-space: nowrap;
}

.stats {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 15px;
  border-radius: 14px;
  background: #101310;
}

.stat {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 10px;
  color: #b7ff3c;
}

.stat ion-icon {
  font-size: 20px;
}

.stat-value {
  display: block;
  color: #ffffff;
  font-size: 17px;
  font-weight: 800;
}

.stat-label {
  color: #747b76;
  font-size: 10px;
}

.divider {
  width: 1px;
  height: 35px;
  margin: 0 15px;
  background: #292e2b;
}

.notes {
  margin-top: 14px;
  padding: 13px;
  border-left: 3px solid #b7ff3c;
  border-radius: 4px 10px 10px 4px;
  background: #121512;
}

.notes span {
  color: #6f7771;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1px;
}

.notes p {
  margin: 5px 0 0;
  color: #b8beb9;
  font-size: 12px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid #262b27;
}

.edit-button {
  --color: #b7ff3c;
  font-weight: 700;
}

.delete-button {
  --color: #ff6565;
  font-weight: 700;
}

.empty-state {
  padding: 50px 20px;
  border: 1px dashed #343a35;
  border-radius: 20px;
  text-align: center;
}

.empty-icon {
  color: #b7ff3c;
  font-size: 50px;
}

.empty-state h3 {
  margin-bottom: 5px;
  color: #ffffff;
}

.empty-state p {
  margin-bottom: 20px;
  color: #777f79;
}

</style>