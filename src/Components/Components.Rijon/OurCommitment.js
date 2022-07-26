import React from 'react';
import { useParams } from 'react-router-dom';
import { CommitmentData } from '../../Components/Components.Rijon/Data'

const OurCommitment = () => {
  const { id } = useParams();
  const data = CommitmentData.filter(name => name._id === id)
  const singleData = (data[0]);    
  return (
    <div>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={singleData.icon} className="max-w-sm rounded-lg" alt='img' />
          <div>
            <h1 className="text-5xl font-bold">{singleData.title}</h1>
            <p className="py-6">{singleData.description}</p>
          </div>
        </div>
      </div>

      <p></p>
      <p>{id}</p>

    </div>
  );
};

export default OurCommitment;