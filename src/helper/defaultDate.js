export default function defaultDate(date){
    const d = date;
    const m = d.getMonth()+1;

    return d.getFullYear()+"-"+(m < 9 ? "0"+m : m) +"-"+d.getDate()
}