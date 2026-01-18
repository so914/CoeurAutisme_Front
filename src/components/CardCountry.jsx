import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardCountry = ({ country }) => {
    const navigate=useNavigate();
  return (
    <div>

            <div className='card border-0 rounded-4 shadow-sm mb-3 p-2 card-country'
            onClick={()=>navigate(`/infrastructures/pays/${country.nom}`) }>
        <div className="d-flex align-items-center mt-2">
            <div className="row gap-2">
                <div className="col-md-2 mt-2">
                    <img 
              src={country.drapeau} 
              alt={`Drapeau ${country.nom}`} 
              className="rounded-5 me-3"
              style={{ width: '36px', height: '36px', objectFit: 'cover' }}
            />
                </div>
                <div className="col-md-8 mt-3">
                    <div className="flex-grow-1 me-">
                        <h6 className="mb-0 text-dark">{country.nom}</h6>
                <small className="text-muted">
                    {country.nombreInfrasAutisme} institutions
                </small>
            </div>
                </div>
            </div>
            
            
        </div>
    </div>
    </div>
  );
};


export default CardCountry;