import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { QRCodeCanvas } from 'qrcode.react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

const App = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    axios.get('./data.js')
      .then(response => {
        setCertificates(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Certifications</h1>
      {certificates.map((cert, index) => (
        <div className="certification" key={index}>
          <table style={{ border: '0px solid #ddd', width: '100%' }}>
            <tbody>
              <tr>
                <td colSpan="4">
                  <h2>{cert.name}</h2>
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top', margin: '0px', padding: '0px', border: '0px solid #ddd', width: '65px' }}>
                  <img src={`/images/${cert.issuing_organization_logo}`} alt={cert.name} title={cert.name} className="logo" width="60px" height="60px" />
                  <img src={`/images/${cert.svg_logo}`} alt={cert.name} title={cert.name} width="60px" />
                </td>
                <td>
                  <p><strong>Issuing Organization:</strong> {cert.issuing_organization}</p>
                  <p><strong>Issue Date:</strong> {cert.month_of_issue_date} {cert.year_of_issue_date}&nbsp;{cert.expiration_date}</p>
                  <p><strong>Credential ID:</strong> {cert.credential_id}</p>
                  {cert.grade_level && <p><strong>Grade / Level:</strong> {cert.grade_level}</p>}
                </td>
                <td style={{ verticalAlign: 'top', margin: '0px', padding: '0px', border: '0px solid #ddd', width: '100px' }}>
                  {cert.media_thumbnail_path && (
                    <span>
                      <a href={cert.credential_url}>
                        <img src={`/images/${cert.media_thumbnail_path}`} alt={cert.name} title={cert.name} className="qrcode" width="100px" />
                      </a>
                    </span>
                  )}
                </td>
                <td style={{ verticalAlign: 'top', margin: '0px', padding: '0px', border: '0px solid #ddd', width: '80px' }}>
                  <span>
                    <a href={cert.credential_url}>
                      <img src={`/images/${cert.credential_id}.png`} alt={cert.name} title={cert.name} width="60px" />
                      {/* <QRCodeCanvas value={cert.credential_url} size={74} /> */}
                    </a>
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <p className="credential-url">
                    <strong>Credential URL:</strong> <a href={cert.credential_url}><span style={{ fontSize: '10px' }}>{cert.credential_url}</span></a>
                  </p>
                </td>
              </tr>
              {cert.sskills && (
                <tr>
                  <td colSpan="4">
                    <p className="credential-url">
                      <strong>Skills:</strong> <span style={{ fontSize: '1em' }}>{cert.sskills}</span>
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default App;
