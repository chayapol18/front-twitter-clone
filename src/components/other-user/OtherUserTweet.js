import {
  Flex,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import EachTweet from "../tweet/EachTweet";
import TweetWithReTweet from "../tweet/TweetWithRetweet";
import Tweets from "../tweet/Tweets";

function OtherUserTweets({ otherUserTweets }) {
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
            {!otherUserTweets
              ? null
              : otherUserTweets.map((tweet) =>
                  tweet.Tweet ? (
                    <TweetWithReTweet key={tweet.Tweet.id} {...tweet} />
                  ) : (
                    <EachTweet key={tweet.id} {...tweet} />
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

export default OtherUserTweets;
