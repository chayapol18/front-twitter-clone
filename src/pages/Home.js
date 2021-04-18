import Menulist from '../components/banner/Menulist'
import TrendBar from '../components/banner/TrendBar'
import Content from '../components/container/Content'
import { Text, Flex, Button } from "@chakra-ui/react";
import Tweets from '../components/tweet/Tweets'

function Home() {

    return (
        <Flex direction='row'>
            <Menulist />
            <Content
                header='Home'
                body={Tweets()}
            />   
            <TrendBar />
        </Flex>
    )
}

export default Home