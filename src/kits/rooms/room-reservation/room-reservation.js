import "./room-reservation.scss";
import { calendars } from "../cross-mixins/calendar/calendar.mixin";

const reservationCalendar = calendars.getCalendars()["reservationCalendar"];
console.log(reservationCalendar.querySelectorAll(".calendar__item"));
