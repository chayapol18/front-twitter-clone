import Menulist from '../components/banner/Menulist'
import TrendBar from '../components/banner/TrendBar'
import Content from '../components/container/Content'
import { Flex, IconButton, Text, HStack, Stack } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import Profile from '../components/profile/Profile'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContextProvider';

function ProfilePage() {
    const { user } = useContext(AuthContext)
    const history = useHistory()

    const handleBackButton = () => {
        history.push('/')
    }

    return(
        <Flex direction='row'>
            <Menulist />
            <Content
                header={
                    <Flex direction='row' > 
                        <HStack spacing={4}>
                            <IconButton icon={<ArrowBackIcon />} 
                            color='blue.300' 
                            bgColor='white' 
                            _hover={{ background: "white" }}
                            _focus={{ background: "white", borderStyle:'none' }}
                            size="4xl"
                            onClick={handleBackButton}
                            /> 
                            <Flex direction='column'>
                                <Text fontSize='20px' mt='-12px'>{user.name}</Text>   
                                <Text fontSize='12px' mt='-5px'>500 tweets</Text>   
                            </Flex>
                        </HStack>
                    </Flex>
                }
                body={Profile()}
            />   
            <TrendBar />
        </Flex>
    )
}

export default ProfilePage