import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '', bio: '', instruments: [] });
  
    const availableInstruments = ['vocals', 'guitar', 'drums', 'bass', 'keyboard', 'saxophone', 'percussion'];

    // This array will be updated as checkboxes are manipulated and all elements will be pushed to formState on submit
    var instrumentsArr = [];

    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;

      // if instruments is updated, it needs to be concatenated to instruments array
        setFormState({
            ...formState,
            [name]: value,
          });

  
      console.log(formState);
    };

    const handleInstrumentChange = (event) => {
        const { name, value } = event.target;
        console.log("name:   " + name + "   value: " + value);
        var removed = false;

        const updatedArr = formState.instruments.filter(x => {
            if (x === value) {
                removed = true;
            }
            return x !== value;
        }); 

        if (removed) {
            setFormState({
                ...formState,
                [name]: updatedArr,
            }); 
        } else {
            setFormState({
                ...formState,
                [name]: formState.instruments.concat(value),
            }); 
        }
    };
  
    useEffect(() => {
        console.log(formState.instruments);
    }, [formState]);

    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();

    };
  
    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" name="username" placeholder="Create Username" value={formState.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={formState.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={formState.password} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" type="bio" name="bio" placeholder="Bio" value={formState.bio} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicInstruments">
                <Form.Label>Instruments (Select all that apply)</Form.Label>
                {availableInstruments &&
                    availableInstruments.map((instrument => (
                        <Form.Check
                            key={instrument}
                            type="checkbox"
                            label={instrument}
                            id={instrument}
                            name="instruments"
                            value={instrument}
                            onChange={handleInstrumentChange}
                        />
                )))}
            </Form.Group>



            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
  };



export default Signup;

