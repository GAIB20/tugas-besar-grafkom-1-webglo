
//implementation of quick sort algorithm ascending
export function quickSort(arr : any[], predicated : (a: any) => number) : void{
    if(arr.length <= 1){
        return;
    }

    const pivot = arr[Math.floor(arr.length/2)];
    const left : any[] = [];
    const right : any[] = [];

    for(let i = 0; i < arr.length; i++){
        if(i == Math.floor(arr.length/2)) continue;
    
        if(predicated(arr[i]) < predicated(pivot)){
            left.push(arr[i]);
        }
        else{
            right.push(arr[i]);
        }
    }

    quickSort(left, predicated);
    quickSort(right, predicated);

    arr.length = 0;
    arr.push(...left);
    arr.push(pivot);
    arr.push(...right);
}
