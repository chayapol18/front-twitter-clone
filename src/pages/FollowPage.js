import Menulist from '../components/banner/Menulist'
import TrendBar from '../components/banner/TrendBar'
import Content from '../components/container/Content'
import { Flex, IconButton, Text, HStack } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import Follow from '../components/follow/Follow'
import { useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContextProvider';
import axios from '../config/axios'

function FollowPage() {
    const history = useHistory()
    const { user } = useContext(AuthContext)
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const handleBackButton = () => {
        history.push('/profile')
    }

    const getFollowers = async () => {
        try {
            const res = await axios.get("/follows/follow-by");
            setFollowers(res.data.followBy);
        } catch(err) {

        }
    }

    const getFollowing = async () => {
        try {
            const res = await axios.get("/follows/following");
            setFollowing(res.data.following);
        } catch(err) {

        }
    }
    
      useEffect(() => {
        getFollowers();
        getFollowing()
      }, []);

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
                }>
                    <Follow followers={followers} following={following} />
                </Content>
            <TrendBar />
        </Flex>
    )
}

export default FollowPage