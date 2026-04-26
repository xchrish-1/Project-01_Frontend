import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-8 border-t border-orange-100 bg-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-orange-600 font-bold tracking-tight">
          Project-01.com
        </span>
        <span className="flex gap-4 font-bold tracking-tight text-slate-600">
          <Link
            to="/privacy-policy"
            className="transition-colors duration-200 hover:text-orange-600"
          >
            Privacy Policy
          </Link>
          <Link
            to="/privacy-policy#terms"
            className="transition-colors duration-200 hover:text-orange-600"
          >
            Terms of Service
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
