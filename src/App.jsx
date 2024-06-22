import { useState } from 'react';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
/* DATE TIME PICKER*/
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
// import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',  // Initialize position with an empty string
    experience: '',
    portfolio: '',
    management_experience: '',
    skills: {},
    preferredDateTime: dayjs()
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  // const [error, setError] = useState({});
  
  const MaxDate=dayjs().add(7,'day');
   


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        skills: { ...formData.skills, [name]: checked }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: undefined });
  };

  const handleDateTimeChange = (date) => {
    setFormData({ ...formData, preferredDateTime: date });
    
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    else if (!/^[1-9][0-9]{9}$/.test(formData.phone)) newErrors.phone = "Enter Valid Phone Number";
    if(formData.position==="") newErrors.position="Select Position";
    console.log(formData.position)
    if (formData.position === 'developer' || formData.position === 'designer') {
      if (!formData.experience) newErrors.experience = "Experience Is Required";
      else if(formData.experience<=0) newErrors.experience="Experience Should Be Greater Than 0"
    }

    if (formData.position === 'designer') {
      let URL_regex=/^(https?:\/\/)?(www\.)?((github|gitlab|behance)\.com\/[A-Za-z0-9_-]+|[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z]{2,})\/?$|^(https?:\/\/)?(www\.)?([A-Za-z0-9_-]+\.[A-Za-z]{2,})\/?$/
      if(!formData.portfolio) newErrors.portfolio = "Portfolio URL is required";
      else if(!URL_regex.test(formData.portfolio)) newErrors.portfolio="Enter Valid URL"
    }
    if (formData.position === 'manager') {
      if(!formData.management_experience) newErrors.management_experience = "Experience is required";
      else if(formData.management_experience<0) newErrors.management_experience="Enter Valid Experience"
    }
    const selectedSkills = Object.values(formData.skills);
    if (selectedSkills.every(skill => !skill)) {
      newErrors.skills = "Select at least one skill";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0 ) {
      setIsSubmit(true);
    } else {
      setErrors(newErrors);
    }
    console.log(formData);
  };


  return (
    
    <div>
      {!isSubmit ? (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Job Application Form</h1>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <div>
              <label>Phone Number:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
            </div>
            <div>
              <label>Position:</label>
              <select name="position" value={formData.position} onChange={handleChange}>
                <option value="" disabled selected >Select</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
              </select>
              {errors.position && <p style={{ color: 'red' }}>{errors.position}</p>}
            </div>
            {(formData.position === 'developer' || formData.position === 'designer') && (
              <div>
                <label>Relevant Experience:</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
                {errors.experience && <p style={{ color: 'red' }}>{errors.experience}</p>}
              </div>
            )}
            {formData.position === 'designer' && (
              <div>
                <label>Portfolio URL:</label>
                <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} />
                {errors.portfolio && <p style={{ color: 'red' }}>{errors.portfolio}</p>}
              </div>
            )}
            {formData.position === 'manager' && (
              <div>
                <label>Management Experience:</label>
                <input type="number" name="management_experience" value={formData.management_experience} onChange={handleChange} />
                {errors.management_experience && <p style={{ color: 'red' }}>{errors.management_experience}</p>}
              </div>
            )}
            <div>
              <label>Additional Skills:</label><br />
              <div className='grid-3'>
              <div className='grid-checkbox'><input className="checkbox" type="checkbox" name="html" checked={!!formData.skills.html} onChange={handleChange} /> HTML</div>
              <div className='grid-checkbox'><input  className="checkbox" type="checkbox" name="css" checked={!!formData.skills.css} onChange={handleChange} /> CSS</div>
              <div className='grid-checkbox'><input className="checkbox" type="checkbox" name="js" checked={!!formData.skills.js} onChange={handleChange} /> JavaScript</div>
             <div className='grid-checkbox'><input  className="checkbox"type="checkbox" name="ui" checked={!!formData.skills.ui} onChange={handleChange} /> UI/UX</div> 
              <div className='grid-checkbox'><input  className="checkbox" type="checkbox" name="angular" checked={!!formData.skills.angular} onChange={handleChange} /> AngularJS</div>
              <div className='grid-checkbox'><input className="checkbox" type="checkbox" name="sql" checked={!!formData.skills.sql} onChange={handleChange} /> SQL</div>
              <div className='grid-checkbox'><input  className="checkbox" type="checkbox" name="python" checked={!!formData.skills.python} onChange={handleChange} /> Python</div>
            </div>
            {errors.skills && <p style={{ color: 'red' }}>{errors.skills}</p>}
            </div>
            <div className='DateTime-Container'>
            <div className='DateTime-subContainer'>
              <label>Preferred Date And Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateTimePicker',
          'MobileDateTimePicker',
          'DesktopDateTimePicker',
          'StaticDateTimePicker',
        ]}
      >
       <DemoItem>
          <DateTimePicker 
          onChange={handleDateTimeChange} 
          defaultValue={dayjs()} 
          format="L hh:mm A" 
          disablePast 
          maxDate={MaxDate}
           />
          
        </DemoItem>
        </DemoContainer>
        </LocalizationProvider>
            </div>
            </div>
            <button className="submit btn" type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="summary">
          <h2>Registration Summary</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone Number:</strong> {formData.phone}</p>
          <p><strong>Position:</strong> {formData.position}</p>
          {(formData.position === 'developer' || formData.position === 'designer') && (
            <p><strong>Relevant Experience:</strong> {formData.experience}</p>
          )}
          {formData.position === 'designer' && (
            <p><strong>Portfolio URL:</strong> {formData.portfolio}</p>
          )}
          {formData.position === 'manager' && (
            <p><strong>Management Experience:</strong> {formData.management_experience}</p>
          )}
          <p><strong>Additional Skills:</strong> {Object.keys(formData.skills).filter(skill => formData.skills[skill]).join(', ')}</p>
          <p><strong>Preferred Date And Time:</strong> {formData.preferredDateTime.toLocaleString()}</p>
          <button className="btn" onClick={() => setIsSubmit(false)}>Edit</button>
          <button className="btn" onClick={() => {
            toast.success("Submitted Successfully");
            setIsSubmit(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              position: '',
              experience: '',
              portfolio: '',
              management_experience: '',
              skills: {},
              preferredDateTime: dayjs()
            });
          }}> Save</button>
        </div>
      )}
    </div>
  );
}

export default App;
