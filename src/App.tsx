import { ChangeEvent, useEffect, useState } from "react";
import bg from "/bg2.png";
import {optionType} from "./types/index";



const App = (): JSX.Element => {
    const [term, setTerm] = useState<string>('');
    const [city,setCity]= useState<optionType | null>(null);
    const [options, setOptions] = useState<optionType[]>([]);

    const apiKey: string = import.meta.env.VITE_WEATHER_KEY;

    const getSearchOptions = (value:string)=>{
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            if (data && data.length > 0) {
                setOptions(data);
            } else {
                console.warn('No cities found for the given input.');
                setOptions([]); // Clear options if no results found
            }
        })
        .catch((error) => {
            console.error('Error fetching city data:', error);
            setOptions([]); // Reset options on error
        });
    }

    const onInputChange = (e:
        ChangeEvent<HTMLInputElement>
    )=>{
        const value = e.target.value.trim();
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setTerm(capitalizedValue);
        console.log(value)
        if(value === '') return
        getSearchOptions(value);
    }

    const getForecast = (city: optionType)=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`)
        .then((res)=>{
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        }).then((data)=>{
            console.log({data})
        })
    }

    const onSubmit = ()=>{
        if (!city && options.length > 0) {
            getForecast(options[0]);
            setCity(options[0]); // Optionally, set the first option as the selected city
        } else if (city) {
            getForecast(city);
        } else {
            console.error('No city or options available to fetch the forecast.');
        }
    }

    const onOptionSelect = (option: optionType)=>{
        setCity(option)
    }

    useEffect(()=>{
        if(city){
            setTerm(city.name);
            setOptions([]);
        }
    }, [city]);

  return (
    <main className="w-full sm:w-full h-screen bg-stone-800 flex items-center justify-center text-black relative">
        <div className="w-full h-screen overflow-hidden">
            <img className="w-full h-screen" src={bg} alt="" />
        </div>
        <section className="lg:w-[25%] !sm:w-[80vw] h-[80vh] absolute shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md border border-white/20 rounded-3xl p-4 flex flex-col items-center justify-center text-center">
            <h1 className="font-bold text-2xl">Weather Forcast</h1>
            <p>Enter below the place you want to know the weather of and select an option from dropdown</p>
            <div className="relative flex flex-row mt-4">
                <input
                    type="text"
                    value={term}
                    className="px-2 py-1 rounded-l-md border-2 border-white"
                    onChange={onInputChange}
                />
                <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
                    {options.map((option: optionType, index: number) => (
                        <li key={option.name+'-'+index}>
                            <button
                                className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                                onClick={()=> onOptionSelect(option)}>
                                    { option.name }
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
                    onClick={onSubmit}>
                        Search
                </button>
            </div>
        </section>
    </main>
  )
}

export default App;
