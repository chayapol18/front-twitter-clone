import Menulist from '../components/banner/Menulist'
import TrendBar from '../components/banner/TrendBar'
import Content from '../components/container/Content'
import { Text, Flex, Button } from "@chakra-ui/react";
import Tweets from '../components/tweet/Tweets'

function TweetPage() {

    return (
        <Flex direction='row'>
            <Menulist />
            <Content
                header='Tweet'
                body='In Tweet'
            />   
            <TrendBar />
        </Flex>
    )
}

export default TweetPage