import { getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from "../../helpers"
import { forecastType } from "../../types"
import Sunrise from "../Icons/Sunrise"
import Sunset from "../Icons/Sunset"
import Tile from "../Tiles/Tile"


type Props = {
    data: forecastType
}

const Degree = ({temp}: {temp: number}): JSX.Element => (
    <span>{temp}<sup>0</sup></span>
)

export const Forecast=  ({data}: Props): JSX.Element =>{
    const today = data.list[0];
    return (
        <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-40 backdrop-blur-lg rounded drop-shadow-lg absolute">
            <div className="mx-auto w-[300px]">
                <section className="text-center">
                    <h2 className="text-2xl font-black">{data.name}<span className="font-thin">{data.country}</span></h2>
                    <h1 className="text-4xl font-extrabold">
                        <Degree temp={Math.round(today.main.temp)}/>
                    </h1>
                    <p className="text-sm">
                        {today.weather[0].main} {today.weather[0].description}
                    </p>
                    <p className="text-sm">
                        H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{' '}<Degree temp={Math.floor(today.main.temp_min)} />
                    </p>
                </section>
                <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
                    {data.list.map((item, i)=>(
                        <div key={i} className="inline-block text-center w-[50px] flex-shrink-0">
                            <p className="text-sm">
                                {i ===0 ? "Now" : new Date(item.dt*1000).getHours()}
                            </p>
                            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={`weather-icon-${item.weather[0].description}`} />
                            <p>
                                <Degree temp={Math.round(item.main.temp)}/>
                            </p>
                        </div>
                    ))}
                </section>
                <section className="flex flex-wrap justify-between text-zinc-700">
                    <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
                        <Sunrise /> <span>{getSunTime(data.sunrise)}</span>
                    </div>
                    <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
                        <Sunset /> <span>{getSunTime(data.sunset)}</span>
                    </div>
                    <Tile
                        icon="wind"
                        title="Wind"
                        info={`${Math.round(today.wind.speed)} km/h`}
                        description={`${getWindDirection(Math.round(today.wind.deg))}, gusts ${today.wind.gust.toFixed(1)} km/h`}
                    />
                    <Tile
                        icon="feels"
                        title="Feels Like"
                        info={<Degree temp={Math.round(today.main.feels_like)}/>}
                        description={`Feels ${
                            Math.round(today.main.feels_like) < Math.round(today.main.temp) ? 'colder' : 'warmer'
                        }`}
                    />
                    <Tile
                        icon="humidity"
                        title="Humidity"
                        info={`${today.main.humidity} %`}
                        description={getHumidityValue(today.main.humidity)}
                    />
                    <Tile
                        icon="pop"
                        title="Precipitation"
                        info={`${Math.round(today.pop * 1000)}%`}
                        description={`${getPop(today.pop)}, clouds at ${today.clouds.all} %`}
                    />
                    <Tile
                        icon="pressure"
                        title="Pressure"
                        info={`${today.main.pressure} hPa`}
                        description={`${
                            Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
                        } than standard`}
                    />
                    <Tile
                        icon="visibility"
                        title="Visibility"
                        info={`${(today.visibility / 1000).toFixed()} km`}
                        description={getVisibilityValue(today.visibility)}
                    />

                </section>
            </div>
        </div>
    )
}
