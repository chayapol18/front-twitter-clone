import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import { Flex, Box, IconButton  } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa"

function Auth() {
    return (
        <Flex direction='row' h='721px'>
            <Box w='55%' h='100%' bgColor='blue.400'>
                <IconButton variant="none" as={FaTwitter} m={3} w='50%' h='50%' color="white" mt='150px'/>
            </Box>

            <Flex direction='column' ml='30px'>
                <Login />
                
                <Register />
            </Flex>
        </Flex>
    )
}

export default Auth