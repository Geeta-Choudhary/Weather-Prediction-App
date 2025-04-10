import { Link } from 'react-router-dom';

const Header = ({ title, subtitle, showButton = true, backgroundImage }) => {
  return (
    <div className="relative rounded-xl overflow-hidden mb-12 h-96">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Weather background"
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
        <div className="px-12 max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl text-white mb-6">{subtitle}</p>
          )}
          {showButton && (
            <Link 
              to="/forecast" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg inline-block"
            >
              Get Forecast
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;