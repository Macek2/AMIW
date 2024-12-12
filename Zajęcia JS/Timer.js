let x = 10
 
const interval = setInterval(() => {
    console.log(x)
    x--
}, 1000)
 
setTimeout(() => clearInterval(interval), 11000)