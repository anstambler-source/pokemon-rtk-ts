import {useAppDispatch} from "../hooks/hooks.ts";
import {setError} from "../features/pokemon/pokemonSlice.ts";
import {toCapitalize} from "../utils/toCapitalize.ts";
import {useGetPokemonByNameQuery} from "../features/api/pokemonApi.ts";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {pages} from "../utils/constants.ts";

function IChooseYou() {
    const dispatch = useAppDispatch()
    const {pokemonId = ''} = useParams()
    const navigate = useNavigate()
    const {data, isLoading, error} = useGetPokemonByNameQuery(pokemonId)

    useEffect(() => {
        if (!isLoading && error) {
            dispatch(setError('Pokemon not found'))
            navigate('/*')
            return;
        }
        if (data) {
            dispatch(setError(null))
            return;
        }
    }, [data, dispatch, error, isLoading, navigate])

    if (isLoading)
        return <p className={'text-center text-3xl'}>Loading...</p>

    if (data)
        return (
            <div className={'m-10 flex justify-center gap-20 items-center font-serif text-lg'}>
                <div className={'flex flex-col space-y-3 bg-orange-100/50 p-6 rounded-xl shadow-md text-2xl'}>
                    <p>Type: {toCapitalize(data.type)}</p>
                    <p>Height: {data.height}</p>
                    <p>Weight: {data.weight}</p>
                </div>
                <div className={'flex flex-col items-center'}>
                    <p className={'py-2 px-4 opacity-80 text-5xl bg-yellow-300 rounded-md w-fit text-center text-pink-600'}>{toCapitalize(data.name)}</p>
                    <img className={'w-full my-8'} src={data.imgLarge || data.imgSmall} alt={data.name}/>
                    <button
                        className={'opacity-80 size-fit border-b-amber-800 rounded-xl bg-cyan-300 p-2 hover:bg-cyan-400 text-gray-900'}
                        onClick={() => navigate(`/${pages[1]}/${data.name}`)}>Evolution
                    </button>
                </div>
            </div>
        )
}

export default IChooseYou;