<template>

  <ion-page>

    <ion-header class="ion-no-border">

      <ion-toolbar class="topbar">

        <ion-buttons slot="start">

          <ion-back-button
            default-href="/home"
            color="light"
          />

        </ion-buttons>

        <ion-title>
          Add Workout
        </ion-title>

      </ion-toolbar>

    </ion-header>


    <ion-content class="page-content">

      <div class="container">

        <!-- PAGE HEADING -->
        <div class="page-heading">

          <div class="heading-icon">

            <ion-icon
              :icon="addOutline"
            ></ion-icon>

          </div>

          <div>

            <p>NEW ACTIVITY</p>

            <h1>Add Workout</h1>

          </div>

        </div>


        <!-- FORM -->
        <div class="form-card">

          <!-- EXERCISE NAME -->
          <div class="field">

            <label>
              Exercise Name
            </label>

            <ion-input
              v-model="exerciseName"
              class="custom-input"
              placeholder="e.g. Push Ups"
            />

          </div>


          <!-- EXERCISE TYPE -->
          <div class="field">

            <label>
              Exercise Type
            </label>

            <ion-select
              v-model="exerciseType"
              class="custom-input"
              placeholder="Select exercise type"
              interface="action-sheet"
            >

              <ion-select-option value="Strength">
                Strength
              </ion-select-option>

              <ion-select-option value="Cardio">
                Cardio
              </ion-select-option>

              <ion-select-option value="Flexibility">
                Flexibility
              </ion-select-option>

              <ion-select-option value="Endurance">
                Endurance
              </ion-select-option>

              <ion-select-option value="Balance">
                Balance
              </ion-select-option>

              <ion-select-option value="Other">
                Other
              </ion-select-option>

            </ion-select>

          </div>


          <!-- DURATION + REPETITIONS -->
          <div class="two-columns">

            <div class="field">

              <label>
                Duration
              </label>

              <ion-input
                v-model.number="duration"
                class="custom-input"
                type="number"
                placeholder="Minutes"
              />

            </div>


            <div class="field">

              <label>
                Repetitions
              </label>

              <ion-input
                v-model.number="repetitions"
                class="custom-input"
                type="number"
                placeholder="Reps"
              />

            </div>

          </div>


          <!-- DATE -->
          <div class="field">

            <label>
              Date
            </label>

            <ion-input
              v-model="date"
              class="custom-input"
              type="date"
            />

          </div>


          <!-- NOTES -->
          <div class="field">

            <label>
              Notes
            </label>

            <ion-textarea
              v-model="notes"
              class="custom-input notes-input"
              :auto-grow="true"
              placeholder="Add notes about your workout..."
            />

          </div>


          <!-- SAVE BUTTON -->
          <ion-button
            expand="block"
            class="save-button"
            @click="saveWorkout"
          >

            <ion-icon
              slot="start"
              :icon="checkmarkOutline"
            ></ion-icon>

            Save Workout

          </ion-button>

        </div>

      </div>

    </ion-content>

  </ion-page>

</template>


<script setup lang="ts">

import {
  ref
} from 'vue';

import {
  useRouter
} from 'vue-router';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  toastController
} from '@ionic/vue';

import {
  addOutline,
  checkmarkOutline,
  checkmarkCircleOutline,
  warningOutline,
  closeCircleOutline
} from 'ionicons/icons';

import {
  addWorkout
} from '../services/workoutService';


const router = useRouter();


const exerciseName = ref('');

const exerciseType = ref('');

const duration =
  ref<number | null>(null);

const repetitions =
  ref<number | null>(null);

const date = ref('');

const notes = ref('');


// TOAST MESSAGE
const showToast = async (
  message: string,
  color: string = 'success',
  icon = checkmarkCircleOutline
) => {

  const toast =
    await toastController.create({

      message: message,

      duration: 2000,

      position: 'top',

      color: color,

      icon: icon

    });

  await toast.present();

};


// SAVE WORKOUT
const saveWorkout = async () => {

  if (
    !exerciseName.value ||
    !exerciseType.value ||
    !duration.value ||
    !repetitions.value ||
    !date.value
  ) {

    await showToast(
      'Please complete all required fields.',
      'warning',
      warningOutline
    );

    return;

  }


  try {

    await addWorkout({

      exerciseName:
        exerciseName.value,

      exerciseType:
        exerciseType.value,

      duration:
        duration.value,

      repetitions:
        repetitions.value,

      date:
        date.value,

      notes:
        notes.value

    });


    await showToast(
      'Workout added successfully!',
      'success',
      checkmarkCircleOutline
    );


    setTimeout(() => {

      router.push('/home');

    }, 500);


  } catch (error) {

    console.error(error);

    await showToast(
      'Unable to add workout.',
      'danger',
      closeCircleOutline
    );

  }

};

</script>


<style scoped>

.page-content {
  --background: #0e1110;
}

.topbar {
  --background: #0e1110;
  --color: #ffffff;
}

.container {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px 18px 50px;
}

.page-heading {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0 25px;
}

.heading-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 16px;
  background: #b7ff3c;
  color: #10130f;
  font-size: 28px;
}

.page-heading p {
  margin: 0 0 3px;
  color: #b7ff3c;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
}

.page-heading h1 {
  margin: 0;
  color: #ffffff;
  font-size: 27px;
  font-weight: 900;
}

.form-card {
  padding: 20px;
  border: 1px solid #292e2b;
  border-radius: 22px;
  background: #171b18;
}

.field {
  margin-bottom: 18px;
}

.field label {
  display: block;
  margin: 0 0 8px 3px;
  color: #c7ccc8;
  font-size: 12px;
  font-weight: 700;
}

.custom-input {
  --background: #101310;
  --color: #ffffff;
  --placeholder-color: #656c67;
  --padding-start: 14px;
  --padding-end: 14px;

  min-height: 52px;
  border: 1px solid #303631;
  border-radius: 13px;
}

.notes-input {
  min-height: 100px;

  --padding-top: 15px;
  --padding-bottom: 15px;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.save-button {
  --background: #b7ff3c;
  --color: #10130f;
  --border-radius: 13px;

  height: 52px;
  margin-top: 10px;
  font-weight: 900;
}

</style>