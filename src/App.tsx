import { Forecast } from "./comp/Forecast/Forecast";
import { Search } from "./comp/Search/Search";
import bg from "/bg2.png"
import { useForecast } from "./hooks/useForecast/useForecast";


export const App = (): JSX.Element => {
    const {
        term,
        options,
        forecast,
        onInputChange,
        onOptionSelect,
        onSubmit
    } = useForecast();

  return (
    <main className="w-full sm:w-full h-screen bg-stone-800 flex items-center justify-center text-black relative">
        <div className="w-full h-screen overflow-hidden">
            <img className="w-full h-screen" src={bg} alt="" />
        </div>
        {forecast ? (
            <Forecast data={forecast} />
        ):(
            <Search
                term={term}
                options={options}
                onInputChange={onInputChange}
                onOptionSelect={onOptionSelect}
                onSubmit={onSubmit}
            />
        )}
    </main>
  )
}
