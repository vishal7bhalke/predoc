import React, { useContext, useEffect, useState } from "react";
import { Doctorcontext } from "../../context/Doctorcontext";
import { Appcontext } from "../../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";
const Doctorprofile = () => {
  const { dtoken,backendurl, profiledata, setProfiledata, getprofiledata } = useContext(Doctorcontext);
  const { currency } = useContext(Appcontext);
  const [isedit, setIsedit] = useState(false);

  const updateprofile = async () => {
    try{
      const updatedata= {
        address: profiledata.address,
        fees: profiledata.fees,
        available: profiledata.available,
      }
      const {data} = await axios.post(backendurl+ '/api/doctor/update-profile',updatedata,{headers : {dtoken}})
      if(data.success){
        toast.success(data.message)
        setIsedit(false)
        getprofiledata()
      }else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dtoken) {
      getprofiledata();
    }
  }, [dtoken]);

  return (
    profiledata && (
      <div className="w-full h-screen bg-gray-100 p-8 flex justify-start items-start">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
          {/* Profile Image */}
          <div className="flex items-center">
            <img
              src={profiledata.image}
              alt="Doctor Profile"
              className="w-32 h-32 rounded-full object-cover mr-6"
            />
            <div>
              <p className="text-2xl font-bold">{profiledata.name}</p>
              <p className="text-sm text-gray-600 mt-1">
                {profiledata.degree} - {profiledata.speciality}
              </p>
              <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">
                {profiledata.experience}
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <p className="text-lg font-semibold">About:</p>
            <p className="mt-2 text-sm text-gray-600">
              {
                profiledata.about
              }
            </p>
          </div>

          {/* Appointment Fee */}
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Appointment Fee:{" "}
              <span className="text-blue-500">
                {currency}{" "}
                {isedit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfiledata((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profiledata.fees}
                    className="border rounded p-1"
                  />
                ) : (
                  profiledata.fees
                )}
              </span>
            </p>
          </div>

          {/* Address */}
          <div className="mt-4">
            <p className="text-lg font-semibold">Address:</p>
            <p className="mt-2 text-sm text-gray-600">
              {isedit ? (
                <>
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfiledata((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profiledata.address.line1}
                    className="w-full border rounded p-2 mb-2"
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfiledata((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profiledata.address.line2}
                    className="w-full border rounded p-2"
                  />
                </>
              ) : (
                <>
                  {profiledata.address.line1}
                  <br />
                  {profiledata.address.line2}
                </>
              )}
            </p>
          </div>

          {/* Availability */}
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              onChange={() =>
                isedit &&
                setProfiledata((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={profiledata.available}
              id="availability"
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="availability" className="text-sm">
              Available
            </label>
          </div>

          {/* Edit/Save Button */}
          <div className="mt-6">
            {isedit ? (
              <button
                onClick={updateprofile}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsedit(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Doctorprofile;
