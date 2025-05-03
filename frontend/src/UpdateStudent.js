import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateStudent = () => {

const [Name,setName] = useState('')
const [Email,setEmail] = useState('')
const {id} = useParams();
const navigate = useNavigate();

function handlesubmit(event){
    event.preventDefault();
    axios.put('http://localhost:8081/update/'+id, {Name, Email})
    .then(res => {
        console.log(res);
        navigate('/');
    })
    .catch(err => {
        console.error(err);  
    });
}

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body">
              <h3 className="card-title text-center text-primary mb-4">Update Student</h3>
              <form onSubmit={handlesubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Full Name"
                    required
                    onChange={e => setName(e.target.value)}
                  />
                  <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email Address"
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg rounded-pill">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;