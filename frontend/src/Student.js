import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {

    const [Student, setStudent] = useState([])

    const handledelete = async (id) => {
        console.log("Deleting ID:", id);  // ✅ Log the ID to the console
    
        try {
            
            console.log("Deleting res:", id); 
            await axios.delete('http://localhost:8081/delete/' + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
            console.log("Deleting err:", id); 
        }
    };
    

    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    },[]);

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
      <div className='w-80 bg-white rounded p-4 shadow'>
        <Link to='/create' className='btn btn-success ms-3'>Add+</Link>
        <table className='table'>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    Student.map((data, i)=>(    
                        <tr key={i}>
                            <td>{data.Name}</td>
                            <td>{data.Email}</td>
                            <td className='d-flex'>
                                <Link to={`/update/${data.Id}`} className='btn btn-primary'>Update</Link>
                                <button className='btn btn-danger ms-2' onClick={e => handledelete(data.Id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Student
