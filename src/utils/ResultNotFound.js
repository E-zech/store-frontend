import { useContext } from 'react';
import { GeneralContext } from '../App';
import '../css/ResultNotFound.css';

export default function ResultResultNotFound() {
    const { mode } = useContext(GeneralContext);
    return (
        <section className="noResultsWrapper">
            <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }}
            >No results found</h2>

            <img className="noResultsImg" src="https://i.pinimg.com/564x/86/a8/32/86a83202204557ed776d463593aecb96.jpg" alt="no resualt found" />
        </section>
    )
}



