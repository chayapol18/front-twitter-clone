import { Box, Flex, Button, IconButton, Input, Icon, Link, Container, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from '../../config/axios'
import localStorageService from '../../services/localStorageService'
import { AuthContext } from "../../contexts/AuthContextProvider";

function Login() {

    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState({});
    const { setIsAuthenticated } = useContext(AuthContext);


    const history = useHistory();
  
    const validateInput = () => {
      const newError = {}
      if (!emailOrUsername) newError.emailOrUsername = 'email or username is required'
      if (!password) newError.password = 'password is required'
      setError(newError)
    }

    const handleLogin = async () => {
        try {
          validateInput();
          const res = await axios.post('/login', { emailOrUsername, password });
          localStorageService.setToken(res.data.token);
          setIsAuthenticated(true);
          history.push('/');
        } catch (err) { 
          console.dir(err)
        }
    }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Flex direction='column' mt='20px'>
            <Flex direction='row'  alignItems='center'>
                
                <Input placeholder="Username or Email" mr='20px' h='60px' w='220px' value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)}></Input>

                
                {/* <Input placeholder="Password" mr='20px' h='60px' w='220px' value={password} onChange={(e) => setPassword(e.target.value)}></Input> */}

                <InputGroup mr='20px' w='220px'>
                  <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      h='60px'
                  />
                  <InputRightElement h='60px'>
                      <Button variant="none" onClick={handleClick} fontSize='10px' _focus={{ borderStyle:'none' }} >
                      {show ? <IconButton variant="none" icon={<ViewOffIcon />} _focus={{ borderStyle:'none' }} /> : <IconButton variant="none" icon={<ViewIcon />} _focus={{ borderStyle:'none' }} /> }
                      </Button>
                  </InputRightElement>
                </InputGroup>

                <Button bgColor='white' color='blue.400' border='solid 1px' borderRadius='25px' h='45px' w='100px' fontWeight='700' onClick={handleLogin}>Log in</Button>
            </Flex>
            {/* <Flex direction='row' textAlign='left'>
                {error.emailOrUsername && <Container color='red' w='380px'>{error.emailOrUsername}</Container>}
                {error.password && <Container color='red' >{error.password}</Container>}
            </Flex> */}
            <Link variant="none" borderRadius='20px' w='150px' fontSize='12px' ml='220px' mt='5px' color='blue.400'>Forget Password?</Link>
        </Flex>
    )
}

export default Login