import "./room-reservation.scss";
import { calendars } from "../cross-mixins/calendar/calendar.mixin";

import "../cross-mixins/calendar/calendar.mixin";
import "../cross-mixins/guests-counter/guests-counter.mixin";

const reservationCalendar = calendars.getCalendars()["reservationCalendar"];
console.log(reservationCalendar.querySelectorAll(".calendar__item"));
