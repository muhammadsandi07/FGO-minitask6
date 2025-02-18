const getNumber = (n) =>{
    if(typeof n !== "number") return console.log("inputan harus angka")
    if(n < 1 ) return console.log("nilai input tidak boleh kurang dari 1")
    for(let i = 1; i <= n; i++ ){
        setTimeout(() =>{
            showNumber(i)
        }, i* 1000)
    }
}

const showNumber = (number) =>{
    console.log(number)
}  

getNumber(10)