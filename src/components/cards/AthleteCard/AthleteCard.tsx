
import { athletes } from '../../../mock-data/athletes';
export default function AthleteCard() {
    return (
        <div>
            {athletes.map(athlete => (
                <li key={athlete.id} >
                    <img
                        src={athlete.avatar}
                        width={30}
                        height={30}
                        className='rounded-full'
                    />
                    <p>
                        {athlete.name}
                    </p>

                </li>
            ))}

        </div >

    )

}