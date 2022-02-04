<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="handleRemove">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="localCopyAgendaItem.type"/>
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input
            type="time"
            placeholder="00:00"
            name="startsAt"
            v-model="localCopyAgendaItem.startsAt"
            @change="updateEndsTime"
          />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input
            type="time"
            placeholder="00:00"
            name="endsAt"
            v-model="localCopyAgendaItem.endsAt"
            @change="calculateDuration"
          />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group :label="title">
      <ui-input name="title" v-model="localCopyAgendaItem.title"/>
    </ui-form-group>
    <ui-form-group label="Докладчик" v-if="talk">
      <ui-input name="speaker" v-model="localCopyAgendaItem.speaker"/>
    </ui-form-group>
    <ui-form-group label="Описание" v-if="talk || other">
      <ui-input multiline name="description" v-model="localCopyAgendaItem.description"/>
    </ui-form-group>
    <ui-form-group label="Язык" v-if="talk">
      <ui-dropdown title="Язык" :options="$options.talkLanguageOptions" name="language" v-model="localCopyAgendaItem.language"/>
    </ui-form-group>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

const HOURS_A_DAY = 24;
const MINUTES_PER_HOUR = 60;

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  data() {
    return {
      localCopyAgendaItem: {
        ...this.agendaItem
      },
      duration: null,
    }
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    talk() {
      return this.localCopyAgendaItem.type === 'talk';
    },
    other() {
      return this.localCopyAgendaItem.type === 'other';
    },
    title() {
      return (this.talk) ? "Тема" : (this.other ? "Заголовок" : "Нестандартный текст (необязательно)");
    },
  },

  watch: {
    localCopyAgendaItem: {
      deep: true,
      handler: function() {
        this.$emit('update:agendaItem', {...this.localCopyAgendaItem});
      }
    },
  },

  methods: {
    handleRemove() {
      this.$emit('remove');
    },
    updateEndsTime() {
      let hours = parseInt(this.localCopyAgendaItem.startsAt.split(':')[0]) + this.duration.hours;
      let minutes = parseInt(this.localCopyAgendaItem.startsAt.split(':')[1]) + this.duration.minutes;
      if (minutes >= MINUTES_PER_HOUR) {
        minutes = minutes % MINUTES_PER_HOUR;
        hours++;
      };
      hours = hours % HOURS_A_DAY;
      hours = (hours.toString().length < 2) ? '0' + hours : hours;
      minutes = (minutes.toString().length < 2) ? '0' + minutes : minutes;
      this.localCopyAgendaItem.endsAt = hours + ':' + minutes;
    },
    calculateDuration() {
      let hours = parseInt(this.localCopyAgendaItem.endsAt.split(':')[0]) - parseInt(this.localCopyAgendaItem.startsAt.split(':')[0]),
          minutes = parseInt(this.localCopyAgendaItem.endsAt.split(':')[1]) - parseInt(this.localCopyAgendaItem.startsAt.split(':')[1]);
      if (minutes < 0) {
        minutes = minutes + MINUTES_PER_HOUR;
        hours--;
      };
      if (hours < 0) {
        hours = hours + HOURS_A_DAY;
      };
      this.duration = {
        hours,
        minutes
      };
    }
  },

  mounted() {
    this.calculateDuration();
  }

};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
