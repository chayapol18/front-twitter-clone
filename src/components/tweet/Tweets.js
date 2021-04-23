import { Flex, Box } from '@chakra-ui/react'
import AddTweet from '../tweet/AddTweet'
import EachTweet from '../tweet/EachTweet'


function Tweets({getTweet, tweet, setTriggerDelete, pathName}) {

    return (
        <Flex direction='column' w='100%'>
            <AddTweet getTweet={getTweet}/> 
            <Box bgColor='rgb(235, 238, 240)' h='10px'></Box>
            { tweet.map(tweet => (
                <EachTweet key={tweet.id} {...tweet} setTriggerDelete={setTriggerDelete} getTweet={getTweet} pathName={pathName}/>
                // <EachTweet key={tweet.id} {...tweet} setTriggerDelete={setTriggerDelete} onTweetDone={()=>{
                //     tweet.fillter(tweet2 => tweet.id !== tweet2.id)
                // }}/>
            ))}
        </Flex>
    )
}

export default Tweets