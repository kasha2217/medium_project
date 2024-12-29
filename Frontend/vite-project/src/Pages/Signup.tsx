import { Auth } from "../Components/Auth";
import Quote from "../Components/Quote";

export const Signup = () => {
  return (
    <div className="grid md:grid-cols-2">
      <div>
        <Auth type="signup"/>
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};
