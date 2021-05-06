import {
  Flex,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import EachTweet from "../tweet/EachTweet";
import TweetWithReTweet from "../tweet/TweetWithRetweet";

function UserTweets({ tweet, getMyTweet, setTriggerDelete, triggerUpdateTweets, triggerUpdateRetweets }) {
  console.log(tweet)
  return (
    <Flex>
      <Tabs w="600px">
        <TabList>
          <HStack spacing={20}>
            <Tab _selected={{ color: "blue.400" }}>Tweets</Tab>
            <Tab _selected={{ color: "blue.400" }}>Tweets&Replies</Tab>
            <Tab _selected={{ color: "blue.400" }}>Media</Tab>
            <Tab _selected={{ color: "blue.400" }}>Like</Tab>
          </HStack>
        </TabList>

        <TabPanels ml="-16px">
          
          <TabPanel>
            {tweet.map((tweet) =>
              tweet.Tweet ? (
                <TweetWithReTweet
                  key={tweet.Tweet.id}
                  {...tweet}
                  setTriggerDelete={setTriggerDelete}
                  getMyTweet={getMyTweet}
                />
              ) : (
                <EachTweet
                  key={tweet.id}
                  {...tweet}
                  setTriggerDelete={setTriggerDelete}
                />
              )
            )}
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
  );
}

export default UserTweets;
