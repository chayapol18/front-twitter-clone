import Menulist from "../components/banner/Menulist";
import TrendBar from "../components/banner/TrendBar";
import Content from "../components/container/Content";
import { Flex, IconButton, Text, HStack, Stack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import UserTweet from "../components/profile/UserTweet";
import Bio from "../components/profile/Bio";
import axios from "../config/axios";

function ProfilePage() {
  const history = useHistory();
  const [tweet, setTweet] = useState([]);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const [triggerUpdateTweets, setTtriggerUpdateTweets] = useState(false);
  const [triggerUpdateRetweets, setTriggerUpdateRetweets] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const getMyTweet = async () => {
    try {
      setTweet([])
      const res = await axios.get("/tweets/personal");
      console.log(res.data.tweets.length)
      setTweet(() => res.data.tweets);
    } catch (err) {}
  };

  useEffect(() => {
    getMyTweet();
  }, [triggerDelete, triggerUpdateTweets, triggerUpdateRetweets]);

  const getMe = async () => {
    try {
      const res = await axios.get("/users/personal");
      setUser(res.data.user);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    getMe();
  }, [toggleUpdate]);

  const handleBackButton = () => {
    history.push("/");
  };

  console.log(tweet)

  return (
    <Flex direction="row">
      <Menulist pathName="Profile" getMyTweet={getMyTweet} />
      <Content
        header={
          <Flex direction="row">
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
              <Flex direction="column">
                <Text fontSize="20px" mt="-12px">
                  {user.name}
                </Text>
                <Text fontSize="12px" mt="-5px">
                  500 tweets
                </Text>
              </Flex>
            </HStack>
          </Flex>
        }
      >
        <Flex direction="column">
          <Bio getMe={getMe} setToggleUpdate={setToggleUpdate} getMyTweet={getMyTweet} />
          <UserTweet
            tweet={tweet}
            setTriggerDelete={setTriggerDelete}
            triggerUpdateTweets={triggerUpdateTweets}
            triggerUpdateRetweet={triggerUpdateRetweets}
            getMyTweet={getMyTweet}
          />
        </Flex>
      </Content>

      <TrendBar />
    </Flex>
  );
}

export default ProfilePage;
