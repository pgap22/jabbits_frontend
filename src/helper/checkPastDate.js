export function checkPastDate(date){
    return new Date(new Date(date).setHours(24)) <= Date.now();
}