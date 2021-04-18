import { Flex,Text } from '@chakra-ui/react'
import UserTweet from '../profile/UserTweet'
import Bio from '../profile/Bio'

function Profile() {
    return (
        <Flex direction='column'>
        <Bio />
        <UserTweet/>
        </Flex>
    )
}

export default Profile