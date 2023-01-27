export const traditionalDate = (d)=>{
    const date = new Date(d);
    date.setHours(24);
    const option = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return date.toLocaleDateString('es-ES', option);
}