import Habit from '../interfaces/Habit'; 

export default class HabitService{
    habits: Array<Habit>; 

    constructor(){
        this.habits = []; 
    }

    
}