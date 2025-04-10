import TeamCard from '../components/TeamCard';
import Header from '../components/Header';
import heroImage from '../assets/images/about-hero.jpg';

const About = () => {
  const teamMembers = [
    // ... existing team members data
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Header 
        title="About WeatherAI" 
        subtitle="Learn about our technology and team" 
        backgroundImage={heroImage}
      />
      
      {/* Rest of the About page content */}
      {/* ... */}
    </div>
  );
};

export default About;