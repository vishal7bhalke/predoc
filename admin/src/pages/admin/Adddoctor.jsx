
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Admincontext } from '../../context/Admincontext';

const Adddoctor = () => {


    const [docImg, setDocImg] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')

    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendurl, atoken } = useContext(Admincontext)

    const onsubmit = async (event) => {
        event.preventDefault();
        try {
            if (!docImg) {
                return toast.error('image is missing')
            }


            const formData = new FormData();
            formData.append('image', docImg);  
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({
                line1: address1,
                line2: address2
            }));


            const { data } = await axios.post(backendurl + '/api/admin/add-doctor', formData, {  headers: { atoken } })
          
            if(data.success){
                console.log("sucess ")
                toast.success(data.message);
                setDocImg(false);
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('');
                setAddress2('')
                setAbout('')
                setDegree('');
                setFees('');
                
            }
            else{
                toast.error(data.message)
                console.log(error);
            }
        }
        catch (err) {

        }
    }


    return (
        <form onSubmit={onsubmit} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
            <p className="text-2xl font-bold text-center">Add Doctor</p>
            <div className="space-y-6">
                {/* Upload Doctor Image */}
                <div className="flex flex-col items-center">
                    <label htmlFor="doc-img" className="cursor-pointer">
                        <img
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_icon}
                            alt="Upload Icon"
                            className="w-20 h-20 object-cover border rounded-md hover:opacity-75"
                        />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p className="text-sm text-gray-500">Upload Doctor Image</p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium">Doctor Name</p>
                            <input
                                onChange={(e) => setName(e.target.value)} value={name}
                                type="text"
                                placeholder="Name"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Doctor Email</p>
                            <input
                                onChange={(e) => setEmail(e.target.value)} value={email}
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Doctor Password</p>
                            <input
                                onChange={(e) => setPassword(e.target.value)} value={password}
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Experience</p>
                            <select
                                onChange={(e) => setExperience(e.target.value)} value={experience}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Experience</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <option key={num} value={`${num} year`}>{`${num} Year`}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Fees</p>
                            <input
                                onChange={(e) => setFees(e.target.value)} value={fees}
                                type="number"
                                placeholder="Fees"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium">Speciality</p>
                            <select
                                onChange={(e) => setSpeciality(e.target.value)} value={speciality}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Speciality</option>
                                <option value="General physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Education</p>
                            <input
                                onChange={(e) => setDegree(e.target.value)} value={degree}
                                type="text"
                                placeholder="Education"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Address</p>
                            <input
                                onChange={(e) => setAddress1(e.target.value)} value={address1}
                                type="text"
                                placeholder="Address 1"
                                required
                                className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                onChange={(e) => setAddress2(e.target.value)} value={address2}
                                type="text"
                                placeholder="Address 2"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div>
                    <p className="text-sm font-medium">About</p>
                    <textarea
                        onChange={(e) => setAbout(e.target.value)} value={about}
                        placeholder="Write about the doctor"
                        rows={5}
                        required
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Add Doctor
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Adddoctor;