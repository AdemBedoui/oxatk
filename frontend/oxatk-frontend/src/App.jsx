import { useState } from 'react';
import axios from 'axios';
import { 
  FaSearch, 
  FaGlobe, 
  FaShieldAlt, 
  FaInfoCircle, 
  FaSpinner, 
  FaClock, 
  FaCalendarAlt, 
  FaUser,
  FaEnvelope
} from 'react-icons/fa';
import './App.css';

const DomainCard = ({ title, value, icon, children }) => (
  <div className="card">
    <div className="card-header">
      {icon}
      <h3>{title}</h3>
    </div>
    <div className="card-content">
      {value ? <div className="card-value">{value}</div> : children}
    </div>
  </div>
);

const App = () => {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkDomain = async (e) => {
    e.preventDefault();
    if (!domain) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('https://dnstkapi.bedouiadem.tech/api/check-domain', { domain });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch domain information');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title"><FaGlobe />xToolkit</h1>
      
      <form onSubmit={checkDomain} className="search-box">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain (e.g., example.com)"
          autoFocus
        />
        <button type="submit" disabled={loading}>
          {loading ? <FaSpinner className="spin" /> : <FaSearch />}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {data && (
        <div className="dashboard">
          {/* Status Row */}
          <div className="row">
            {data.status === "Registered" ? (
              <>
                <DomainCard
                  title="Domain Status"
                  value={data.status}
                  icon={<FaInfoCircle />}
                />
                <DomainCard
                  title="Registration Date"
                  value={data.registration_date}
                  icon={<FaCalendarAlt />}
                />
                <DomainCard
                  title="Expiration Date"
                  value={data.expiration_date}
                  icon={<FaClock />}
                />
              </>
            ) : (
              <DomainCard
                title="Domain Status"
                value="Unregistered"
                icon={<FaInfoCircle />}
              />
            )}
          </div>

          {/* DNS Row */}
          {data.status === "Registered" && (
            <div className="row">
              <DomainCard title="A Records" icon={<FaGlobe />}>
                {data.A.map((record, i) => (
                  <div key={i} className="record-item">
                    <span className="record-type">A</span>
                    {record}
                  </div>
                ))}
              </DomainCard>

              <DomainCard title="Reverse DNS" icon={<FaGlobe />}>
                <div className="record-item">
                  <span className="record-type">PTR</span>
                  {data.reverse_dns}
                </div>
              </DomainCard>

              <DomainCard title="Nameservers" icon={<FaGlobe />}>
                {data.nameservers && data.nameservers.length > 0 ? (
                  data.nameservers.map((ns, i) => (
                    <div key={i} className="record-item">
                      <span className="record-type">NS</span>
                      {ns}
                    </div>
                  ))
                ) : (
                  <div className="record-item">None</div>
                )}
              </DomainCard>

              <DomainCard title="MX Records" icon={<FaEnvelope />}>
                {data.MX.map((record, i) => (
                  <div key={i} className="record-item">
                    <span className="record-type">MX</span>
                    {record}
                  </div>
                ))}
              </DomainCard>
            </div>
          )}

          {/* Security Row */}
          {data.status === "Registered" && (
            <div className="row">
              <DomainCard title="SPF Records" icon={<FaShieldAlt />}>
                {data.SPF.map((record, i) => (
                  <pre key={i} className="dns-record">{record}</pre>
                ))}
              </DomainCard>

              <DomainCard title="DKIM Records" icon={<FaShieldAlt />}>
                {data.DKIM.map((record, i) => (
                  <pre key={i} className="dns-record">{record}</pre>
                ))}
              </DomainCard>
            </div>
          )}

          {/* Ownership Row */}
          {data.status === "Registered" && (
            <div className="row">
              <DomainCard
                title="Owner"
                value={data.registrant_name ? data.registrant_name.toUpperCase() : ""}
                icon={<FaUser />}
              />
              <DomainCard
                title="Registrar"
                value={data.registrar_name ? data.registrar_name.toUpperCase() : ""}
                icon={<FaInfoCircle />}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
