// function add (a,b,cb) {
//     if(typeof a != 'number') {
//         cb('Pass a number', null)
//     }else{
//         cb(null, a+b)
//     }
// };

// function square (n, cb) {
//     if(typeof n != 'number'){
//         cb('Pass a number to square',null)
//     }else {
//         cb(null, n*n)
//     }
// }


// add(1,2, (err,data) => {
//     if(err) {
//         console.log(err)
//     }else {
//         console.log(data)
//         square(data, (err,sq) => {
//             if(err) {
//                 console.log('err in sq', err)
//             }else {
//                 square(sq, (err, doubleSq) => {
//                     if(err) {
//                         console.log(err)
//                     }else {
//                         console.log('Double Square ' +doubleSq)
//                     }
//                 })
//             }
//         })
//     }
// })


// square(5, (err,data) => {
//     if(err) {
//         console.log(err);
        
//     }else {
//         console.log('Seperate square call '+data)
//     }
// })

// Promise Implementation

function add (a,b) {
    return new Promise(function (resolve, reject) {
        if(typeof a != 'number') {
            reject('Pass a number')
        }else {
            resolve(a+b);
        }
    })
}

function square(n) {
    return new Promise ((resolve, reject) => {
        if(typeof n != 'number') {
            reject('Square is not possible with string value')
        }else {
            resolve(n*n)
        }
    })
}

add(1,2)
    .then(data => square(data))
    .then(sq => square(sq))
    .then(doubleSq => console.log(doubleSq))
    .catch(err => {
        console.log(err)
    }
)

Promise.all([add(10,10), square(10)]).then(data => {
    console.log(data)
}).catch(err => console.log(err))



// add(10,10).then(data => console.log(data)).catch(err => console.log(err))

// square(10).then(data => console.log(data)).catch(err => console.log(err))
