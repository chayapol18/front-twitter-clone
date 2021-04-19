import Menulist from '../components/banner/Menulist'
import TrendBar from '../components/banner/TrendBar'
import Content from '../components/container/Content'
import { Flex, IconButton, Text, HStack, Stack } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContextProvider';
import UserTweet from '../components/profile/UserTweet'
import Bio from '../components/profile/Bio'
import axios from '../config/axios'

function ProfilePage() {
    const { user } = useContext(AuthContext)
    const history = useHistory()
    const [tweet, setTweet] = useState([])
    const [triggerDelete, setTriggerDelete] = useState(false)

    const getMyTweet = async () => {
        try {
            const res = await axios.get('/tweets/personal')
            setTweet(res.data.tweets)
        } catch (err) {

        }
    };

    useEffect(() => {
        getMyTweet()
    }, [])

    const handleBackButton = () => {
        history.push('/')
    }

    return(
        <Flex direction='row'>
            <Menulist pathName='Profile' getMyTweet={getMyTweet}
            />
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
            >
            <Flex direction='column'>
                <Bio />
                <UserTweet
                tweet={tweet}
                setTriggerDelete={setTriggerDelete}
                />
            </Flex>
            </Content>
  
            <TrendBar />
        </Flex>
    )
}

export default ProfilePage