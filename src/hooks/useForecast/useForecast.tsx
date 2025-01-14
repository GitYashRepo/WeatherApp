import { useState , useEffect, ChangeEvent} from "react";
import { optionType } from "../../types";


export const useForecast = ()=> {
    const [term, setTerm] = useState<string>('');
    const [city,setCity]= useState<optionType | null>(null);
    const [options, setOptions] = useState<optionType[]>([]);
    const [forecast, setForecast] = useState<null>(null)

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
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`)
        .then((res)=>{
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        }).then((data)=>{
            const forecastData = {
                ...data.city,
                list: data.list.slice(0, 16)
            }
            setForecast(forecastData);
        }).catch( e=> console.log(e))
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


    return {
        term,
        options,
        forecast,
        onInputChange,
        onOptionSelect,
        onSubmit
    }
}
