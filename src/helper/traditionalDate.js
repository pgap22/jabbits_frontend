export const traditionalDate = (d)=>{
    const date = new Date(d);
    const option = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return date.toLocaleDateString('es-ES', option);
}