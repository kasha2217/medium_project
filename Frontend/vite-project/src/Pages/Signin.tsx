import { Auth } from "../Components/Auth";
import Quote from "../Components/Quote";

export const Signin = () => {
  return (
    <div className="grid md:grid-cols-2">
      <div>
        <Auth type="signin"/>
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};
