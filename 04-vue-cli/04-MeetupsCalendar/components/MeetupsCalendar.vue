<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="prevMonth"></button>
        <div class="calendar-view__date">{{ title }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="nextMonth"></button>
      </div>
    </div>
    <div class="calendar-view__grid">
      <div
        v-for="day in calendar"
        :key="day.id"
        :class="{ 'calendar-view__cell_inactive': !day.active }"
        class="calendar-view__cell"
        tabindex="0"
      >
        <div class="calendar-view__cell-day" :class="{ 'calendar-view__cell-day--today': day.today }">
          <span>{{ day.value }}</span>
        </div>
        <div class="calendar-view__cell-content">
          <template v-if="day.meetups.length">
            <a
              v-for="(meetup, index) in day.meetups"
              :key="index"
              :href="`/meetups/${meetup.id}`"
              class="calendar-event"
            >
              {{ meetup.title }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const msPerDay = 86400000;

export default {
  name: 'MeetupsCalendar',
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    calendar: null,
    // начало месяца, в нашем случае обозначает выбранный месяц
    date: new Date(new Date().setDate(1)),
  }),
  computed: {
    title: (vm) => vm.date.toLocaleDateString(navigator.language, { year: 'numeric', month: 'long' }),
  },
  watch: {
    date: {
      handler() {
        this.calendar = this.createCalendar();
      },
      immediate: true,
    },
  },
  methods: {
    prevMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
    },
    nextMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
    },
    getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
      let day = date.getDay();
      if (day === 0) day = 7; // сделать воскресенье (0) последним днем
      return day - 1; // устранить погрешность после перемещения
    },

    createCalendar() {
      // месяцы в JS идут от 0 до 11, а не от 1 до 12!
      const month = this.date.getMonth();
      let d = new Date(this.date.getFullYear(), month); // 00:00:00 01 числа выбранного месяца (и года)
      const result = [];
      // с понедельника до первого дня месяца
      // * * * 1  2  3  4
      for (let i = this.getDay(d); i > 0; i--) {
        const value = new Date(d - i * msPerDay).getDate();
        const payload = {
          value,
          meetups: [],
          active: false,
          id: `${d.getFullYear()}_${d.getMonth()}_${value} (prev)`,
        };
        result.push(payload);
      }
      // даты выбранного месяца
      while (d.getMonth() === month) {
        const payload = {
          value: d.getDate(),
          meetups: this.meetups.filter((el) => {
            return el.date >= Date.parse(d) && el.date < Date.parse(d) + msPerDay;
          }),
          active: true,
          id: `${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`,
          today: d.getDate() === new Date().getDate(),
        };
        result.push(payload);
        d.setDate(d.getDate() + 1);
      }
      // 29 30 31 * * * *
      if (this.getDay(d) !== 0) {
        for (let i = this.getDay(d); i < 7; i++) {
          const payload = {
            value: d.getDate(),
            meetups: [],
            active: false,
            id: `${d.getFullYear()}_${d.getMonth()}_${d.getDate()} (next)`,
          };
          result.push(payload);
          d.setDate(d.getDate() + 1);
        }
      }
      return result;
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

.calendar-view__cell-day--today {
  display: inline-flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  background-color: var(--blue-extra);
  border-radius: 50%;
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
