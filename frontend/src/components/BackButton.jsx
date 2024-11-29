import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export default function BackButton({ path }) {
  return (
    <div>
      <Link to={path}>
        <FaArrowLeft />
      </Link>
    </div>
  );
}
