 const valuesUpTo9 = {
    0: "",
    1: "один",
    2: "два",
    3: "три",
    4: "четыре",
    5: "пять",
    6: "шесть",
    7: "семь",
    8: "восемь",
    9: "девять"
}

 const valuesUpTo9Options = {
    0: "",
    1: "одна",
    2: "две",
}

 const valuesFrom10To19 = {
    10: "десять",
    11: "одиннадцать",
    12: "двенадцать",
    13: "тринадцать",
    14: "четырнадцать",
    15: "пятнадцать",
    16: "шестнадцать",
    17: "семнадцать",
    18: "восемнадцать",
    19: "девятнадцать"
}

 const dozens = {
    0: "",
    2: "двадцать",
    3: "тридцать",
    4: "сорок",
    5: "пятьдесят",
    6: "шестьдесят",
    7: "семьдесят",
    8: "восемьдесят",
    9: "девяносто"
}

 const hundreds = {
    0: "",
    1: "сто",
    2: "двести",
    3: "триста",
    4: "четыреста",
    5: "пятьсот",
    6: "шестьсот",
    7: "семьсот",
    8: "восемьсот",
    9: "девятьсот",
}

 const bigNumbersNames = {
    0: ["", "", ""],
    1: ["тысяча", "тысячи", "тысяч"],
    2: ["миллион", "миллиона", "миллионов"],
    3: ["миллиард", "миллиарда", "миллиардов"],
    4: ["триллион", "триллиона", "триллионов"],
    5: ["квадриллион", "квадриллиона", "квадриллионов"],
}


// разбиваем число в массив типа [ '11', '212', '555']

 const splitArr = (val) => {
    const arrRes = []
    const split = (num) => {
        const arrNum = num.toString().split("")

        if (arrNum.length > 3) {
            debugger
            const arrStr = arrNum.splice(0 - 3).join("");
            arrRes.push(arrStr)
            split(arrNum.join(""))
        } else {
            debugger
            if (arrNum.length > 0) arrRes.push(arrNum.join("").toString())
            return
        }
    }
    split(val)
    return arrRes.reverse()
}


// определяем склонение тысяч, миллионов и и т.д.

const bigNumbersNamesFormat = (num, i) => {

    const numStr = +num[num.length-1]
    const numStrDozens = +(((num.length>1)?num[num.length-2]:"") + num[num.length-1])
    debugger
    num = Number(num)
    if (num !== 0) {
        if (numStr === 1 && numStrDozens!==11 && numStrDozens!==12) {
            return bigNumbersNames[i][0]
        }
        if (numStr > 1 && numStr < 5 && numStrDozens!==12 && numStrDozens!==13 && numStrDozens!==14) {debugger
            return bigNumbersNames[i][1]
        }
        return bigNumbersNames[i][2]

    } else {
        return ""
    }
};

//перевод трехзначного числа в строку

 const SimpleValue = (value, i) => {
    if (value.length === 1) {
        value = "00" + value
    }
    if (value.length === 2) {
        value = "0" + value
    }
    const val = hundreds[+value[0]] + " " + (value[1] === "1" ?
        valuesFrom10To19[+(value[1] + value[2])]
        : dozens[+value[1]] + " "
        + ((i === 1 && +value[2] < 3) ? valuesUpTo9Options[+value[2]] : valuesUpTo9[+value[2]])) // проверяем на склонение (один, два)
    return val
}
//---------------------------------------------------------------------------------------------------
 const translate = (num) => {
    debugger
    const split = splitArr(num) 
    const newArr = split.reverse().map((itemNum, i) => SimpleValue(itemNum, i) + " " + bigNumbersNamesFormat(itemNum, i)).reverse()

    return  document.querySelector('.resultType').innerHTML = newArr.join(" ")

}

const onClickHandler = () => {

    let typeValue = document.querySelector("input").value

    if (typeValue.length > 18) {
        document.querySelector('.error').innerHTML = 'Пожалуйста, введите число, содержащее не более 18 символов (квадриллион).'
    }
    if (typeValue.includes('-')) {
        document.querySelector('.error').innerHTML = 'Пожалуйста, введите целое, натуральное, положительное число.'

    }
    if (typeValue.includes('.')) {
        document.querySelector('.error').innerHTML = 'Пожалуйста, введите целое, натуральное, положительное число.'
    }
    if (typeValue.includes(',')) {
        document.querySelector('.error').innerHTML = 'Пожалуйста, введите целое, натуральное, положительное число.'
    }
    if (!Number(typeValue)) {
        document.querySelector('.error').innerHTML = 'Пожалуйста, введите целое, натуральное, положительное число.'
    }

    const Words = translate(typeValue)

}

document.querySelector('button').onclick = onClickHandler


