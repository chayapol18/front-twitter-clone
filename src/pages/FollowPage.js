import Menulist from '../components/banner/Menulist'
import TrendBar from '../components/banner/TrendBar'
import Content from '../components/container/Content'
import { Flex, IconButton, Text, HStack } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import Follow from '../components/follow/Follow'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContextProvider';

function FollowPage() {
    const history = useHistory()
    const { user } = useContext(AuthContext)

    const handleBackButton = () => {
        history.push('/profile')
    }

    return(
        <Flex direction='row'>
            <Menulist />
            <Content
                header={
                    <Flex direction='row'> 
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
                                <Text fontSize='12px' mt='-5px' color='gray.400'>@{user.username}</Text>   
                            </Flex>
                        </HStack>
                    </Flex>
                }
                body='body'
            />   
            <TrendBar />
        </Flex>
    )
}

export default FollowPage