import { Flex, HStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import axios from '../../config/axios'
import EachTweet from '../tweet/EachTweet'
import Tweets from '../tweet/Tweets'

function UserTweets() {
    const [tweet, setTweet] = useState([])
    const [triggerDelete, setTriggerDelete] = useState(false)

    const getMyTweet = async () => {
        try {
            const res = await axios.get('/tweets/personal')
            setTweet(res.data.tweets)
            console.log(res.data)
            console.log(res.data.tweets)
        } catch (err) {

        }
    };

    console.log(tweet)

    useEffect(() => {
        getMyTweet()
    }, [])

    return(
        <Flex>
            <Tabs w='600px'>
                <TabList>
                    <HStack spacing={20}>
                        <Tab _selected={{ color: "blue.400" }}>Tweets</Tab>
                        <Tab _selected={{ color: "blue.400" }}>Tweets&Replies</Tab>
                        <Tab _selected={{ color: "blue.400" }}>Media</Tab>
                        <Tab _selected={{ color: "blue.400" }}>Like</Tab>
                    </HStack>
                </TabList>

                <TabPanels ml='-16px'>
                    <TabPanel>
                        {/* <Tweets /> */}
                        { tweet.map(tweet => (
                            <EachTweet key={tweet.id} {...tweet} setTriggerDelete={setTriggerDelete} />
                        ))}
                    </TabPanel>
                    <TabPanel>
                    <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                    <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}

export default UserTweets