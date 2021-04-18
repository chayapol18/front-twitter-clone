import { Flex, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import AddTweet from '../tweet/AddTweet'
import EachTweet from '../tweet/EachTweet'
import axios from '../../config/axios'

function Tweets() {
    const [tweet, setTweet] = useState([])
    const [triggerDelete, setTriggerDelete] = useState(false)

    const getTweet = async () => {
        try {
            const res = await axios.get('/tweets')
            setTweet(res.data.tweets)
            console.log(res.data)
            console.log(res.data.tweet)
        } catch (err) {

        }
    };
    
    useEffect(() => {
        getTweet()
    }, [triggerDelete])

    console.log(tweet)
    return (
        <Flex direction='column'>
            <AddTweet getTweet={getTweet}/> 
            <Box bgColor='rgb(235, 238, 240)' w='600px' h='10px'></Box>
            { tweet.map(tweet => (
                <EachTweet key={tweet.id} {...tweet} setTriggerDelete={setTriggerDelete} />
            ))}
        </Flex>
    )
}

export default Tweets