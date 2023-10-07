import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/userApiSlices';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../components/spinner';
import { setCredentials } from '../slices/authSlices'
import { toast } from 'react-toastify';
const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error('Password do not match');
    } else {
      try {
        const res = await Register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }
  return (
    <Container fluid className='p-4 background-radial-gradient overflow-hidden'>
      <Row>
        <Col md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 15%)' }}>
            MERN Auth <br />
            <span style={{ color: 'hsl(218, 81%, 65%)' }}>For Register & Sign-Up</span>
          </h1>
          <p2 className='px-3' style={{ color: 'hsl(218, 51%, 75%)' }}>
          Experience state-of-the-art security with JWT stored in HTTP-Only cookies. Utilize Redux Toolkit for seamless state management and integrate responsive UI components effortlessly with React Bootstrap. Our scalable and well-documented codebase ensures a smooth development journey. Elevate your projects with secure, efficient, and intuitive authentication solutions.
          </p2>
        </Col>
        <Col md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
          <Card className='my-5 bg-glass'>
          <div className="login-screen" style={{ background: 'rgba(190, 190, 155, 0.1)' }}>
            <Card.Body className='p-5'>
              <Form onSubmit={submitHandler}>
                <Form.Group className='mb-4'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type='submit' className='w-100 mb-4' size='md' variant='primary'>Sign up</Button>
              </Form>
              <Row className='py-3 justify-content-center'>
                <Col md='6' className='text-center'>
                  Already have an account? <Link to={`/login`}>Sign In</Link>
                </Col>
              </Row>
            </Card.Body>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;