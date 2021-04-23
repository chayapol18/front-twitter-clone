import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import EachTweet from "../../components/tweet/EachTweet";

function TweetIncReply({ myParams }) {
  const [tweetIncReply, setTweetIncReply] = useState([]);
  const [triggerDelete, setTriggerDelete] = useState(false);

  const getTweetAndReply = async () => {
    try {
      const res = await axios.get(`/tweets/inc-reply/${myParams}`);
      setTweetIncReply(res.data.tweetWithReply);
    } catch (err) {}
  };

  useEffect(() => {
    getTweetAndReply();
  }, [triggerDelete]);

  console.log(tweetIncReply)

  return (
    <Flex>
        {/* <EachTweet
          key={tweetIncReply.id}
          {...tweetIncReply}
          setTriggerDelete={setTriggerDelete}
        /> */}
    </Flex>
  );
}

export default TweetIncReply;
