import AlertCard from '../components/AlertCard';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Heatwave Warning',
      description: 'Temperatures expected to reach 42°C in Delhi-NCR region',
      severity: 'High',
      time: '2 hours ago',
      active: true
    },
    {
      id: 2,
      title: 'Flash Flood Alert',
      description: 'Central US hit by torrential rain and potential flash floods',
      severity: 'Moderate',
      time: '33 minutes ago',
      active: true
    },
    {
      id: 3,
      title: 'Rain Relief Expected',
      description: 'Heatwave to be followed by rain later this week',
      severity: 'Low',
      time: '1 hour ago',
      active: true
    }
  ]);

  const dismissAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: false } : alert
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Weather Alerts</h1>
      
      <div className="space-y-4">
        {alerts.filter(alert => alert.active).map(alert => (
          <AlertCard 
            key={alert.id}
            alert={alert}
            onDismiss={() => dismissAlert(alert.id)}
          />
        ))}
      </div>

      {alerts.filter(alert => !alert.active).length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Dismissed Alerts</h2>
          <div className="space-y-4 opacity-70">
            {alerts.filter(alert => !alert.active).map(alert => (
              <AlertCard 
                key={alert.id}
                alert={alert}
                onDismiss={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;