export const getWindDirection = (deg: number): string => {
    if(deg > 15 && deg <= 75) return 'NE'

    if(deg > 76 && deg <= 105) return 'E'
    if(deg > 105 && deg <= 165) return 'SE'

    if(deg > 166 && deg <= 195) return 'S'
    if(deg > 195 && deg <= 255) return 'SW'

    if(deg > 255 && deg <= 285) return 'NE'
    if(deg > 285 && deg <= 345) return 'NE'

    return 'N';
}

export const getHumidityValue = (level: number): string =>{
    if(level <= 55) return 'Dry And Comfortable';
    if(level > 55 && level <=65) return 'A Bit Uncomfortable, Sticky feeling'
    return 'Lots of moisture, uncomfortable air'
}

export const getVisibilityValue = (number:number): string => {
    if(number <= 50) return 'Dangerously foggy'
    if(number > 50 && number <= 500) return 'Expect heavy fog'
    if(number > 500 && number <= 2000) return 'Expect some fog'
    if(number > 2000 && number <= 9000) return 'Expect some haze'
    return 'Very Clear Day'
}

export const getSunTime = (timestamp: number): string=>{
    const date = new Date(timestamp * 1000)
    let hours = date.getHours().toString()
    let minutes = date.getMinutes().toString()

    if(hours.length <= 1) hours = `0${hours}`
    if(minutes.length <= 1) minutes = `0${minutes}`

    return `${hours}:${minutes}`
}

export const getPop = (value: number): string =>{
    if(value <= 0.33) return "Low Probability"
    if(value > 0.33 && value <= 0.65) return "Moderate Probability"

    return "High Probability"
}
