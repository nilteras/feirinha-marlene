
export function randomId (){
    const array = ["1", "2", "3", "4", "5"]
    return array[(Math.random()*5).toFixed(0)]
}

export function getFruitWithOutId (){
    return null 
}