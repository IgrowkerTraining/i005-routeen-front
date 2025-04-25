import { Button } from "../../Button/Button";
import { useNavigate } from "react-router-dom";

export const Congratulations = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center px-4 bg-white">
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-3xl sm:text-4xl font-semibold text-notblack-400 text-center leading-relaxed">
          ¡Felicitaciones! <br />
          Ya finalizaste la rutina <br />
          de hoy
        </h2>
          <Button
            text="Volver al inicio"
            variant="primary"
            onClick={() => navigate("/home")}
            icon={<i className="bi bi-house text-2xl"></i>}
            className="w-full mt-4"
          />
      </div>
    </div>
  );
};
