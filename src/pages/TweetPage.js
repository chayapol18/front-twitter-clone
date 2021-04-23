import Menulist from "../components/banner/Menulist";
import TrendBar from "../components/banner/TrendBar";
import Content from "../components/container/Content";
import {
  Text,
  Flex,
  Button,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TweetIncReply from "../components/tweet/TweetIncReply";
import MainTweet from "../components/reply/MainTweet";
import ReplyTweet from "../components/reply/ReplyTweet";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../config/axios";

function TweetPage() {
  const location = useLocation();
  const myParams = location.state.params;
  const history = useHistory();
  const [checkTweetAndReply, setCheckTweetAndReply] = useState([]);
  const [triggerReply, setTriggerReply] = useState(false)

  const getTweetAndReply = async () => {
    try {
      const res = await axios.get(`/tweets/inc-reply/${myParams}`);
      setCheckTweetAndReply(
        res.data.tweetWithReply.ReplyToMainTweet[0].replyTo
      );
    } catch (err) {}
  };

  useEffect(() => {
    getTweetAndReply();
  }, [triggerReply]);

  const handleBackButton = () => {
    history.push("/");
  };

  return (
    <Flex direction="row">
      <Menulist />
      <Content
        header={
          <HStack spacing={4}>
            <IconButton
              icon={<ArrowBackIcon />}
              color="blue.300"
              bgColor="white"
              _hover={{ background: "white" }}
              _focus={{ background: "white", borderStyle: "none" }}
              size="4xl"
              onClick={handleBackButton}
            />
            <Text>Tweet</Text>
          </HStack>
        }
      >
        <Stack spacing="0">
          <MainTweet myParams={myParams} setTriggerReply={setTriggerReply} />

          {checkTweetAndReply &&
            checkTweetAndReply.map((reply) => (
              <ReplyTweet myParams={myParams} reply={reply} setTriggerReply={setTriggerReply} />
            ))}
        </Stack>
        
      </Content>

      <TrendBar />
    </Flex>
  );
}

export default TweetPage;
