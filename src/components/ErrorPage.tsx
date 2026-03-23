import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {setError} from "../features/pokemon/pokemonSlice.ts";

const ErrorPage = ({message = 'No routes matched location'}) => {
    const {error} = useAppSelector(state => state.pokemon);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [seconds, setSeconds] = useState(4);
    useEffect(() => {
        if (seconds === 0) {
            navigate('/')
            dispatch(setError(null))
            return
        }
        const timer = setTimeout(() => {
            setSeconds(prev => prev - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [seconds, navigate, dispatch])

    return (
        <div className={'text-center text-3xl'}>
            <p className={'mb-10'}>{error || message}</p>
            {error && <img className={'w-1/3 object-contain mx-auto'} src='../../public/pokemonVopros.png'
                                   alt='Unknown Pokemon'/>}
            <p className={'text-amber-900 bg-teal-200 opacity-70 rounded-lg w-fit p-2 mx-auto'}>{`Back to home page ${seconds}`}</p>
        </div>
    )
}

export default ErrorPage;