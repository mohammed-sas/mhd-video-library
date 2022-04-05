export const convertTime = (time) =>{
    time = Number(time);
    if(time >= 3600){
        return `${Math.floor(time / 3600)}:${Math.floor((time % 3600) / 60)}:${Math.floor(time % 60)}`;
    }
    if(time<=10){
        return `${Math.floor(time / 60)}:0${Math.floor(time % 60)}`;
    }
        return `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
    
}