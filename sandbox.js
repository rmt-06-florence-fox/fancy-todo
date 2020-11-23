const dateToday = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
let array_dateToday = dateToday.split("-")

let thi = "2020-11-25"
let arr_thi = thi.split("-")
console.log(dateToday.split("-") )
console.log(thi.split("-"))
console.log(dateToday)

console.log(arr_thi[2] - array_dateToday[2])