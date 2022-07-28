import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const UpdateInfo = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;
    return (
        <div className="w-full h-1/3 lg:h-full lg:mt-8">
      <div className="card w-96 bg-base-100 shadow-2xl mx-auto">
        <div className="card-body">
          <h1 className="text-green-400 text-2xl font-bold">Update Profile</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              value={email}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Country</span>
            </label>
            <input
              type="text"
              placeholder="Country"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Current City</span>
            </label>
            <input
              type="text"
              placeholder="City"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your phone</span>
            </label>
            <input
              type="number"
              placeholder="Number"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <input type="submit" className="btn bg-green-700" value="Update Profile"/>
          </div>
        </div>
      </div>
    </div>
    );
};

export default UpdateInfo;