import { Container, Card, Button } from 'react-bootstrap';
const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>MERN Authentication</h1>
          <p className='text-center mb-4'>
            Experience state-of-the-art security with JWT stored in HTTP-Only cookies. 
            Utilize Redux Toolkit for seamless state management and integrate responsive UI components effortlessly with React Bootstrap. 
            Our scalable and well-documented codebase ensures a smooth development journey.
            Elevate your projects with secure, efficient, and intuitive authentication solutions.
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;