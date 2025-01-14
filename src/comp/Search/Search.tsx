import { ChangeEvent } from "react";
import bg from "/bg2.png";
import { optionType } from "../../types";

type Props = {
    term: string
    options: (optionType[])
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void
    onSubmit: () => void
}

export const Search = ({ term, options, onInputChange, onOptionSelect, onSubmit}: Props): JSX.Element => {

  return (
    <main className="w-full sm:w-full h-screen bg-stone-800 flex items-center justify-center text-black absolute">
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
                                    { option.name }, {option.country}
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
