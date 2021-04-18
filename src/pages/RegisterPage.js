import { Flex, Stack, FormControl, FormLabel, FormHelperText, Input, Button, Text, IconButton, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaTwitter } from "react-icons/fa"
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useHistory } from "react-router-dom";
import React, { useState, useContext } from 'react'
import localStorageService from '../services/localStorageService'
import { AuthContext } from "../contexts/AuthContextProvider";
import axios from '../config/axios'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

function RegisterPage() {
    const history = useHistory()
    const { setIsAuthenticated } = useContext(AuthContext);

    const [input, setInput] = useState({
        name: '',
        email: '',
        username: '',
        birthDate: '',
        password: '',
        confirmPassword: '',
    })
        
    const [error, setError] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setInput(prev => ({...prev, [name]: value}))
    
        if (name === 'email') {
          if (!value) {
            setError((prev) => ({...prev, email: 'email is required'}))
          } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
            setError((prev) => ({...prev, email: 'invalid email'}))
          } else {
            setError(prev => ({ ...prev, email: false }))
          }
        }
    
        if (name === 'username') {
          if (!value) {
            setError((prev) => ({...prev, username: 'username is required'}))
          } 
        }
    }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const handleSubmit = () => {
        console.log(input)
          axios
          .post('/register', { 
            name: input.name, 
            email: input.email, 
            username: input.username, 
            birthDate: input.birthDate,
            password: input.password, 
            confirmPassword: input.confirmPassword 
          })
          .then(res => {
            localStorageService.setToken(res.data.token)
            setIsAuthenticated(true);
            history.push('/');
          })
          .catch(err => {
            if (err.response) {
              setError({ server: err.response.data.message })
            } else {
              setError({ front: err.message })
            }
          })
    
      }

    return (
        <Flex direction='column' alignItems='center' w='800px' h='660px' border='solid 1px' borderColor='gray.300' m='30px auto'>
            <IconButton variant="none" as={FaTwitter} w='30px' h='30px' color="blue.400" m='20px 0 5px'/>
            <Text fontWeight='700' fontSize='25px' mb='12px'>Create your account</Text>

            <Stack spacing={3}>
                <FormControl id='name' isRequired>
                    <FormLabel >Name</FormLabel>
                    <Input placeholder='Name' type="text" name="name" value={input.name} onChange={handleInputChange} />
                </FormControl>
                
                <FormControl id='email' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email' type="email" name="email" value={input.email} onChange={handleInputChange}/>
                </FormControl>

                <FormControl id='username' isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input placeholder='Username' type="text" name="username" value={input.username} onChange={handleInputChange}/>
                </FormControl>

                <FormControl id='birthDate' isRequired>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input placeholder='Date of Birth' type="text" name="birthDate" value={input.birthDate} onChange={handleInputChange}/>
                </FormControl>

                <FormControl id='password' isRequired>
                    <FormLabel>Password</FormLabel>
                    {/* <Input placeholder='Password' type="password" value={input.username} onChange={handleInputChange}/> */}
                    <InputGroup>
                        <Input
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            value={input.password}
                            onChange={handleInputChange}
                            name="password"
                        />
                        <InputRightElement>
                            <Button variant="none" onClick={handleClick} fontSize='10px' _focus={{ borderStyle:'none' }} >
                            {show ? <IconButton variant="none" icon={<ViewOffIcon />} _focus={{ borderStyle:'none' }} /> : <IconButton variant="none" icon={<ViewIcon />} _focus={{ borderStyle:'none' }} /> }
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <FormControl id='confirmPassword' isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    {/* <Input placeholder='Confirm Password' type="password" value={input.confirmPassword} onChange={handleInputChange}/> */}
                    <InputGroup>
                        <Input
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            value={input.confirmPassword}
                            onChange={handleInputChange}
                            name="confirmPassword"
                        />
                        <InputRightElement>
                            <Button variant="none" onClick={handleClick} fontSize='10px' _focus={{ borderStyle:'none' }} >
                            {show ? <IconButton variant="none" icon={<ViewOffIcon />} _focus={{ borderStyle:'none' }} /> : <IconButton variant="none" icon={<ViewIcon />} _focus={{ borderStyle:'none' }} /> }
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            
            </Stack>

            <Button
                    colorScheme="blue"
                    onClick={handleSubmit}
                    mt='10px'
                    >
                    Sign up
            </Button>
        </Flex>
    )
}

export default RegisterPage