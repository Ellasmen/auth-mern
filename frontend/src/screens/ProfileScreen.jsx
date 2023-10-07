import { useState ,useEffect} from 'react';
import { Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector,useDispatch} from 'react-redux';
import LoadingSpinner from '../components/spinner';
import {setCredentials} from '../slices/authSlices'
import {toast} from 'react-toastify';
import { useUpdateMutation } from '../slices/userApiSlices.js';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const dispatch=useDispatch();
  const {userInfo}=useSelector((state)=>state.auth);
  const [UpdateProfile,{isloadiing}]=useUpdateMutation();
  useEffect(()=>{
    setName(userInfo.name);
    setEmail(userInfo.email);
  },[userInfo.name,userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error('Password do not match');
    } else {
      try {
        const res=await UpdateProfile({
            _id:userInfo._id,
            name,
            email,
            password,
          }).unwrap();
        dispatch(setCredentials({...res}));
        toast.success('Profile Updated');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        console.log(err);
      }
    }
  }
  return (
    <FormContainer>
      <h1>Profile Update</h1>

      <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmpassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isloadiing &&<LoadingSpinner/>}
        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;