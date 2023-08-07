export function secondsToMiniutes(s){
    if(s){
    const time = new Date(s * 1000);
    const miniutes = time.getMinutes();
    const seconds = time.getSeconds().toString().padStart(2,'0');

    return `${miniutes}:${seconds}`;
    }else{

        return "0:00";
    }

}

export function shuffleArray(arr) {
 

  for (let i = arr.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

   
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}