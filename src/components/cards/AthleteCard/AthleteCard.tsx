import { athletes } from '../../../mock-data/athletes';

export default function AthleteCard() {
    return (
        <div className="flex flex-col w-full gap-4">
            {athletes.map((athlete) => (
                <div
                    key={athlete.id}
                    style={{
                        boxShadow: '0px 1px 4px 4px rgba(0, 0, 0, 0.2)',
                        borderRadius: '12px',
                    }}
                    className="flex items-center justify-between  bg-notwhite-400 px-4 py-2 "
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={athlete.avatar}
                            alt={athlete.name}
                            className="w-[55px] h-[55px] rounded-full object-cover"
                        />
                        <div className="text-primary-400 font-bold leading-tight">
                            <p className="text-lg">{athlete.name.split(' ')[0]}</p>
                            <p className="text-lg">{athlete.name.split(' ')[1]}</p>
                        </div>
                    </div>

                    {/* Icono Bootstrap con clases Tailwind */}
                    <i className="bi bi-gear text-primary-400 text-2xl"></i>
                </div>
            ))}
        </div>
    );
}
