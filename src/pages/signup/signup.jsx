import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitData = () => {
    if (email !== '' && password !== '') {
      const obj = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
      };

      fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert('Account created successfully! You can now proceed to login.');
          navigate('/');
        })
        .catch((err) => console.log(err));
    } else {
      alert('Fill in all the fields');
    }
  };

  return (
    <section
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#eee', overflow: 'hidden' }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <p className="text-center h1 fw-bold mb-5">Sign up</p>
                <form>
                  <div className="mb-4">
                    <i className="fas fa-user fa-lg me-3"></i>
                    <input
                      type="text"
                      id="form3Example1c"
                      className="form-control"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <i className="fas fa-envelope fa-lg me-3"></i>
                    <input
                      type="email"
                      id="form3Example3c"
                      className="form-control"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <i className="fas fa-lock fa-lg me-3"></i>
                    <input
                      type="password"
                      id="form3Example4c"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <i className="fas fa-key fa-lg me-3"></i>
                    <input
                      type="password"
                      id="form3Example4cd"
                      className="form-control"
                      placeholder="Repeat Password"
                    />
                  </div>
                  <div className="form-check mb-4">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3c">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary btn-lg" onClick={submitData}>
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;