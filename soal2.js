const dataUser = [ {
        id: 1,
        name: "saha"
    },
    {   
        id:2,
        name: "abi"
    }
]

const dataBelanjaUser = [
    {
        id: 1,
        product: "sepatu",
        harga: 200_000,
        jumlah : 3
    },
    
    {
        id: 2,
        product: "T-shirt",
        harga: 50_000,
        jumlah: 2

    },
    {
        id: 3,
        product: "jeans",
        harga: 15_000,
        jumlah: 1
    },
    {
        id: 4,
        product: "kemeja",
        harga: 130_000,
        jumlah: 2
    },

]


const getUser = (id) =>{
    return new Promise ((resolve, reject) =>{
        if(typeof id !== 'number') return reject (new Error("inputan harus berupa number"))
        setTimeout(() =>{
            const user = dataUser.find((user) => user.id === id)
            if(user) return resolve(user)
            reject(new Error("data user tidak ditemukan"))
        }, 1000)
    })
}

const getDataBelanja = ({id}) =>{
    return new Promise((resolve, reject) =>{
        if(typeof id !== "number")  return reject (new Error("id harus berupa number"))
            setTimeout(() =>{
            if(id) return resolve(dataBelanjaUser)
            reject(new Error("ada kesalahan"))
        }, 1)
          
    })
}

const payment = (shoppingCart) =>{
    const {totalBelanja, totalItem} =shoppingCart.reduce((total, cartItem ) => {
        const {harga,jumlah} = cartItem
        total.totalBelanja += harga * jumlah
        total.totalItem += jumlah
        return total
    },{totalBelanja: 0,
        totalItem:0
    })
    if(totalBelanja <= 0){
        console.log("total belanja harus lebih dari 0")
        return
    }
    let diskon = null
    if(totalBelanja >= 1_000_000){
        diskon = 10
    }else if (totalBelanja >= 500_000 && totalBelanja < 1_000_000){
        diskon = 5
    }else{
        diskon = 0
    }

    const totalBayar = totalBelanja - (totalBelanja * (diskon / 100))
    if(diskon !== 0){
        return `total item = ${totalItem}
subtotal = ${totalBelanja},
Anda mendapatkan diskon ${diskon}%,
total belanja anda menjadi ${Math.trunc(totalBayar)}`
    }else{
        return `total item = ${totalItem}
subtotal = ${totalBelanja},
Anda tidak mendapatkan diskon,
total belanja anda menjadi ${Math.trunc(totalBayar)}`
    }
}



const dataPayment = async () =>{
    try {
        const user = await getUser(1)
        const getShoopingCart = await getDataBelanja(user)
        const paymentUser = payment(getShoopingCart)
        console.log(paymentUser)
    } catch (error) {
        console.log(error.message)
    }finally{
        console.log('pembayaran selesai')
    }
}


dataPayment()
