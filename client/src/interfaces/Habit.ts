export default interface Habit {
  id: Number;
  name: String;
  dates: Array<Date>;
  currentStreak: Number;
  longertStreak: Number;
  rewards: Array<any>;
}
