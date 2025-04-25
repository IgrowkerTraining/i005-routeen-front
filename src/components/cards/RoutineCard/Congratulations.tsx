import { Button } from "../../Button/Button";
import { useNavigate } from "react-router-dom";

export const Congratulations = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h2 className="text-3xl sm:text-4xl font-semibold text-notblack-400 text-center leading-relaxed">
        Felicitaciones ya <br />
        finalizaste la rutina <br />
        de hoy
      </h2>
      <div className="mt-5">
        <Button
          text="Home"
          variant="primary"
          onClick={() => navigate("/home")}
          icon={<i className="bi text-2xl"></i>}
        />
      </div>
    </div>
  );
};
