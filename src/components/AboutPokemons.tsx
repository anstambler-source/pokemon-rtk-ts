import {aboutPokemons} from "../utils/constants.ts";

function AboutPokemons() {
    return (
        <p className={' bg-orange-100/50 p-6 rounded-xl shadow-md m-8 text-xl font-serif text'}>{aboutPokemons}</p>
    );
}

export default AboutPokemons;